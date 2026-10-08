import type { Listing } from "./guesty-config";

const API = "https://booking.guesty.com";
const CATEGORIES = ["Sky Rooms", "Sky Suites"];
const FILTER_TAGS = ["negocios", "estadía prolongada", "estadia prolongada"];
const TIMEOUT_MS = 10_000;
const BLOCK_MS = 60 * 60 * 1000;
const MAX_TOKENS_24H = 3;
const LIMIT_MSG = "Guesty: límite diario de tokens alcanzado";

type Env = "prod" | "dev";
const PROD_HOSTS = ["sky-stays.com", "www.sky-stays.com", "sky-stays-nest.lovable.app"];

/** Producción = dominios publicados; todo lo demás (preview, local) = desarrollo. */
async function currentEnv(): Promise<Env> {
  try {
    const { getRequest } = await import("@tanstack/react-start/server");
    const host = (getRequest()?.headers.get("x-forwarded-host") ?? getRequest()?.headers.get("host") ?? "")
      .split(":")[0]!
      .toLowerCase();
    if (PROD_HOSTS.includes(host)) return "prod";
    if (/^project--[^.]+\.lovable\.app$/.test(host) && !host.includes("-dev.")) return "prod";
  } catch {
    /* sin request: desarrollo */
  }
  return "dev";
}
const tokenRowId = (env: Env) => (env === "prod" ? 1 : 2);

function credentials(env: Env) {
  const id = env === "prod" ? process.env["GUESTY_CLIENT_ID"] : process.env["GUESTY_CLIENT_ID_DEV"];
  const secret = env === "prod" ? process.env["GUESTY_CLIENT_SECRET"] : process.env["GUESTY_CLIENT_SECRET_DEV"];
  if (!id || !secret) throw new Error(`Faltan credenciales de Guesty (${env})`);
  return { id, secret };
}

type Cached = { token: string; expiresAt: number };
const store = ((globalThis as Record<string, unknown>)["__guestyStore"] ??= {
  cached: {} as Partial<Record<Env, Cached>>,
  pending: {} as Partial<Record<Env, Promise<string>>>,
  blockedUntil: {} as Partial<Record<Env, number>>,
}) as {
  cached: Partial<Record<Env, Cached>>;
  pending: Partial<Record<Env, Promise<string>>>;
  blockedUntil: Partial<Record<Env, number>>;
};

async function admin() {
  return (await import("@/integrations/supabase/client.server")).supabaseAdmin;
}

async function setBlocked(env: Env, until: number) {
  store.blockedUntil[env] = until;
  try {
    await (await admin())
      .from("guesty_token")
      .upsert({ id: tokenRowId(env), blocked_until: new Date(until).toISOString(), updated_at: new Date().toISOString() });
  } catch (e) {
    console.error("Guesty block save error", e);
  }
}

async function requestToken(env: Env): Promise<string> {
  const db = await admin();
  // Presupuesto: máx. 3 tokens en 24 h (Guesty permite 5).
  const since = new Date(Date.now() - 24 * 3600 * 1000).toISOString();
  const { count } = await db
    .from("guesty_token_requests")
    .select("id", { count: "exact", head: true })
    .eq("env", env)
    .gte("requested_at", since);
  if ((count ?? 0) >= MAX_TOKENS_24H) {
    console.error(`ALERTA Guesty (${env}): ya se pidieron ${count} tokens en 24 h; no se piden más para no superar el límite de 5.`);
    await setBlocked(env, Date.now() + BLOCK_MS);
    throw new Error(LIMIT_MSG);
  }
  const { id, secret } = credentials(env);
  const res = await fetch(`${API}/oauth2/token`, {
    method: "POST",
    signal: AbortSignal.timeout(TIMEOUT_MS),
    headers: { "Content-Type": "application/x-www-form-urlencoded", Accept: "application/json" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      scope: "booking_engine:api",
      client_id: id,
      client_secret: secret,
    }),
  });
  await db.from("guesty_token_requests").insert({ env, status: res.status });
  if (res.status === 429) {
    console.error(LIMIT_MSG, env, res.status, await res.text());
    await setBlocked(env, Date.now() + BLOCK_MS);
    throw new Error(LIMIT_MSG);
  }
  if (!res.ok) {
    console.error("Guesty token error", env, res.status, await res.text());
    throw new Error("No se pudo autenticar con Guesty");
  }
  const json = (await res.json()) as { access_token: string; expires_in: number };
  const cached = { token: json.access_token, expiresAt: Date.now() + (json.expires_in - 300) * 1000 };
  store.cached[env] = cached;
  await db.from("guesty_token").upsert({
    id: tokenRowId(env),
    token: cached.token,
    expires_at: new Date(cached.expiresAt).toISOString(),
    blocked_until: null,
    updated_at: new Date().toISOString(),
  });
  return cached.token;
}

