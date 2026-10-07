import type { Listing } from "./guesty-config";

const API = "https://booking.guesty.com";
const CATEGORIES = ["Sky Rooms", "Sky Suites"];
const FILTER_TAGS = ["negocios", "estadía prolongada", "estadia prolongada"];

// Token cacheado en memoria del servidor hasta su vencimiento.
// Guardado en globalThis para sobrevivir recargas del módulo.
const store = ((globalThis as Record<string, unknown>)["__guestyToken"] ??= {
  cached: null,
  pending: null,
}) as { cached: { token: string; expiresAt: number } | null; pending: Promise<string> | null };

async function requestToken(): Promise<string> {
  const clientId = process.env["GUESTY_CLIENT_ID"];
  const clientSecret = process.env["GUESTY_CLIENT_SECRET"];
  if (!clientId || !clientSecret) throw new Error("Faltan credenciales de Guesty");
  const res = await fetch(`${API}/oauth2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded", Accept: "application/json" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      scope: "booking_engine:api",
      client_id: clientId,
      client_secret: clientSecret,
    }),
  });
  if (!res.ok) {
    console.error("Guesty token error", res.status, await res.text());
    throw new Error("No se pudo autenticar con Guesty");
  }
  const json = (await res.json()) as { access_token: string; expires_in: number };
  store.cached = { token: json.access_token, expiresAt: Date.now() + (json.expires_in - 300) * 1000 };
  return json.access_token;
}

async function getToken() {
  if (store.cached && store.cached.expiresAt > Date.now()) return store.cached.token;
  store.pending ??= requestToken().finally(() => (store.pending = null));
  return store.pending;
}

export async function guestyGet<T>(path: string, params?: Record<string, string | undefined>): Promise<T> {
  const url = new URL(path, API);
  for (const [k, v] of Object.entries(params ?? {})) if (v) url.searchParams.set(k, v);
  const doFetch = async () =>
    fetch(url, { headers: { Authorization: `Bearer ${await getToken()}`, Accept: "application/json" } });
  let res = await doFetch();
  if (res.status === 401) {
    store.cached = null;
    res = await doFetch();
  }
  if (!res.ok) {
    console.error("Guesty API error", path, res.status, await res.text());
    throw new Error("Guesty no respondió correctamente");
  }
  return res.json() as Promise<T>;
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
    all.push(...rows.map(normalize));
    cursor = page.pagination?.cursor?.next ?? undefined;
    if (!cursor) break;
  }
  return all;
}

export async function fetchListing(id: string) {
  return normalize(await guestyGet<RawListing>(`/api/listings/${encodeURIComponent(id)}`));
}
