import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Maximize2, Minimize2, X } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  BUILDING_COLOR,
  buildingById,
  buildings,
  categories,
  categoryColor,
  categoryLabel,
  distanceKm,
  distanceLabel,
  places,
  zoneLabel,
  zones,
  type Building,
  type CategoryId,
  type Place,
} from "@/data/asuncion";

/* ------------------------- Carga del SDK de Google ------------------------ */

declare global {
  interface Window {
    google?: any;
    initSkyStaysMap?: () => void;
  }
}

let mapsPromise: Promise<any> | null = null;

function loadMapsSdk(): Promise<any> {
  if (typeof window === "undefined") return Promise.reject(new Error("no window"));
  if (window.google?.maps) return Promise.resolve(window.google);
  if (mapsPromise) return mapsPromise;

  mapsPromise = new Promise((resolve, reject) => {
    const cb = "initSkyStaysMap";
    window[cb] = () => {
      delete window[cb];
      resolve(window.google);
    };
    const key = import.meta.env["VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY"];
    const channel =
      import.meta.env["VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_TRACKING_ID"] ?? "lovable";
    const s = document.createElement("script");
    s.src = `https://maps.googleapis.com/maps/api/js?key=${key}&loading=async&callback=${cb}&channel=${channel}`;
    s.async = true;
    s.defer = true;
    s.onerror = () => reject(new Error("No se pudo cargar Google Maps"));
    document.head.appendChild(s);
  });

  return mapsPromise;
}

/* ------------------------------ Pines de marca ---------------------------- */

const PIN_PATH =
  "M0-23c-7.4 0-13.4 6-13.4 13.4 0 9.5 13.4 22.6 13.4 22.6s13.4-13.1 13.4-22.6C13.4-17 7.4-23 0-23z";

function buildingIcon(g: any, highlighted: boolean) {
  return {
    path: PIN_PATH,
    fillColor: BUILDING_COLOR,
    fillOpacity: 1,
    strokeColor: "#F3EDE8",
    strokeWeight: 2.4,
    scale: highlighted ? 0.9 : 0.78,
    anchor: new g.maps.Point(0, 12),
  };
}

function placeIcon(g: any, color: string, dimmed: boolean) {
  return {
    path: g.maps.SymbolPath.CIRCLE,
    fillColor: color,
    fillOpacity: dimmed ? 0.35 : 1,
    strokeColor: "#FFFFFF",
    strokeWeight: 1.6,
    scale: dimmed ? 5 : 7,
  };
}

const CENTER = { lat: -25.2885, lng: -57.5755 };
const NEAR_KM = 1.6;

const MAP_STYLES = [
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "poi.business", stylers: [{ visibility: "off" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  { featureType: "road", elementType: "labels.icon", stylers: [{ visibility: "off" }] },
  { featureType: "landscape", stylers: [{ color: "#ece8e4" }] },
  { featureType: "water", stylers: [{ color: "#b9c7cc" }] },
  { featureType: "road", stylers: [{ color: "#ffffff" }] },
  { featureType: "road.arterial", stylers: [{ color: "#f3f0ec" }] },
  {
    featureType: "administrative",
    elementType: "labels.text.fill",
    stylers: [{ color: "#6b6258" }],
  },
];

/* -------------------------------- Chips UI -------------------------------- */

function Chip({
  active,
  onClick,
  children,
  dot,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  dot?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex shrink-0 items-center gap-2 whitespace-nowrap border px-3 py-2 text-[0.625rem] font-semibold uppercase tracking-[0.12em] transition-colors",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border text-primary-soft hover:border-border-strong",
      )}
    >
      {dot ? (
        <span
          aria-hidden
          className="inline-block h-2 w-2 rounded-full"
          style={{ backgroundColor: active ? "currentColor" : dot }}
        />
      ) : null}
      {children}
    </button>
  );
}

/* ------------------------------- Componente ------------------------------- */

type Selection =
  | { kind: "building"; item: Building }
  | { kind: "place"; item: Place }
  | null;

