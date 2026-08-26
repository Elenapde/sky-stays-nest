import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { wa } from "@/data/sky";

/* ----------------------------- Tipos y datos ----------------------------- */

type Category = "barrio" | "alojamiento" | "poi";

interface Place {
  id: string;
  category: Category;
  name: string;
  detail: string;
  lat: number;
  lng: number;
}

/**
 * Coordenadas aproximadas en Asunción. Reemplazar por datos reales
 * (geocodificación de edificios / CMS) antes de publicar.
 */
const places: Place[] = [
  // Barrios
  {
    id: "barrio-villa-morra",
    category: "barrio",
    name: "Villa Morra",
    detail: "Restaurantes · cafés · Shopping Mariscal · vida urbana.",
    lat: -25.2645,
    lng: -57.5545,
  },
  {
    id: "barrio-ycua-sati",
    category: "barrio",
    name: "Ycuá Satí",
    detail: "Shopping del Sol · Paseo La Galería · eje corporativo.",
    lat: -25.2706,
    lng: -57.5312,
  },
  {
    id: "barrio-recoleta",
    category: "barrio",
    name: "Recoleta",
    detail: "Cafés de barrio · gastronomía de autor · conectividad.",
    lat: -25.2588,
    lng: -57.5585,
  },

  // Alojamientos
  {
    id: "al-petra-1802",
    category: "alojamiento",
    name: "Suite panorámica 18B · Petra Tower",
    detail: "Sky Suites · Ycuá Satí · desde US$ 118 / noche",
    lat: -25.2703,
    lng: -57.5306,
  },
  {
    id: "al-aurora-704",
    category: "alojamiento",
    name: "Studio 704 · Edificio Aurora",
    detail: "Sky Rooms · Villa Morra · desde US$ 62 / noche",
    lat: -25.2648,
    lng: -57.555,
  },
  {
    id: "al-recoleta-402",
    category: "alojamiento",
    name: "Departamento 402 · Recoleta Park",
    detail: "Sky Rooms · Recoleta · desde US$ 74 / noche",
    lat: -25.2586,
    lng: -57.5588,
  },
  {
    id: "al-galeria-2101",
    category: "alojamiento",
    name: "Suite 2101 · Torre Galería",
    detail: "Sky Suites · Ycuá Satí · desde US$ 96 / noche",
    lat: -25.2692,
    lng: -57.5318,
  },
  {
    id: "al-mariscal-1105",
    category: "alojamiento",
    name: "Studio 1105 · Edificio Mariscal",
    detail: "Sky Rooms · Villa Morra · desde US$ 58 / noche",
    lat: -25.2636,
    lng: -57.5534,
  },

  // Puntos de interés
  {
    id: "poi-shopping-del-sol",
    category: "poi",
    name: "Shopping del Sol",
    detail: "Centro comercial · Ycuá Satí",
    lat: -25.2708,
    lng: -57.5309,
  },
  {
    id: "poi-paseo-la-galeria",
    category: "poi",
    name: "Paseo La Galería",
    detail: "Gastronomía y compras · Ycuá Satí",
    lat: -25.2693,
    lng: -57.5319,
  },
  {
    id: "poi-shopping-mariscal",
    category: "poi",
    name: "Shopping Mariscal",
    detail: "Centro comercial · Villa Morra",
    lat: -25.2637,
    lng: -57.5533,
  },
  {
    id: "poi-costanera",
    category: "poi",
    name: "Costanera de Asunción",
    detail: "Recorrido ribereño y áreas verdes",
    lat: -25.2675,
    lng: -57.6235,
  },
  {
    id: "poi-gastronomia-villa-morra",
    category: "poi",
    name: "Polo gastronómico Villa Morra",
    detail: "Restaurantes y cafés · Villa Morra",
    lat: -25.2655,
    lng: -57.5562,
  },
];

const CATEGORIES: { id: Category; label: string; color: string }[] = [
  { id: "barrio", label: "Barrios", color: "#4a192c" },
  { id: "alojamiento", label: "Alojamientos", color: "#1d2127" },
  { id: "poi", label: "Puntos de interés", color: "#8a7b72" },
];

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
    const channel = import.meta.env["VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_TRACKING_ID"] ?? "lovable";
    const s = document.createElement("script");
    s.src = `https://maps.googleapis.com/maps/api/js?key=${key}&loading=async&callback=${cb}&channel=${channel}`;
    s.async = true;
    s.defer = true;
    s.onerror = () => reject(new Error("No se pudo cargar Google Maps"));
    document.head.appendChild(s);
  });

  return mapsPromise;
}

/* ------------------------------ Icono de pin ----------------------------- */

function pinIcon(googleLib: any, fill: string) {
  const pin = "M0-23c-7.4 0-13.4 6-13.4 13.4 0 9.5 13.4 22.6 13.4 22.6s13.4-13.1 13.4-22.6C13.4-17 7.4-23 0-23z";
  return {
    path: pin,
    fillColor: fill,
    fillOpacity: 1,
    strokeColor: "#ffffff",
    strokeWeight: 2,
    scale: 0.62,
    anchor: new googleLib.maps.Point(0, 12),
  };
}

/* ------------------------------- Componente ------------------------------ */

