import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Maximize2, Minimize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { wa } from "@/data/sky";

/* ----------------------------- Tipos y datos ----------------------------- */

type Category = "edificio" | "corporativo" | "compras" | "gastronomia";

interface Place {
  id: string;
  category: Category;
  name: string;
  detail: string;
  lat: number;
  lng: number;
}

const places: Place[] = [
  /* Edificios Sky Stays */
  { id: "e-petra", category: "edificio", name: "Petra Tower", detail: "Edificio Sky Stays · Las Lomas", lat: -25.27895, lng: -57.5622022 },
  { id: "e-forvm", category: "edificio", name: "Forvm Molas López", detail: "Edificio Sky Stays · Las Lomas", lat: -25.2770187, lng: -57.5671648 },
  { id: "e-life-santa-teresa", category: "edificio", name: "Life Santa Teresa", detail: "Edificio Sky Stays · Ykuá Satí", lat: -25.2871816, lng: -57.5629274 },
  { id: "e-spirit-bruselas", category: "edificio", name: "Spirit Bruselas", detail: "Edificio Sky Stays · Recoleta", lat: -25.2800142, lng: -57.5666515 },
  { id: "e-spirit-de-gaulle", category: "edificio", name: "Spirit de Gaulle", detail: "Edificio Sky Stays · Recoleta", lat: -25.287468, lng: -57.5802138 },
  { id: "e-spirit-mariscal", category: "edificio", name: "Spirit Mariscal", detail: "Edificio Sky Stays · Recoleta", lat: -25.3014468, lng: -57.6016616 },
  { id: "e-spirit-villa-morra", category: "edificio", name: "Spirit Villa Morra", detail: "Edificio Sky Stays · Recoleta", lat: -25.2992502, lng: -57.5888246 },
  { id: "e-life-de-gaulle", category: "edificio", name: "Life de Gaulle", detail: "Edificio Sky Stays · Recoleta", lat: -25.301143, lng: -57.5869069 },
  { id: "e-life-recoleta", category: "edificio", name: "Life Recoleta", detail: "Edificio Sky Stays · Recoleta", lat: -25.3007589, lng: -57.5878647 },
  { id: "e-life-mariscal", category: "edificio", name: "Life Mariscal", detail: "Edificio Sky Stays · Recoleta", lat: -25.3005, lng: -57.5872 },

  /* Corporativo */
  { id: "c-wtc", category: "corporativo", name: "World Trade Center Asunción", detail: "Torre corporativa · Las Lomas", lat: -25.2843526, lng: -57.5695765 },
  { id: "c-torres-paseo", category: "corporativo", name: "Torres del Paseo", detail: "Torre corporativa · Ykuá Satí", lat: -25.2839, lng: -57.5649 },

  /* Compras y entretenimiento */
  { id: "p-del-sol", category: "compras", name: "Shopping del Sol", detail: "Centro comercial · cine · restaurantes · Las Lomas", lat: -25.2828559, lng: -57.5692492 },
  { id: "p-galeria", category: "compras", name: "Paseo La Galería", detail: "Centro comercial · cine · restaurantes · Ykuá Satí", lat: -25.2842398, lng: -57.5654656 },
  { id: "p-mariscal", category: "compras", name: "Shopping Mariscal", detail: "Centro comercial · cine · restaurantes · Recoleta", lat: -25.2950826, lng: -57.5848556 },
  { id: "p-la-cuadrita", category: "compras", name: "La Cuadrita", detail: "Paseo y entretenimiento · Recoleta", lat: -25.2991573, lng: -57.5823058 },

  /* Gastronomía y cafés */
  { id: "g-tierra-colorada", category: "gastronomia", name: "Tierra Colorada Gastro", detail: "Restaurante · Mburucuyá", lat: -25.2733026, lng: -57.560242 },
  { id: "g-cafe-de-aca", category: "gastronomia", name: "El Café de Acá", detail: "Café · Villa Morra", lat: -25.2999189, lng: -57.5817754 },
  { id: "g-lapatiss", category: "gastronomia", name: "La Patiss", detail: "Café · Mburucuyá", lat: -25.2774356, lng: -57.564184 },
  { id: "g-la-galette", category: "gastronomia", name: "La Galette", detail: "Café · Mburucuyá", lat: -25.2778, lng: -57.5646 },
  { id: "g-almarreina", category: "gastronomia", name: "Almarreina", detail: "Café · Mburucuyá", lat: -25.2747107, lng: -57.5649537 },
  { id: "g-cafe-porfirio", category: "gastronomia", name: "El Café de Porfirio", detail: "Café · Recoleta", lat: -25.2998907, lng: -57.5837955 },
];