export function AsuncionMap({
  className,
  initialExpanded = false,
}: {
  className?: string;
  initialExpanded?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const buildingMarkers = useRef<Record<string, any>>({});
  const placeMarkers = useRef<Record<string, any>>({});

  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [expanded, setExpanded] = useState(initialExpanded);
  const [zone, setZone] = useState<string>("all");
  const [interest, setInterest] = useState<CategoryId | "all">("all");
  const [selection, setSelection] = useState<Selection>(null);

  const visiblePlaces = useMemo(
    () =>
      places.filter(
        (p) =>
          (zone === "all" || p.zone === zone) &&
          (interest === "all" || p.category === interest),
      ),
    [zone, interest],
  );

  const visibleBuildings = useMemo(
    () => buildings.filter((b) => zone === "all" || b.zone === zone),
    [zone],
  );

  /** Puntos cercanos al edificio seleccionado. */
  const nearby = useMemo(() => {
    if (selection?.kind !== "building") return [];
    const b = selection.item;
    return visiblePlaces
      .map((p) => ({ place: p, km: distanceKm(b, p) }))
      .filter((x) => x.km <= NEAR_KM)
      .sort((a, b2) => a.km - b2.km)
      .slice(0, 6);
  }, [selection, visiblePlaces]);

  /* Inicialización del mapa y de los marcadores. */
  useEffect(() => {
    let cancelled = false;
    setStatus("loading");

    loadMapsSdk()
      .then((g) => {
        if (cancelled || !containerRef.current) return;
        const map = new g.maps.Map(containerRef.current, {
          center: CENTER,
          zoom: 13,
          disableDefaultUI: true,
          zoomControl: true,
          gestureHandling: "cooperative",
          styles: MAP_STYLES,
        });
        mapRef.current = map;

        buildings.forEach((b) => {
          const marker = new g.maps.Marker({
            position: { lat: b.lat, lng: b.lng },
            map,
            icon: buildingIcon(g, false),
            title: `${b.name} · Sky Stays`,
            zIndex: 100,
          });
          marker.addListener("click", () => setSelection({ kind: "building", item: b }));
          buildingMarkers.current[b.id] = marker;
        });

        places.forEach((p) => {
          const marker = new g.maps.Marker({
            position: { lat: p.lat, lng: p.lng },
            map,
            icon: placeIcon(g, categoryColor(p.category), false),
            title: p.name,
            zIndex: 40,
          });
          marker.addListener("click", () => setSelection({ kind: "place", item: p }));
          placeMarkers.current[p.id] = marker;
        });

        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  /* Visibilidad según filtros (sin recargar la página). */
  useEffect(() => {
    if (status !== "ready") return;
    const visibleP = new Set(visiblePlaces.map((p) => p.id));
    const visibleB = new Set(visibleBuildings.map((b) => b.id));
    Object.entries(placeMarkers.current).forEach(([id, m]) => m.setVisible(visibleP.has(id)));
    Object.entries(buildingMarkers.current).forEach(([id, m]) =>
      m.setVisible(visibleB.has(id)),
    );
    setSelection((prev) => {
      if (!prev) return prev;
      const stillVisible =
        prev.kind === "place" ? visibleP.has(prev.item.id) : visibleB.has(prev.item.id);
      return stillVisible ? prev : null;
    });
  }, [visiblePlaces, visibleBuildings, status]);

  /* Foco: centra el mapa y destaca lo cercano al edificio elegido. */
  useEffect(() => {
    const g = window.google;
    if (status !== "ready" || !g || !mapRef.current) return;
    const map = mapRef.current;

    if (selection?.kind === "building") {
      const b = selection.item;
      map.panTo({ lat: b.lat, lng: b.lng });
      map.setZoom(15);
      const nearIds = new Set(nearby.map((n) => n.place.id));
      Object.entries(placeMarkers.current).forEach(([id, m]) => {
        const p = places.find((x) => x.id === id);
        if (!p) return;
        m.setIcon(placeIcon(g, categoryColor(p.category), !nearIds.has(id)));
      });
      Object.entries(buildingMarkers.current).forEach(([id, m]) =>
        m.setIcon(buildingIcon(g, id === b.id)),
      );
      return;
    }

    Object.entries(placeMarkers.current).forEach(([id, m]) => {
      const p = places.find((x) => x.id === id);
      if (!p) return;
      m.setIcon(placeIcon(g, categoryColor(p.category), false));
    });
    Object.values(buildingMarkers.current).forEach((m) => m.setIcon(buildingIcon(g, false)));

    if (selection?.kind === "place") {
      map.panTo({ lat: selection.item.lat, lng: selection.item.lng });
      if (map.getZoom() < 15) map.setZoom(15);
    }
  }, [selection, nearby, status]);

  /* Reajuste al expandir / reducir. */
  useEffect(() => {
    if (status !== "ready" || !mapRef.current) return;
    const t = window.setTimeout(() => {
      window.google?.maps?.event?.trigger(mapRef.current, "resize");
    }, 260);
    return () => window.clearTimeout(t);
  }, [expanded, status]);

  const close = useCallback(() => setSelection(null), []);

  return (
    <div className={cn("relative", className)}>
      {/* Filtros por zona */}
      <div className="border border-border bg-card">
        <div className="flex items-center gap-2 overflow-x-auto px-3 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <span className="kicker shrink-0 pr-1 text-muted-foreground">Zona</span>
          <Chip active={zone === "all"} onClick={() => setZone("all")}>
            Todos
          </Chip>
          {zones.map((z) => (
            <Chip key={z.id} active={zone === z.id} onClick={() => setZone(z.id)}>
              {z.label}
            </Chip>
          ))}
        </div>
        <div className="flex items-center gap-2 overflow-x-auto border-t border-border px-3 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <span className="kicker shrink-0 pr-1 text-muted-foreground">Interés</span>
          <Chip active={interest === "all"} onClick={() => setInterest("all")}>
            Todos
          </Chip>
          {categories.map((c) => (
            <Chip
              key={c.id}
              active={interest === c.id}
              onClick={() => setInterest(c.id)}
              dot={c.color}
            >
              {c.label}
            </Chip>
          ))}
        </div>
      </div>

      {/* Mapa */}
      <div
        className={cn(
          "relative w-full overflow-hidden border border-t-0 border-border bg-secondary transition-[height] duration-300 ease-out",
          expanded ? "h-[78vh]" : "h-[320px] md:h-[420px]",
        )}
      >
        <div ref={containerRef} className="absolute inset-0" />

        {status === "ready" && (
          <>
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              className="absolute right-3 top-3 z-10 inline-flex items-center gap-2 border border-border bg-card/95 px-3 py-2 text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-primary shadow-sm transition-colors hover:bg-card"
            >
              {expanded ? (
                <Minimize2 className="h-3.5 w-3.5" aria-hidden />
              ) : (
                <Maximize2 className="h-3.5 w-3.5" aria-hidden />
              )}
              {expanded ? "Reducir mapa" : "Expandir mapa"}
            </button>

            <div className="pointer-events-none absolute left-3 top-3 z-10 hidden items-center gap-2 border border-border bg-card/95 px-3 py-2 md:inline-flex">
              <span
                aria-hidden
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: BUILDING_COLOR }}
              />
              <span className="kicker text-primary">Edificios Sky Stays</span>
            </div>
          </>
        )}

        {status === "loading" && (
          <div className="absolute inset-0 flex items-center justify-center bg-secondary/80">
            <p className="kicker text-primary-soft">Cargando mapa de Asunción…</p>
          </div>
        )}

        {status === "error" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-secondary p-8 text-center">
            <p className="font-display text-lg text-primary">No se pudo cargar el mapa</p>
            <p className="max-w-xs text-xs text-muted-foreground">
              Volvé a intentarlo más tarde. Mientras tanto, recorré los lugares en el
              listado de abajo.
            </p>
          </div>
        )}

        {/* Card de detalle: bottom sheet en mobile, card flotante en desktop */}
        {selection && (
          <div className="absolute inset-x-0 bottom-0 z-20 md:inset-auto md:bottom-4 md:left-4 md:w-[22rem]">
            <div className="border border-border bg-card p-5 shadow-lift">
              <button
                type="button"
                onClick={close}
                aria-label="Cerrar"
                className="absolute right-3 top-3 text-muted-foreground transition-colors hover:text-primary md:right-4"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>

              {selection.kind === "building" ? (
                <>
                  <p className="kicker text-primary-soft">
                    Edificio Sky Stays · {zoneLabel(selection.item.zone)}
                  </p>
                  <h4 className="mt-2 pr-6 text-lg text-primary">{selection.item.name}</h4>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {selection.item.barrio}, Asunción
                  </p>

                  {nearby.length > 0 && (
                    <ul className="mt-4 space-y-1.5 border-t border-border pt-3">
                      {nearby.slice(0, 4).map((n) => (
                        <li
                          key={n.place.id}
                          className="flex items-baseline justify-between gap-3 text-xs"
                        >
                          <button
                            type="button"
                            onClick={() => setSelection({ kind: "place", item: n.place })}
                            className="truncate text-left text-primary transition-colors hover:text-primary-soft"
                          >
                            {n.place.name}
                          </button>
                          <span className="shrink-0 text-[0.6875rem] text-muted-foreground">
                            {distanceLabel(selection.item, n.place)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <a
                    href={selection.item.staysUrl}
                    className="mt-4 inline-flex items-center gap-2 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-primary transition-all hover:gap-3"
                  >
                    Ver alojamientos <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </a>
                </>
              ) : (
                <PlaceCard place={selection.item} />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function PlaceCard({ place }: { place: Place }) {
  const near = buildingById(place.nearBuilding);
  return (
    <>
      <p className="kicker text-primary-soft">{categoryLabel(place.category)}</p>
      <h4 className="mt-2 pr-6 text-lg text-primary">{place.name}</h4>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
        {place.description}
      </p>
      <p className="mt-3 text-[0.6875rem] uppercase tracking-[0.12em] text-muted-foreground">
        {place.barrio} · {zoneLabel(place.zone)}
      </p>
      {near && (
        <p className="mt-1 text-[0.6875rem] text-muted-foreground">
          Cerca de <span className="text-primary">{near.name}</span> ·{" "}
          {distanceLabel(near, place)}
        </p>
      )}
      <div className="mt-4 flex flex-col gap-2 border-t border-border pt-3">
        <a
          href={place.mapsUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-primary transition-all hover:gap-3"
        >
          Ver en Google Maps <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </a>
        {near && (
          <a
            href={near.staysUrl}
            className="inline-flex items-center gap-2 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-primary-soft transition-all hover:gap-3"
          >
            Ver alojamientos cercanos <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </a>
        )}
      </div>
    </>
  );
}
