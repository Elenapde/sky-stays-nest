import desayunoAsset from "@/assets/sky-stays-desayuno.png.asset.json";
import limpiezaImg from "@/assets/sky-stays-limpieza.jpg";
import trasladosAsset from "@/assets/sky-stays-traslados.jpg.asset.json";

const trasladosImg = trasladosAsset.url;

const desayunoImg = desayunoAsset.url;

/**
 * Servicios adicionales Sky Stays.
 *
 * Estructura administrable: agregar, reordenar o desactivar servicios editando
 * este arreglo (o reemplazándolo por una fuente de datos / CMS que devuelva el
 * mismo shape). La sección de la Home no hardcodea ningún servicio.
 */
export type SkyService = {
  /** Identificador estable (slug). */
  id: string;
  /** Nombre del servicio (eyebrow de la card). */
  name: string;
  /** Título experiencial. */
  title: string;
  /** Descripción breve. */
  description: string;
  /** Imagen del servicio. */
  image: string;
  /** Texto alternativo de la imagen. */
  imageAlt: string;
  /** Encuadre de la fotografía (CSS object-position). */
  imagePosition?: string;
  /** Orden de aparición (ascendente). */
  order: number;
  /** Activo / inactivo. */
  active: boolean;
  /** Indicador de costo adicional. */
  hasAdditionalCost: boolean;
  /** Indicador de agendamiento previo. */
  requiresScheduling: boolean;
};

export const services: SkyService[] = [
  {
    id: "desayuno",
    name: "Desayuno",
    title: "Empezá el día como quieras.",
    description:
      "Podés sumar desayuno a tu estadía y disfrutarlo sin salir de tu departamento.",
    image: desayunoImg,
    imageAlt:
      "Desayuno servido en la mesa de un departamento Sky Stays con vista a la ciudad",
    imagePosition: "center",
    order: 1,
    active: true,
    hasAdditionalCost: true,
    requiresScheduling: true,
  },
  {
    id: "traslados",
    name: "Traslados",
    title: "Llegá sin complicaciones.",
    description:
      "Contamos con servicio de traslado para hacer más simple tu llegada o salida.",
    image: trasladosImg,
    imageAlt:
      "Huésped llegando con equipaje al ingreso de un edificio de Sky Stays",
    imagePosition: "center",
    order: 2,
    active: true,
    hasAdditionalCost: true,
    requiresScheduling: true,
  },
  {
    id: "limpieza",
    name: "Limpieza durante tu estadía",
    title: "Tu espacio, siempre listo.",
    description:
      "Si necesitás una limpieza adicional durante tu estadía, podés coordinarla con nuestro equipo.",
    image: limpiezaImg,
    imageAlt:
      "Housekeeping preparando el dormitorio de un departamento Sky Stays",
    imagePosition: "center",
    order: 3,
    active: true,
    hasAdditionalCost: true,
    requiresScheduling: true,
  },
];

/** Servicios activos, ordenados por `order`. */
export function activeServices(list: SkyService[] = services) {
  return list.filter((s) => s.active).sort((a, b) => a.order - b.order);
}

/** Aclaración al pie, derivada de los indicadores de los servicios activos. */
export function servicesDisclaimer(list: SkyService[] = activeServices()) {
  const cost = list.some((s) => s.hasAdditionalCost);
  const scheduling = list.some((s) => s.requiresScheduling);
  const parts = [
    cost ? "con costo" : null,
    "sujetos a disponibilidad",
    scheduling ? "agendamiento previo" : null,
  ].filter(Boolean);
  return `Servicios adicionales ${parts.join(", ").replace(/, ([^,]*)$/, " y $1")}.`;
}
