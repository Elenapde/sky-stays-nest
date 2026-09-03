/**
 * Contenido administrable de la Guía de Asunción.
 *
 * Para agregar, editar o eliminar un lugar o un edificio, solo hay que tocar
 * este archivo: no hay datos de mapa hardcodeados en los componentes.
 *
 * Columnas equivalentes a la planilla PUNTOS DE INTERÉS_SKY STAYS:
 *   Nombre · Categoría · Barrio · Zona Sky Stays · Descripción corta ·
 *   Ideal para · Edificio Sky Stays cercano · Google Maps URL ·
 *   Latitud · Longitud · Imagen · Destacado
 */

import shoppingPhoto from "@/assets/sky-stays-shopping.png.asset.json";
import gastronomiaPhoto from "@/assets/sky-stays-gastronomia.png.asset.json";
import villaMorraPhoto from "@/assets/sky-stays-villa-morra.png.asset.json";
import recoletaPhoto from "@/assets/sky-stays-recoleta.png.asset.json";
import ycuaSatiPhoto from "@/assets/sky-stays-ycua-sati.png.asset.json";
import costaneraPhoto from "@/assets/sky-stays-costanera.jpeg.asset.json";
import negociosAerialPhoto from "@/assets/sky-stays-negocios-aerial.png.asset.json";

/* --------------------------------- Zonas ---------------------------------- */

export interface Zone {
  id: string;
  label: string;
  /** Descripción usada en el contenido indexable de la guía. */
  text: string;
}

export const zones: Zone[] = [
  {
    id: "eje-corporativo",
    label: "Eje Corporativo",
    text: "Las Lomas y Ykuá Satí: World Trade Center, Torres del Paseo, Shopping del Sol y Paseo La Galería. La zona elegida para alojamiento en viajes de negocios en Asunción.",
  },
  {
    id: "villa-morra",
    label: "Villa Morra",
    text: "Villa Morra y Mburucuyá: cafés de especialidad, restaurantes de autor y calles para caminar. Alojamiento en Villa Morra a pasos de la vida urbana de Asunción.",
  },
  {
    id: "recoleta",
    label: "Recoleta",
    text: "Recoleta y Carmelitas: Shopping Mariscal, La Cuadrita y gastronomía de barrio. Alojamiento en Recoleta, tranquilo y bien conectado con el centro corporativo.",
  },
];

/* --------------------------------- Categorías ----------------------------- */

export type CategoryId =
  | "gastronomia"
  | "cafe"
  | "shopping"
  | "entretenimiento"
  | "vida-nocturna"
  | "supermercado"
  | "cultura"
  | "aire-libre"
  | "negocios";

export interface Category {
  id: CategoryId;
  label: string;
  /** Color de pin (tokens de marca Sky Stays). */
  color: string;
}

export const categories: Category[] = [
  { id: "gastronomia", label: "Gastronomía", color: "#8a5a3b" },
  { id: "cafe", label: "Cafés", color: "#a08979" },
  { id: "shopping", label: "Shopping", color: "#6d3448" },
  { id: "entretenimiento", label: "Entretenimiento", color: "#7c6f8a" },
  { id: "vida-nocturna", label: "Vida nocturna", color: "#403050" },
  { id: "supermercado", label: "Supermercados 24 h", color: "#4f6b57" },
  { id: "cultura", label: "Cultura", color: "#5c6672" },
  { id: "aire-libre", label: "Aire libre", color: "#5f7a6b" },
  { id: "negocios", label: "Negocios", color: "#1d2127" },
];


export const BUILDING_COLOR = "#4a192c";

/* -------------------------------- Edificios ------------------------------- */

export interface Building {
  id: string;
  name: string;
  barrio: string;
  zone: string;
  mapsUrl: string;
  lat: number;
  lng: number;
  image?: string;
  /** URL de alojamientos disponibles en ese edificio. */
  staysUrl: string;
}