const CATEGORIES: { id: Category; label: string; color: string }[] = [
  { id: "edificio", label: "Edificios Sky Stays", color: "#4a192c" },
  { id: "corporativo", label: "Corporativo", color: "#1d2127" },
  { id: "compras", label: "Compras y entretenimiento", color: "#8a5a3b" },
  { id: "gastronomia", label: "Gastronomía y cafés", color: "#8a7b72" },
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
    scale: 0.55,
    anchor: new googleLib.maps.Point(0, 12),
  };
}

const CENTER = { lat: -25.2885, lng: -57.5755 };

/* ------------------------------- Componente ------------------------------ */

export function AsuncionMap({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<{ marker: any; category: Category }[]>([]);
  const infoRef = useRef<any>(null);

  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [expanded, setExpanded] = useState(false);
  const [active, setActive] = useState<Record<Category, boolean>>({
    edificio: true,
    corporativo: true,
    compras: true,
    gastronomia: true,
  });

  const colorOf = useCallback(
    (c: Category) => CATEGORIES.find((x) => x.id === c)?.color ?? "#4a192c",
    [],
  );

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
              p.category === "edificio"
                ? `<div style="font-family:inherit;min-width:180px">
                     <p style="font-weight:700;color:#4a192c;margin:0 0 4px;font-size:13px">${p.name}</p>
                     <p style="margin:0 0 8px;font-size:12px;color:#5b5550">${p.detail}</p>
                     <a href="${wa(`Hola, quiero consultar disponibilidad en ${p.name}.`)}" target="_blank" rel="noreferrer"
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

  useEffect(() => {
    if (status !== "ready") return;
    markersRef.current.forEach(({ marker, category }) => {
      marker.setVisible(active[category]);
    });
    infoRef.current?.close();
  }, [active, status]);

  // Reajusta el mapa al cambiar el tamaño del contenedor.
  useEffect(() => {
    if (status !== "ready" || !mapRef.current) return;
    const t = window.setTimeout(() => {
      window.google?.maps?.event?.trigger(mapRef.current, "resize");
      mapRef.current.setCenter(CENTER);
      mapRef.current.setZoom(expanded ? 14 : 13);
    }, 260);
    return () => window.clearTimeout(t);
  }, [expanded, status]);

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
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 border border-border bg-card p-3">
        {CATEGORIES.map((c) => {
          const on = active[c.id];
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => toggle(c.id)}
              aria-pressed={on}
              className={cn(
                "inline-flex items-center gap-2 px-2.5 py-1.5 text-[0.625rem] font-semibold uppercase tracking-[0.12em] transition-colors",
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
          {visibleCount} {visibleCount === 1 ? "punto" : "puntos"}
        </span>
      </div>

      {/* Contenedor del mapa */}
      <div
        className={cn(
          "relative w-full border border-t-0 border-border bg-secondary transition-[height] duration-300 ease-out",
          expanded ? "h-[70vh]" : "h-[240px] md:h-[300px]",
        )}
      >
        <div ref={containerRef} className="absolute inset-0" />

        {status === "ready" && (
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
              Volvé a intentarlo más tarde. Mientras tanto, navegá las ubicaciones
              desde las tarjetas.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