export function AsuncionMap({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<{ marker: google.maps.Marker; category: Category }[]>([]);
  const infoRef = useRef<google.maps.InfoWindow | null>(null);

  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [active, setActive] = useState<Record<Category, boolean>>({
    barrio: true,
    alojamiento: true,
    poi: true,
  });

  const colorOf = useCallback((c: Category) => {
    return CATEGORIES.find((x) => x.id === c)?.color ?? "#4a192c";
  }, []);

  // Inicializa el mapa una sola vez.
  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    loadMapsSdk()
      .then((g) => {
        if (cancelled || !containerRef.current) return;
        const map = new g.maps.Map(containerRef.current, {
          center: { lat: -25.2655, lng: -57.552 },
          zoom: 14,
          disableDefaultUI: true,
          zoomControl: true,
          gestureHandling: "cooperative",
          styles: [
            { featureType: "poi", stylers: [{ visibility: "off" }] },
            { featureType: "poi.business", stylers: [{ visibility: "off" }] },
            { featureType: "transit", stylers: [{ visibility: "off" }] },
            { featureType: "road", elementType: "labels.icon", stylers: [{ visibility: "off" }] },
            { featureType: "landscape", stylers: [{ color: "#ece8e4" }] },
            { featureType: "water", stylers: [{ color: "#b9c7cc" }] },
            { featureType: "road", stylers: [{ color: "#ffffff" }] },
            { featureType: "road.arterial", stylers: [{ color: "#f3f0ec" }] },
            { featureType: "administrative", elementType: "labels.text.fill", stylers: [{ color: "#6b6258" }] },
          ],
        });
        mapRef.current = map;
        infoRef.current = new g.maps.InfoWindow();

        places.forEach((p) => {
          const marker = new g.maps.Marker({
            position: { lat: p.lat, lng: p.lng },
            map,
            icon: pinIcon(g, colorOf(p.category)),
            title: p.name,
          });
          marker.addListener("click", () => {
            const info = infoRef.current;
            if (!info) return;
            const body =
              p.category === "alojamiento"
                ? `<div style="font-family:inherit;min-width:180px">
                     <p style="font-weight:700;color:#4a192c;margin:0 0 4px;font-size:13px">${p.name}</p>
                     <p style="margin:0 0 8px;font-size:12px;color:#5b5550">${p.detail}</p>
                     <a href="${wa(`Hola, quiero consultar disponibilidad de ${p.name}.`)}" target="_blank" rel="noreferrer"
                        style="font-size:11px;letter-spacing:.06em;text-transform:uppercase;font-weight:600;color:#4a192c">Consultar disponibilidad</a>
                   </div>`
                : `<div style="font-family:inherit;min-width:160px">
                     <p style="font-weight:700;color:#4a192c;margin:0 0 4px;font-size:13px">${p.name}</p>
                     <p style="margin:0;font-size:12px;color:#5b5550">${p.detail}</p>
                   </div>`;
            info.setContent(body);
            info.open(map, marker);
          });
          markersRef.current.push({ marker, category: p.category });
        });

        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
      markersRef.current = [];
    };
  }, [colorOf]);

  // Aplica los filtros cuando cambian las categorías activas.
  useEffect(() => {
    if (status !== "ready") return;
    markersRef.current.forEach(({ marker, category }) => {
      marker.setVisible(active[category]);
    });
    infoRef.current?.close();
  }, [active, status]);

  const toggle = useCallback((c: Category) => {
    setActive((prev) => ({ ...prev, [c]: !prev[c] }));
  }, []);

  const visibleCount = useMemo(
    () => places.filter((p) => active[p.category]).length,
    [active],
  );

  return (
    <div className={cn("relative", className)}>
      {/* Filtros / leyenda */}
      <div className="flex flex-wrap items-center gap-2 border border-border bg-card p-3">
        {CATEGORIES.map((c) => {
          const on = active[c.id];
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => toggle(c.id)}
              aria-pressed={on}
              className={cn(
                "inline-flex items-center gap-2 px-3 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] transition-colors",
                on ? "text-primary" : "text-muted-foreground/60",
              )}
            >
              <span
                className="inline-block h-2.5 w-2.5 rounded-full border border-white/70 transition-opacity"
                style={{ backgroundColor: c.color, opacity: on ? 1 : 0.35 }}
                aria-hidden
              />
              {c.label}
            </button>
          );
        })}
        <span className="kicker ml-auto text-muted-foreground">
          {visibleCount} {visibleCount === 1 ? "lugar" : "lugares"}
        </span>
      </div>

      {/* Contenedor del mapa */}
      <div className="relative h-[420px] w-full border border-t-0 border-border bg-secondary md:h-[520px]">
        <div ref={containerRef} className="absolute inset-0" />

        {status === "loading" && (
          <div className="absolute inset-0 flex items-center justify-center bg-secondary/80">
            <p className="kicker text-primary-soft">Cargando mapa de Asunción…</p>
          </div>
        )}

        {status === "error" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-secondary p-8 text-center">
            <p className="font-display text-lg text-primary">No se pudo cargar el mapa</p>
            <p className="max-w-xs text-xs text-muted-foreground">
              Volvé a intentarlo más tarde. Mientras tanto, navegá las ubicaciones
              desde las tarjetas.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