export const buildings: Building[] = [
  {
    id: "petra-tower",
    name: "Petra Tower",
    barrio: "Las Lomas",
    zone: "eje-corporativo",
    mapsUrl: "https://maps.app.goo.gl/2PMjf7XCveBUwLwH6",
    lat: -25.27895,
    lng: -57.5622022,
    image: negociosAerialPhoto.url,
    staysUrl: "/alojamientos?edificio=petra-tower",
  },
  {
    id: "forvm-molas-lopez",
    name: "Forvm Molas López",
    barrio: "Las Lomas",
    zone: "eje-corporativo",
    mapsUrl: "https://maps.app.goo.gl/9PmUMMdxiVX6eZYQ8",
    lat: -25.2770187,
    lng: -57.5671648,
    staysUrl: "/alojamientos?edificio=forvm-molas-lopez",
  },
  {
    id: "life-santa-teresa",
    name: "Life Santa Teresa",
    barrio: "Ykuá Satí",
    zone: "eje-corporativo",
    mapsUrl: "https://maps.app.goo.gl/xbsdj5LGXGZuL4M28",
    lat: -25.2871816,
    lng: -57.5629274,
    image: ycuaSatiPhoto.url,
    staysUrl: "/alojamientos?edificio=life-santa-teresa",
  },
  {
    id: "spirit-bruselas",
    name: "Spirit Bruselas",
    barrio: "Recoleta",
    zone: "recoleta",
    mapsUrl: "https://maps.app.goo.gl/yznXSAuUVoPk6bcn6",
    lat: -25.2800142,
    lng: -57.5666515,
    staysUrl: "/alojamientos?edificio=spirit-bruselas",
  },
  {
    id: "spirit-de-gaulle",
    name: "Spirit de Gaulle",
    barrio: "Recoleta",
    zone: "recoleta",
    mapsUrl: "https://maps.app.goo.gl/rXCKX15Yg8qZ5cPKA",
    lat: -25.287468,
    lng: -57.5802138,
    staysUrl: "/alojamientos?edificio=spirit-de-gaulle",
  },
  {
    id: "spirit-mariscal",
    name: "Spirit Mariscal",
    barrio: "Recoleta",
    zone: "recoleta",
    mapsUrl: "https://maps.app.goo.gl/rHYWJec2KCg6aU4E6",
    lat: -25.3014468,
    lng: -57.6016616,
    staysUrl: "/alojamientos?edificio=spirit-mariscal",
  },
  {
    id: "spirit-villa-morra",
    name: "Spirit Villa Morra",
    barrio: "Villa Morra",
    zone: "villa-morra",
    mapsUrl: "https://maps.app.goo.gl/HJTTr5GY8ihd6qVdA",
    lat: -25.2992502,
    lng: -57.5888246,
    image: villaMorraPhoto.url,
    staysUrl: "/alojamientos?edificio=spirit-villa-morra",
  },
  {
    id: "life-de-gaulle",
    name: "Life de Gaulle",
    barrio: "Recoleta",
    zone: "recoleta",
    mapsUrl: "https://maps.app.goo.gl/mTyFZSDtFPGKmiNX6",
    lat: -25.301143,
    lng: -57.5869069,
    staysUrl: "/alojamientos?edificio=life-de-gaulle",
  },
  {
    id: "life-recoleta",
    name: "Life Recoleta",
    barrio: "Recoleta",
    zone: "recoleta",
    mapsUrl: "https://maps.app.goo.gl/aowW1R5Bae9QDpVP7",
    lat: -25.3007589,
    lng: -57.5878647,
    image: recoletaPhoto.url,
    staysUrl: "/alojamientos?edificio=life-recoleta",
  },
  {
    id: "life-mariscal",
    name: "Life Mariscal",
    barrio: "Recoleta",
    zone: "recoleta",
    mapsUrl: "https://maps.app.goo.gl/M5ZoiBQ2xN2uaD8Z8",
    lat: -25.3005,
    lng: -57.5872,
    staysUrl: "/alojamientos?edificio=life-mariscal",
  },
  {
    id: "agora",
    name: "Agora",
    barrio: "Recoleta",
    zone: "recoleta",
    mapsUrl: "https://maps.app.goo.gl/RaWkCmmJpYdgjFyG7",
    lat: -25.297627,
    lng: -57.5860154,
    staysUrl: "/alojamientos?edificio=agora",
  },
];


/* ---------------------------- Puntos de interés --------------------------- */

export interface Place {
  id: string;
  name: string;
  category: CategoryId;
  barrio: string;
  zone: string;
  description: string;
  idealFor: string;
  nearBuilding: string;
  mapsUrl: string;
  lat: number;
  lng: number;
  image?: string;
  featured: boolean;
}