async function loadOrRequestToken(env: Env, forceNew: boolean): Promise<string> {
  const mem = store.blockedUntil[env];
  if (mem && mem > Date.now()) throw new Error(LIMIT_MSG);
  const db = await admin();
  const { data } = await db
    .from("guesty_token")
    .select("token, expires_at, blocked_until")
    .eq("id", tokenRowId(env))
    .maybeSingle();
  if (data?.blocked_until && new Date(data.blocked_until).getTime() > Date.now()) {
    store.blockedUntil[env] = new Date(data.blocked_until).getTime();
    throw new Error(LIMIT_MSG);
  }
  if (!forceNew && data?.token && data.expires_at && new Date(data.expires_at).getTime() > Date.now()) {
    store.cached[env] = { token: data.token, expiresAt: new Date(data.expires_at).getTime() };
    return data.token;
  }
  return requestToken(env);
}

async function getToken(env: Env, forceNew = false) {
  const c = store.cached[env];
  if (!forceNew && c && c.expiresAt > Date.now()) return c.token;
  if (forceNew) delete store.cached[env];
  store.pending[env] ??= loadOrRequestToken(env, forceNew).finally(() => { delete store.pending[env]; });
  return store.pending[env]!;
}

export async function guestyGet<T>(path: string, params?: Record<string, string | undefined>): Promise<T> {
  const env = await currentEnv();
  const url = new URL(path, API);
  for (const [k, v] of Object.entries(params ?? {})) if (v) url.searchParams.set(k, v);
  const doFetch = async (forceNew: boolean) =>
    fetch(url, {
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: { Authorization: `Bearer ${await getToken(env, forceNew)}`, Accept: "application/json" },
    });
  let res = await doFetch(false);
  if (res.status === 401) {
    // Un solo reintento con token nuevo; si vuelve a fallar, no pedimos otro.
    console.error("Guesty API 401: se pide un token nuevo una sola vez", env);
    res = await doFetch(true);
  }
  if (!res.ok) {
    console.error("Guesty API error", env, path, res.status, await res.text());
    throw new Error("Guesty no respondió correctamente");
  }
  return res.json() as Promise<T>;
}

/* ---------- Lista sin fechas guardada en la base (refresco cada 10 min) ---------- */
const CACHE_MS = 10 * 60 * 1000;
/** Cocheras/garages no se reservan desde el sitio. */
const GARAGE = /garage|garaje|cochera|parking/i;
const isGarage = (l: { title?: string; nickname?: string; tags?: string[] }) =>
  [l.title, l.nickname, ...(l.tags ?? [])].some((s) => !!s && GARAGE.test(s));

export async function cachedListings(): Promise<Listing[]> {
  const env = await currentEnv();
  const db = await admin();
  const { data } = await db.from("guesty_listings_cache").select("listings, fetched_at").eq("env", env).maybeSingle();
  const saved = ((data?.listings as Listing[] | undefined) ?? null)?.filter((l) => !GARAGE.test(l.name)) ?? null;
  if (saved && Date.now() - new Date(data!.fetched_at).getTime() < CACHE_MS) return saved;
  try {
    const fresh = await fetchListings();
    if (fresh.length) {
      await db
        .from("guesty_listings_cache")
        .upsert({ env, listings: fresh as unknown as never, fetched_at: new Date().toISOString() });
      return fresh;
    }
    return saved ?? fresh;
  } catch (e) {
    console.error("Guesty: se muestra la última lista guardada", e instanceof Error ? e.message : e);
    if (saved) return saved;
    throw e;
  }
}