export const places: Place[] = [
  {
    id: "shopping-del-sol",
    name: "Shopping del Sol",
    category: "shopping",
    barrio: "Las Lomas",
    zone: "eje-corporativo",
    description:
      "El shopping clásico de Asunción: marcas internacionales, patio gastronómico y cine, a minutos del eje corporativo.",
    idealFor: "Compras y una tarde sin apuro",
    nearBuilding: "petra-tower",
    mapsUrl: "https://maps.app.goo.gl/jY7cHaM6ChdVGfzq7",
    lat: -25.2828559,
    lng: -57.5692492,
    image: shoppingPhoto.url,
    featured: true,
  },
  {
    id: "world-trade-center",
    name: "World Trade Center Asunción",
    category: "negocios",
    barrio: "Las Lomas",
    zone: "eje-corporativo",
    description:
      "El principal complejo de oficinas de la ciudad, con restaurantes y salas de reunión en las torres.",
    idealFor: "Viajes de negocios y reuniones",
    nearBuilding: "petra-tower",
    mapsUrl: "https://maps.app.goo.gl/m3tmwwTVvimekckx8",
    lat: -25.2843526,
    lng: -57.5695765,
    image: negociosAerialPhoto.url,
    featured: true,
  },
  {
    id: "paseo-la-galeria",
    name: "Paseo La Galería",
    category: "shopping",
    barrio: "Ykuá Satí",
    zone: "eje-corporativo",
    description:
      "Compras, gastronomía y cine dentro del complejo corporativo más nuevo de Asunción.",
    idealFor: "Compras y cenar cerca del hotel",
    nearBuilding: "life-santa-teresa",
    mapsUrl: "https://maps.app.goo.gl/Jxt3T4QgLceMgHcv7",
    lat: -25.2842398,
    lng: -57.5654656,
    image: shoppingPhoto.url,
    featured: true,
  },
  {
    id: "torres-del-paseo",
    name: "Torres del Paseo",
    category: "negocios",
    barrio: "Ykuá Satí",
    zone: "eje-corporativo",
    description:
      "Torres de oficinas sobre Santa Teresa, conectadas a Paseo La Galería.",
    idealFor: "Agenda corporativa",
    nearBuilding: "life-santa-teresa",
    mapsUrl: "https://maps.app.goo.gl/Jxt3T4QgLceMgHcv7",
    lat: -25.2839,
    lng: -57.5649,
    featured: false,
  },
  {
    id: "tierra-colorada",
    name: "Tierra Colorada Gastro",
    category: "gastronomia",
    barrio: "Mburucuyá",
    zone: "villa-morra",
    description:
      "Cocina paraguaya contemporánea, una de las mesas más reconocidas de Asunción.",
    idealFor: "Una cena especial",
    nearBuilding: "forvm-molas-lopez",
    mapsUrl: "https://maps.app.goo.gl/79qte5ocQATuh3kE9",
    lat: -25.2733026,
    lng: -57.560242,
    image: gastronomiaPhoto.url,
    featured: true,
  },
  {
    id: "shopping-mariscal",
    name: "Shopping Mariscal",
    category: "shopping",
    barrio: "Recoleta",
    zone: "recoleta",
    description:
      "Shopping urbano en el corazón de Recoleta, rodeado de cafés y restaurantes.",
    idealFor: "Compras rápidas y cine",
    nearBuilding: "life-mariscal",
    mapsUrl: "https://maps.app.goo.gl/V2wUHynVgzVfz6AB6",
    lat: -25.2950826,
    lng: -57.5848556,
    featured: false,
  },
  {
    id: "la-cuadrita",
    name: "La Cuadrita",
    category: "entretenimiento",
    barrio: "Recoleta",
    zone: "recoleta",
    description:
      "Paseo gastronómico al aire libre con bares, food trucks y música por la noche.",
    idealFor: "Salir a la noche",
    nearBuilding: "life-recoleta",
    mapsUrl: "https://maps.app.goo.gl/cW739Q1J9CVS6LAg9",
    lat: -25.2991573,
    lng: -57.5823058,
    image: villaMorraPhoto.url,
    featured: true,
  },
  {
    id: "el-cafe-de-aca",
    name: "El Café de Acá",
    category: "cafe",
    barrio: "Villa Morra",
    zone: "villa-morra",
    description:
      "Café de especialidad y panadería, ideal para trabajar unas horas o desayunar tranquilo.",
    idealFor: "Trabajar fuera del departamento",
    nearBuilding: "spirit-villa-morra",
    mapsUrl: "https://maps.app.goo.gl/covTMicSkG4qAL2bA",
    lat: -25.2999189,
    lng: -57.5817754,
    featured: false,
  },
  {
    id: "la-patiss",
    name: "La Patiss",
    category: "cafe",
    barrio: "Mburucuyá",
    zone: "villa-morra",
    description: "Pastelería francesa y café de barrio en Mburucuyá.",
    idealFor: "Desayuno o merienda",
    nearBuilding: "forvm-molas-lopez",
    mapsUrl: "https://maps.app.goo.gl/ZC4idojeuoXMQ1Nf8",
    lat: -25.2774356,
    lng: -57.564184,
    featured: false,
  },
  {
    id: "la-galette",
    name: "La Galette",
    category: "cafe",
    barrio: "Mburucuyá",
    zone: "villa-morra",
    description: "Panadería artesanal y café, a pasos del eje corporativo.",
    idealFor: "Café de mañana",
    nearBuilding: "forvm-molas-lopez",
    mapsUrl: "https://maps.app.goo.gl/GJpjuohcBUzxHtmV6",
    lat: -25.2778,
    lng: -57.5646,
    featured: false,
  },
  {
    id: "almarreina",
    name: "Almarreina",
    category: "cafe",
    barrio: "Mburucuyá",
    zone: "villa-morra",
    description: "Café y brunch con patio, en una casa de barrio reciclada.",
    idealFor: "Brunch de fin de semana",
    nearBuilding: "petra-tower",
    mapsUrl: "https://maps.app.goo.gl/DsDxCNAt9DXPvazj7",
    lat: -25.2747107,
    lng: -57.5649537,
    image: recoletaPhoto.url,
    featured: true,
  },
  {
    id: "el-cafe-de-porfirio",
    name: "El Café de Porfirio",
    category: "cafe",
    barrio: "Recoleta",
    zone: "recoleta",
    description: "Café clásico de Recoleta, con mesas afuera y pastelería propia.",
    idealFor: "Merienda cerca del alojamiento",
    nearBuilding: "life-recoleta",
    mapsUrl: "https://maps.app.goo.gl/VDnXPQmj415m4Sd68",
    lat: -25.2998907,
    lng: -57.5837955,
    featured: false,
  },
  {
    id: "parque-guasu",
    name: "Parque Guasu Metropolitano",
    category: "aire-libre",
    barrio: "Ykuá Satí",
    zone: "eje-corporativo",
    description:
      "El pulmón verde de Asunción: circuitos para correr, bicisenda y lagunas.",
    idealFor: "Correr o desconectar al aire libre",
    nearBuilding: "life-santa-teresa",
    mapsUrl: "https://maps.app.goo.gl/tB4ND9sfrRb5pLDy7",
    lat: -25.2905,
    lng: -57.5308,
    image: costaneraPhoto.url,
    featured: true,
  },
  {
    id: "parque-de-la-salud",
    name: "Parque de la Salud",
    category: "aire-libre",
    barrio: "Carmelitas",
    zone: "recoleta",
    description:
      "Parque urbano con senderos y equipamiento deportivo, en plena Carmelitas.",
    idealFor: "Caminar temprano",
    nearBuilding: "spirit-de-gaulle",
    mapsUrl: "https://maps.app.goo.gl/LFqNhGaYhJN5Popn8",
    lat: -25.2926,
    lng: -57.5748,
    featured: false,
  },
  {
    id: "museo-del-barro",
    name: "Museo del Barro",
    category: "cultura",
    barrio: "Mburucuyá",
    zone: "villa-morra",
    description:
      "Arte popular, indígena y contemporáneo paraguayo en uno de los museos más importantes del país.",
    idealFor: "Una tarde cultural",
    nearBuilding: "forvm-molas-lopez",
    mapsUrl: "https://maps.app.goo.gl/8ZBiCkLwmpEuLQ1c7",
    lat: -25.2933,
    lng: -57.5498,
    image: ycuaSatiPhoto.url,
    featured: true,
  },
  {
    id: "costanera-de-asuncion",
    name: "Costanera de Asunción",
    category: "aire-libre",
    barrio: "Centro",
    zone: "eje-corporativo",
    description:
      "Paseo sobre el río Paraguay, con atardeceres, ferias y bicisenda hasta el centro histórico.",
    idealFor: "Atardecer y paseo en bici",
    nearBuilding: "petra-tower",
    mapsUrl: "https://maps.app.goo.gl/wZfDLPMBk8i3Jr6E9",
    lat: -25.2712,
    lng: -57.6293,
    image: costaneraPhoto.url,
    featured: true,
  },
];