type RawListing = {
  _id: string;
  title?: string;
  nickname?: string;
  tags?: string[];
  address?: { neighborhood?: string; city?: string };
  accommodates?: number;
  bedrooms?: number;
  beds?: number;
  amenities?: string[];
  prices?: { basePrice?: number; currency?: string };
  nightlyRates?: Record<string, number>;
  allotment?: number;
  picture?: { original?: string; large?: string; thumbnail?: string };
  pictures?: { original?: string; large?: string; thumbnail?: string }[];
};

const AMENITY_PRIORITY: [string, RegExp][] = [
  ["Piscina", /pool|piscina/i],
  ["Gimnasio", /gym|fitness|gimnasio/i],
  ["Coworking", /cowork|workspace|laptop/i],
  ["Quincho", /quincho|bbq|grill|parrilla/i],
  ["Minimarket", /market|minimercado/i],
  ["WiFi", /wifi|wireless|internet/i],
];

function pickAmenities(raw: string[] = []) {
  return AMENITY_PRIORITY.filter(([, re]) => raw.some((a) => re.test(a)))
    .map(([label]) => label)
    .slice(0, 4);
}

export function normalize(l: RawListing): Listing {
  const tags = l.tags ?? [];
  const category = CATEGORIES.find((c) => tags.some((t) => t.toLowerCase() === c.toLowerCase())) ?? null;
  const building =
    tags.find(
      (t) =>
        !CATEGORIES.some((c) => c.toLowerCase() === t.toLowerCase()) &&
        !FILTER_TAGS.includes(t.toLowerCase()),
    ) ?? null;
  const rates = l.nightlyRates ? Object.values(l.nightlyRates) : [];
  const price = rates.length
    ? rates.reduce((a, b) => a + b, 0) / rates.length
    : (l.prices?.basePrice ?? null);
  const photos = (l.pictures?.length ? l.pictures : l.picture ? [l.picture] : [])
    .map((p) => p.large ?? p.original ?? p.thumbnail)
    .filter((u): u is string => !!u);
  return {
    id: l._id,
    name: l.title || l.nickname || "Alojamiento Sky Stays",
    category,
    building,
    zone: l.address?.neighborhood ?? l.address?.city ?? null,
    guests: l.accommodates ?? 0,
    bedrooms: l.bedrooms ?? 0,
    beds: l.beds ?? 0,
    amenities: pickAmenities(l.amenities),
    price,
    currency: l.prices?.currency ?? "USD",
    photos,
  };
}

type Page = { results: RawListing[]; pagination?: { cursor?: { next?: string | null } } };

export async function fetchListings(params: Record<string, string | undefined> = {}) {
  const all: Listing[] = [];
  let cursor: string | undefined;
  for (let i = 0; i < 10; i++) {
    const page = await guestyGet<Page>("/api/listings", { limit: "100", ...params, cursor });
    const dated = !!params["checkIn"];
    const rows = (page.results ?? []).filter(
      // Con fechas, descartamos lo que Guesty marca sin cupo o sin tarifa.
      (l) => !dated || ((l.allotment ?? 1) > 0 && (!l.nightlyRates || Object.keys(l.nightlyRates).length > 0)),
    );
    all.push(...rows.filter((l) => !isGarage(l)).map(normalize));
    cursor = page.pagination?.cursor?.next ?? undefined;
    if (!cursor) break;
  }
  return all;
}

export async function fetchListing(id: string) {
  return normalize(await guestyGet<RawListing>(`/api/listings/${encodeURIComponent(id)}`));
}