/* --------------------------------- Helpers -------------------------------- */

export const featuredPlaces = places.filter((p) => p.featured);

export function categoryLabel(id: CategoryId) {
  return categories.find((c) => c.id === id)?.label ?? id;
}

export function categoryColor(id: CategoryId) {
  return categories.find((c) => c.id === id)?.color ?? BUILDING_COLOR;
}

export function zoneLabel(id: string) {
  return zones.find((z) => z.id === id)?.label ?? id;
}

export function buildingById(id: string) {
  return buildings.find((b) => b.id === id);
}

/** Distancia en km entre dos coordenadas (haversine). */
export function distanceKm(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number },
) {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const la1 = (a.lat * Math.PI) / 180;
  const la2 = (b.lat * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(la1) * Math.cos(la2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

/** Texto aproximado de distancia y tiempo (caminando hasta 1,5 km). */
export function distanceLabel(
  from: { lat: number; lng: number },
  to: { lat: number; lng: number },
) {
  const km = distanceKm(from, to);
  const dist = km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(1).replace(".", ",")} km`;
  const mins =
    km <= 1.5
      ? `${Math.max(2, Math.round((km / 4.5) * 60))} min caminando`
      : `${Math.max(3, Math.round((km / 22) * 60))} min en auto`;
  return `${dist} · ${mins}`;
}
