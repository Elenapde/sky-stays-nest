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

import gastronomiaPhoto from "@/assets/sky-stays-gastronomia.png.asset.json";
import villaMorraPhoto from "@/assets/sky-stays-villa-morra.png.asset.json";
import recoletaPhoto from "@/assets/sky-stays-recoleta.png.asset.json";
import ycuaSatiPhoto from "@/assets/sky-stays-ycua-sati.png.asset.json";
import costaneraPhoto from "@/assets/sky-stays-costanera.jpeg.asset.json";
import negociosAerialPhoto from "@/assets/sky-stays-negocios-aerial.png.asset.json";
import mapBuildingAgoraJpg from "@/assets/building-agora-v2.jpg.asset.json";
import mapBuildingForvmMolasLopezJpg from "@/assets/building-forvm-molas-lopez.jpg.asset.json";
import mapBuildingLifeMariscalJpg from "@/assets/building-life-mariscal-v2.jpg.asset.json";
import mapBuildingLifeRecoletaJpg from "@/assets/building-life-recoleta.jpg.asset.json";
import mapBuildingLifeSantaTeresaJpg from "@/assets/building-life-santa-teresa.jpg.asset.json";
import mapBuildingPetraTowerPng from "@/assets/building-petra-tower.png.asset.json";
import mapBuildingSpiritBruselasJpg from "@/assets/building-spirit-bruselas-v2.jpg.asset.json";
import mapBuildingSpiritDeGaullePng from "@/assets/building-spirit-de-gaulle.png.asset.json";
import mapBuildingSpiritVillaMorraJpg from "@/assets/building-spirit-villa-morra.jpg.asset.json";
import mapBuildingSpiritMariscalJpg from "@/assets/building-spirit-mariscal.jpg.asset.json";
import mapPoi2AcuarelaPng from "@/assets/poi2-acuarela.png.asset.json";
import mapPoi2AlmaCocinaConFuegosPng from "@/assets/poi2-alma-cocina-con-fuegos.png.asset.json";
import mapPoi2AlmarreinaPng from "@/assets/poi2-almarreina.png.asset.json";
import mapPoi2BastardoPng from "@/assets/poi2-bastardo.png.asset.json";
import mapPoi2BiggiePng from "@/assets/poi2-biggie.png.asset.json";
import mapPoi2CasaColomboPng from "@/assets/poi2-casa-colombo.png.asset.json";
import mapPoi2ElCafeDeAcaPng from "@/assets/poi2-el-cafe-de-aca.png.asset.json";
import mapPoi2ElCafeDePorfirioPng from "@/assets/poi2-el-cafe-de-porfirio.png.asset.json";
import mapPoi2HardRockCafePng from "@/assets/poi2-hard-rock-cafe.png.asset.json";
import mapPoi2LaCuadritaPng from "@/assets/poi2-la-cuadrita.png.asset.json";
import mapPoi2LaGalettePng from "@/assets/poi2-la-galette.png.asset.json";
import mapPoi2LaPatissPng from "@/assets/poi2-la-patiss.png.asset.json";
import mapPoi2MokaiPng from "@/assets/poi2-mokai.png.asset.json";
import mapPoi2MorganWarehousePng from "@/assets/poi2-morgan-warehouse.png.asset.json";
import mapPoi2MusiuPng from "@/assets/poi2-musiu.png.asset.json";
import mapPoi2OGauchoPng from "@/assets/poi2-o-gaucho.png.asset.json";
import mapPoi2ParqueDeLaSaludJpg from "@/assets/poi2-parque-de-la-salud.jpg.asset.json";
import mapPoi2ParqueGuasuJpg from "@/assets/poi2-parque-guasu.jpg.asset.json";
import mapPoi2PaseoLaGaleriaJpg from "@/assets/poi2-paseo-la-galeria.jpg.asset.json";
import mapPoi2PaseoLosArbolesPng from "@/assets/poi2-paseo-los-arboles.png.asset.json";
import mapPoi2QuattroDPng from "@/assets/poi2-quattro-d.png.asset.json";
import mapPoi2ShoppingDelSolJpg from "@/assets/poi2-shopping-del-sol-v2.png.asset.json";
import mapPoi2ShoppingMariscalPng from "@/assets/poi2-shopping-mariscal.png.asset.json";
import mapPoi2SushiclubPng from "@/assets/poi2-sushiclub.png.asset.json";
import mapPoi2TakuareePng from "@/assets/poi2-takuaree.png.asset.json";
import mapPoi2TierraColoradaPng from "@/assets/poi2-tierra-colorada.png.asset.json";
import mapPoi2TorresDelPaseoJpg from "@/assets/poi2-torres-del-paseo.jpg.asset.json";
import mapPoi2VillaMorraFoodParkPng from "@/assets/poi2-villa-morra-food-park.png.asset.json";
import mapPoi2WorldTradeCenterJpg from "@/assets/poi2-world-trade-center.jpg.asset.json";
import mapPoi3CasaIndependenciaWebp from "@/assets/poi3-casa-independencia.webp.asset.json";
import mapPoi3PanteonHeroesJpg from "@/assets/poi3-panteon-heroes.jpg.asset.json";
import mapPoi3PlayaCostaneraJpg from "@/assets/poi3-playa-costanera.jpg.asset.json";
import mapPoi3ManzanaRiveraPng from "@/assets/poi3-manzana-rivera.webp.asset.json";
import mapPoi3CasaClariPng from "@/assets/poi3-casa-clari.png.asset.json";
import mapPoi3TeatroMunicipalWebp from "@/assets/poi3-teatro-municipal.webp.asset.json";
import mapPoi3ElBolsiPng from "@/assets/poi3-el-bolsi.png.asset.json";

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
  {
    id: "centro-historico",
    label: "Centro Histórico",
    text: "El casco antiguo de Asunción: Panteón de los Héroes, Casa de la Independencia, Manzana de la Rivera, el Teatro Municipal y la Costanera. La zona para conocer la historia y la vida cultural de la ciudad.",
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
        image: mapBuildingPetraTowerPng.url,
staysUrl: "/alojamientos?edificio=petra-tower",
  },
  {
    id: "forvm-molas-lopez",
    name: "Forvm Molas López",
    barrio: "Las Lomas",
    zone: "eje-corporativo",
    mapsUrl: "https://maps.app.goo.gl/9PmUMMdxiVX6eZYQ8",
    lat: -25.2770187,
    lng: -57.5645899,
        image: mapBuildingForvmMolasLopezJpg.url,
staysUrl: "/alojamientos?edificio=forvm-molas-lopez",
  },
  {
    id: "life-santa-teresa",
    name: "Life Santa Teresa",
    barrio: "Ykuá Satí",
    zone: "eje-corporativo",
    mapsUrl: "https://maps.app.goo.gl/xbsdj5LGXGZuL4M28",
    lat: -25.2871816,
    lng: -57.5603525,
        image: mapBuildingLifeSantaTeresaJpg.url,
staysUrl: "/alojamientos?edificio=life-santa-teresa",
  },
  {
    id: "spirit-bruselas",
    name: "Spirit Bruselas",
    barrio: "Recoleta",
    zone: "recoleta",
    mapsUrl: "https://maps.app.goo.gl/yznXSAuUVoPk6bcn6",
    lat: -25.2874684,
    lng: -57.5699141,
        image: mapBuildingSpiritBruselasJpg.url,
staysUrl: "/alojamientos?edificio=spirit-bruselas",
  },
  {
    id: "spirit-de-gaulle",
    name: "Spirit de Gaulle",
    barrio: "Recoleta",
    zone: "recoleta",
    mapsUrl: "https://maps.app.goo.gl/rXCKX15Yg8qZ5cPKA",
    lat: -25.3014468,
    lng: -57.5841521,
        image: mapBuildingSpiritDeGaullePng.url,
staysUrl: "/alojamientos?edificio=spirit-de-gaulle",
  },
  {
    id: "spirit-mariscal",
    name: "Spirit Mariscal",
    barrio: "Recoleta",
    zone: "recoleta",
    mapsUrl: "https://maps.app.goo.gl/rHYWJec2KCg6aU4E6",
    lat: -25.296828,
    lng: -57.5809934,
    image: mapBuildingSpiritMariscalJpg.url,
    staysUrl: "/alojamientos?edificio=spirit-mariscal",
  },
  {
    id: "spirit-villa-morra",
    name: "Spirit Villa Morra",
    barrio: "Villa Morra",
    zone: "villa-morra",
    mapsUrl: "https://maps.app.goo.gl/HJTTr5GY8ihd6qVdA",
    lat: -25.2992503,
    lng: -57.5839537,
        image: mapBuildingSpiritVillaMorraJpg.url,
staysUrl: "/alojamientos?edificio=spirit-villa-morra",
  },
  {
    id: "life-recoleta",
    name: "Life Recoleta",
    barrio: "Recoleta",
    zone: "recoleta",
    mapsUrl: "https://maps.app.goo.gl/aowW1R5Bae9QDpVP7",
    lat: -25.3007589,
    lng: -57.5852898,
        image: mapBuildingLifeRecoletaJpg.url,
staysUrl: "/alojamientos?edificio=life-recoleta",
  },
  {
    id: "life-mariscal",
    name: "Life Mariscal",
    barrio: "Recoleta",
    zone: "recoleta",
    mapsUrl: "https://maps.app.goo.gl/M5ZoiBQ2xN2uaD8Z8",
    lat: -25.2966498,
    lng: -57.5853954,
        image: mapBuildingLifeMariscalJpg.url,
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
        image: mapBuildingAgoraJpg.url,
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
  /** Edificio Sky Stays principal más cercano. */
  nearBuilding: string;
  /** Edificios Sky Stays relacionados (etapa 2). */
  relatedBuildings?: string[];
  mapsUrl: string;
  lat: number;
  lng: number;
  image?: string;
  instagram?: string;
  website?: string;
  /** Etiquetas libres: "Ideal para…", tipo de plan, etc. */
  tags?: string[];
  featured: boolean;
  /** Orden de aparición (menor primero). Si falta, se usa el orden del array. */
  order?: number;
  /** Activo / inactivo: los inactivos no se muestran ni en cards ni en el mapa. */
  active?: boolean;
}


export const places: Place[] = [
  {
    id: "shopping-del-sol",
    name: "Shopping del Sol",
    category: "shopping",
    barrio: "Las Lomas",
    zone: "eje-corporativo",
    description:
      "Uno de los principales centros comerciales de Asunción, con una amplia propuesta de tiendas, gastronomía y entretenimiento. Una parada ideal para disfrutar de compras y pasar unas horas en la ciudad.",
    idealFor: "Compras y una tarde sin apuro",
    nearBuilding: "petra-tower",
    mapsUrl: "https://maps.app.goo.gl/jY7cHaM6ChdVGfzq7",
    lat: -25.2828559,
    lng: -57.5692492,
        image: mapPoi2ShoppingDelSolJpg.url,
featured: true,
    instagram: "https://www.instagram.com/delsolpy/",
  },
  {
    id: "world-trade-center",
    name: "World Trade Center Asunción",
    category: "negocios",
    barrio: "Las Lomas",
    zone: "eje-corporativo",
    description:
      "Un referente del eje corporativo de Asunción, que reúne oficinas y actividad empresarial en una de las zonas más dinámicas de la capital.",
    idealFor: "Viajes de negocios y reuniones",
    nearBuilding: "petra-tower",
    mapsUrl: "https://maps.app.goo.gl/m3tmwwTVvimekckx8",
    lat: -25.2843526,
    lng: -57.5695765,
        image: mapPoi2WorldTradeCenterJpg.url,
featured: true,
    instagram: "https://www.instagram.com/wtcasuncion/",
  },
  {
    id: "paseo-la-galeria",
    name: "Paseo La Galería",
    category: "shopping",
    barrio: "Ykuá Satí",
    zone: "eje-corporativo",
    description:
      "Un moderno complejo que combina compras, gastronomía, entretenimiento y espacios corporativos. Con tiendas como Zara y H&M, es el principal atractivo comercial de la ciudad.",
    idealFor: "Compras y cenar cerca del hotel",
    nearBuilding: "life-santa-teresa",
    mapsUrl: "https://maps.app.goo.gl/Jxt3T4QgLceMgHcv7",
    lat: -25.2842398,
    lng: -57.5654656,
        image: mapPoi2PaseoLaGaleriaJpg.url,
featured: true,
    instagram: "https://www.instagram.com/paseolagaleria.py/",
  },
  {
    id: "torres-del-paseo",
    name: "Torres del Paseo",
    category: "negocios",
    barrio: "Ykuá Satí",
    zone: "eje-corporativo",
    description:
      "Un complejo corporativo ubicado en una de las principales zonas de negocios de Asunción.",
    idealFor: "Agenda corporativa",
    nearBuilding: "life-santa-teresa",
    mapsUrl: "https://maps.app.goo.gl/Jxt3T4QgLceMgHcv7",
    lat: -25.2839,
    lng: -57.5649,
        image: mapPoi2TorresDelPaseoJpg.url,
featured: false,
    instagram: "https://www.instagram.com/bctorresdelpaseo/",
  },
  {
    id: "tierra-colorada",
    name: "Tierra Colorada Gastro",
    category: "gastronomia",
    barrio: "Mburucuyá",
    zone: "villa-morra",
    description:
      "Una propuesta gastronómica que reinterpreta sabores e ingredientes paraguayos desde una mirada contemporánea. Asunción.",
    idealFor: "Una cena especial",
    nearBuilding: "forvm-molas-lopez",
    mapsUrl: "https://maps.app.goo.gl/79qte5ocQATuh3kE9",
    lat: -25.2733026,
    lng: -57.560242,
        image: mapPoi2TierraColoradaPng.url,
featured: true,
  },
  {
    id: "shopping-mariscal",
    name: "Shopping Mariscal",
    category: "shopping",
    barrio: "Recoleta",
    zone: "recoleta",
    description:
      "Un centro comercial en el corazón de Recoleta, con tiendas, gastronomía y espacios para disfrutar durante el día.",
    idealFor: "Compras rápidas y cine",
    nearBuilding: "life-mariscal",
    mapsUrl: "https://maps.app.goo.gl/V2wUHynVgzVfz6AB6",
    lat: -25.2950826,
    lng: -57.5848556,
        image: mapPoi2ShoppingMariscalPng.url,
featured: false,
    instagram: "https://www.instagram.com/shoppingmariscal/",
  },
  {
    id: "la-cuadrita",
    name: "La Cuadrita",
    category: "entretenimiento",
    barrio: "Recoleta",
    zone: "recoleta",
    description:
      "Un paseo gastronómico y de entretenimiento en Recoleta, con diferentes propuestas para comer, tomar algo y compartir.",
    idealFor: "Salir a la noche",
    nearBuilding: "life-recoleta",
    mapsUrl: "https://maps.app.goo.gl/cW739Q1J9CVS6LAg9",
    lat: -25.2991573,
    lng: -57.5823058,
        image: mapPoi2LaCuadritaPng.url,
featured: true,
    instagram: "https://www.instagram.com/lacuadrita.asu/",
  },
  {
    id: "el-cafe-de-aca",
    name: "El Café de Acá",
    category: "cafe",
    barrio: "Villa Morra",
    zone: "villa-morra",
    description:
      "Un espacio para disfrutar de un café, desayunar o hacer una pausa en Villa Morra, con una propuesta gastronómica y una identidad muy vinculada a Paraguay.",
    idealFor: "Trabajar fuera del departamento",
    nearBuilding: "spirit-villa-morra",
    mapsUrl: "https://maps.app.goo.gl/covTMicSkG4qAL2bA",
    lat: -25.2999189,
    lng: -57.5817754,
        image: mapPoi2ElCafeDeAcaPng.url,
featured: false,
    instagram: "https://www.instagram.com/elcafedeaca/",
  },
  {
    id: "la-patiss",
    name: "La Patiss",
    category: "cafe",
    barrio: "Mburucuyá",
    zone: "villa-morra",
    description:
      "Una propuesta de pastelería y café para disfrutar de algo dulce, desayunar o hacer una pausa durante el día.",
    idealFor: "Desayuno o merienda",
    nearBuilding: "forvm-molas-lopez",
    mapsUrl: "https://maps.app.goo.gl/ZC4idojeuoXMQ1Nf8",
    lat: -25.2774356,
    lng: -57.564184,
        image: mapPoi2LaPatissPng.url,
featured: false,
    instagram: "https://www.instagram.com/lapatiss/",
  },
  {
    id: "la-galette",
    name: "La Galette",
    category: "cafe",
    barrio: "Mburucuyá",
    zone: "villa-morra",
    description:
      "Un espacio de café y pastelería Francesa para disfrutar de una pausa dulce, un desayuno o una merienda.",
    idealFor: "Café de mañana",
    nearBuilding: "forvm-molas-lopez",
    mapsUrl: "https://maps.app.goo.gl/GJpjuohcBUzxHtmV6",
    lat: -25.2778,
    lng: -57.5646,
        image: mapPoi2LaGalettePng.url,
featured: false,
    instagram: "https://www.instagram.com/lagalette.paraguay/",
  },
  {
    id: "almarreina",
    name: "Almarreina",
    category: "cafe",
    barrio: "Mburucuyá",
    zone: "villa-morra",
    description:
      "Una propuesta de café y gastronomía para disfrutar de un desayuno, una merienda o una pausa durante el día.",
    idealFor: "Brunch de fin de semana",
    nearBuilding: "petra-tower",
    mapsUrl: "https://maps.app.goo.gl/DsDxCNAt9DXPvazj7",
    lat: -25.2747107,
    lng: -57.5649537,
        image: mapPoi2AlmarreinaPng.url,
featured: true,
    instagram: "https://www.instagram.com/almarreina/",
  },
  {
    id: "el-cafe-de-porfirio",
    name: "El Café de Porfirio",
    category: "cafe",
    barrio: "Recoleta",
    zone: "recoleta",
    description:
      "Un café con una propuesta gastronómica para disfrutar de desayunos, meriendas y momentos de pausa.",
    idealFor: "Merienda cerca del alojamiento",
    nearBuilding: "life-recoleta",
    mapsUrl: "https://maps.app.goo.gl/VDnXPQmj415m4Sd68",
    lat: -25.2998907,
    lng: -57.5837955,
        image: mapPoi2ElCafeDePorfirioPng.url,
featured: false,
    instagram: "https://www.instagram.com/elcafedeporfirio/",
  },
  {
    id: "parque-guasu",
    name: "Parque Guasu Metropolitano",
    category: "aire-libre",
    barrio: "Ykuá Satí",
    zone: "eje-corporativo",
    description:
      "Uno de los grandes espacios verdes de Asunción, ideal para caminar, correr o disfrutar de un momento al aire libre.",
    idealFor: "Correr o desconectar al aire libre",
    nearBuilding: "life-santa-teresa",
    mapsUrl: "https://maps.app.goo.gl/tB4ND9sfrRb5pLDy7",
    lat: -25.2905,
    lng: -57.5308,
        image: mapPoi2ParqueGuasuJpg.url,
featured: true,
    instagram: "https://www.instagram.com/parqueguasu/",
  },
  {
    id: "parque-de-la-salud",
    name: "Parque de la Salud",
    category: "aire-libre",
    barrio: "Carmelitas",
    zone: "recoleta",
    description:
      "Un espacio verde para caminar, hacer ejercicio y disfrutar de un momento de tranquilidad.",
    idealFor: "Caminar temprano",
    nearBuilding: "spirit-de-gaulle",
    mapsUrl: "https://maps.app.goo.gl/LFqNhGaYhJN5Popn8",
    lat: -25.2926,
    lng: -57.5748,
        image: mapPoi2ParqueDeLaSaludJpg.url,
featured: false,
    instagram: "https://www.instagram.com/parquedelasaludips/",
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
  {
    id: "villa-morra-food-park",
    name: "Villa Morra Food Park",
    category: "gastronomia",
    barrio: "Villa Morra",
    zone: "villa-morra",
    description:
      "Un espacio gastronómico que reúne diferentes propuestas para comer y compartir en un ambiente informal. Una alternativa para disfrutar de una salida con amigos o familia en Villa Morra.",
    idealFor: "Cenar informal en grupo",
    nearBuilding: "spirit-villa-morra",
    mapsUrl: "https://maps.app.goo.gl/Uw5p6yhgRezpx2r97",
    lat: -25.2933884,
    lng: -57.5808481,
        image: mapPoi2VillaMorraFoodParkPng.url,
featured: false,
    instagram: "https://www.instagram.com/villamorrapark/",
  },
  {
    id: "o-gaucho",
    name: "O Gaucho",
    category: "gastronomia",
    barrio: "Recoleta",
    zone: "recoleta",
    description:
      "Una de las mejores churrasquerías de la ciudad, para quienes disfrutan de las carnes y la tradición de la parrilla.",
    idealFor: "Una cena de carnes",
    nearBuilding: "agora",
    mapsUrl: "https://maps.app.goo.gl/yyV9i4xoKqufv6E4A",
    lat: -25.2963028,
    lng: -57.5888511,
        image: mapPoi2OGauchoPng.url,
featured: false,
    instagram: "https://www.instagram.com/churrasqueriaogaucho/",
  },
  {
    id: "acuarela",
    name: "Acuarela",
    category: "gastronomia",
    barrio: "Villa Morra",
    zone: "villa-morra",
    description:
      "Una propuesta gastronómica con especialidad en parrilla, ideal para quienes buscan disfrutar de carnes y compartir una comida en Villa Morra.",
    idealFor: "Almuerzo o cena en familia",
    nearBuilding: "spirit-villa-morra",
    mapsUrl: "https://maps.app.goo.gl/XT7NAH1eN6vJvc1P7",
    lat: -25.2953148,
    lng: -57.5761726,
        image: mapPoi2AcuarelaPng.url,
featured: false,
    instagram: "https://www.instagram.com/acuarela_py/",
  },
  {
    id: "quattro-d",
    name: "Quattro D",
    category: "gastronomia",
    barrio: "Villa Morra",
    zone: "villa-morra",
    description:
      "Una heladería Italiana para disfrutar de una pausa dulce durante tu recorrido por Asunción.",
    idealFor: "Un postre después de cenar",
    nearBuilding: "spirit-villa-morra",
    mapsUrl: "https://maps.app.goo.gl/qLtiSwQjnYTyerj77",
    lat: -25.2934402,
    lng: -57.5763761,
        image: mapPoi2QuattroDPng.url,
featured: false,
    instagram: "https://www.instagram.com/quattrodpy/",
  },
  {
    id: "morgan-warehouse",
    name: "Morgan Warehouse",
    category: "vida-nocturna",
    barrio: "Villa Morra",
    zone: "villa-morra",
    description:
      "Un espacio de vida nocturna en Villa Morra, ideal para quienes buscan salir a tomar algo y disfrutar del ambiente de Asunción. Una alternativa para una noche entre amigos.",
    idealFor: "Salir de noche",
    nearBuilding: "spirit-villa-morra",
    mapsUrl: "https://maps.app.goo.gl/CVDoKko3quBjCczKA",
    lat: -25.2895497,
    lng: -57.5837,
        image: mapPoi2MorganWarehousePng.url,
featured: false,
    instagram: "https://www.instagram.com/morganwarehouse/",
  },
  {
    id: "casa-colombo",
    name: "Casa Colombo",
    category: "vida-nocturna",
    barrio: "Villa Morra",
    zone: "villa-morra",
    description:
      "Una propuesta de vida nocturna en Villa Morra para quienes buscan disfrutar de música, tragos y un ambiente diferente.",
    idealFor: "Tragos y noche tranquila",
    nearBuilding: "spirit-villa-morra",
    mapsUrl: "https://maps.app.goo.gl/1aSyywxzFRiCZpaw5",
    lat: -25.287639,
    lng: -57.5774108,
        image: mapPoi2CasaColomboPng.url,
featured: false,
    instagram: "https://www.instagram.com/studiocolombopy/",
  },
  {
    id: "hard-rock-cafe",
    name: "Hard Rock Cafe Asunción",
    category: "vida-nocturna",
    barrio: "Villa Morra",
    zone: "villa-morra",
    description:
      "Una propuesta internacional que combina gastronomía, música y entretenimiento. Una opción para disfrutar de una salida informal en Villa Morra.",
    idealFor: "Salir con música en vivo",
    nearBuilding: "spirit-villa-morra",
    mapsUrl: "https://maps.app.goo.gl/dwU2vFSYkDe9yW8t9",
    lat: -25.2894061,
    lng: -57.5738499,
        image: mapPoi2HardRockCafePng.url,
featured: false,
    instagram: "https://www.instagram.com/hardrockasu/",
  },
  {
    id: "mokai",
    name: "Mokai",
    category: "vida-nocturna",
    barrio: "Las Lomas",
    zone: "eje-corporativo",
    description:
      "Un espacio de vida nocturna para quienes buscan disfrutar de música y salir con amigos.",
    idealFor: "Salir de noche",
    nearBuilding: "petra-tower",
    mapsUrl: "https://maps.app.goo.gl/4BeRZEjCBCsfKw6R6",
    lat: -25.2816405,
    lng: -57.5652252,
        image: mapPoi2MokaiPng.url,
featured: false,
    instagram: "https://www.instagram.com/mokai.py/",
  },
  {
    id: "takuaree",
    name: "Takuaree Restaurant",
    category: "gastronomia",
    barrio: "Ykuá Satí",
    zone: "eje-corporativo",
    description:
      "Una propuesta gastronómica que fusiona la gastronomía mediterránea en sinfonía con la gastronomía paraguaya.",
    idealFor: "Almuerzo de trabajo",
    nearBuilding: "life-santa-teresa",
    mapsUrl: "https://maps.app.goo.gl/oDyqix2bPALSveTB6",
    lat: -25.2848237,
    lng: -57.5683996,
        image: mapPoi2TakuareePng.url,
featured: false,
    instagram: "https://www.instagram.com/takuareepy/",
  },
  {
    id: "sushiclub",
    name: "Sushiclub",
    category: "gastronomia",
    barrio: "Las Lomas",
    zone: "eje-corporativo",
    description:
      "Una propuesta de cocina japonesa y sushi para quienes buscan una alternativa gastronómica durante su estadía.",
    idealFor: "Cena rápida y liviana",
    nearBuilding: "forvm-molas-lopez",
    mapsUrl: "https://maps.app.goo.gl/DSjrGnNER6iXS2rY8",
    lat: -25.2763461,
    lng: -57.5657266,
        image: mapPoi2SushiclubPng.url,
featured: false,
    instagram: "https://www.instagram.com/sushiclub_py/",
  },
  {
    id: "musiu",
    name: "Musiu",
    category: "gastronomia",
    barrio: "Las Lomas",
    zone: "eje-corporativo",
    description:
      "Un restaurante de comida Peruana para disfrutar de una salida gastronómica durante tu estadía.",
    idealFor: "Una cena tranquila",
    nearBuilding: "petra-tower",
    mapsUrl: "https://maps.app.goo.gl/MWdeVujYeg9jrsoh9",
    lat: -25.2810057,
    lng: -57.5635039,
        image: mapPoi2MusiuPng.url,
featured: false,
    instagram: "https://www.instagram.com/musiuresto.py/",
  },
  {
    id: "alma-cocina-con-fuegos",
    name: "Alma Cocina con Fuegos",
    category: "gastronomia",
    barrio: "Las Lomas",
    zone: "eje-corporativo",
    description:
      "Una propuesta gastronómica donde el fuego es protagonista. Una opción para quienes disfrutan de las carnes, la cocina contemporánea y una experiencia culinaria diferente en Asunción.",
    idealFor: "Una cena especial",
    nearBuilding: "petra-tower",
    mapsUrl: "https://maps.app.goo.gl/Ga5xkcDKE5hn9WYEA",
    lat: -25.2802126,
    lng: -57.5661352,
        image: mapPoi2AlmaCocinaConFuegosPng.url,
featured: false,
    instagram: "https://www.instagram.com/almacocinaconfuegos/",
  },
  {
    id: "bastardo",
    name: "Bastardo",
    category: "gastronomia",
    barrio: "Las Lomas",
    zone: "eje-corporativo",
    description:
      "Una propuesta gastronómica para disfrutar de una salida y descubrir nuevos sabores.",
    idealFor: "Cenar y quedarse un rato",
    nearBuilding: "petra-tower",
    mapsUrl: "https://maps.app.goo.gl/SWYqJ4B42Gv2tcBA7",
    lat: -25.2824647,
    lng: -57.5633756,
        image: mapPoi2BastardoPng.url,
featured: false,
    instagram: "https://www.instagram.com/bastardo_py/",
  },
  {
    id: "paseo-los-arboles",
    name: "Paseo Los Árboles",
    category: "shopping",
    barrio: "Villa Morra",
    zone: "villa-morra",
    description:
      "Un paseo comercial en Villa Morra que reúne propuestas de compras y gastronomía en un entorno agradable.",
    idealFor: "Compras y una pausa",
    nearBuilding: "spirit-villa-morra",
    mapsUrl: "https://maps.app.goo.gl/K2NUAmXjsnQ41Ezr6",
    lat: -25.2919782,
    lng: -57.5740021,
        image: mapPoi2PaseoLosArbolesPng.url,
featured: false,
    instagram: "https://www.instagram.com/paseolosarboles/",
  },
  {
    id: "biggie-pacheco",
    name: "Biggie Express Pacheco",
    category: "supermercado",
    barrio: "Recoleta",
    zone: "recoleta",
    description: "Supermercado abierto 24 horas para resolver la compra a cualquier hora.",
    idealFor: "Compras de último momento",
    nearBuilding: "agora",
    mapsUrl: "https://maps.app.goo.gl/Qp2akXWMyW4EmSNV8",
    lat: -25.2970569,
    lng: -57.5865055,
        image: mapPoi2BiggiePng.url,
featured: false,
  },
  {
    id: "biggie-legion-civil",
    name: "Biggie Express Legión Civil",
    category: "supermercado",
    barrio: "Recoleta",
    zone: "recoleta",
    description: "Supermercado 24 horas, a minutos de los edificios de Recoleta.",
    idealFor: "Compras de último momento",
    nearBuilding: "agora",
    mapsUrl: "https://maps.app.goo.gl/HqoB2mErUuVSfWE88",
    lat: -25.294918,
    lng: -57.5859138,
        image: mapPoi2BiggiePng.url,
featured: false,
  },
  {
    id: "biggie-los-laureles",
    name: "Biggie Express Los Laureles",
    category: "supermercado",
    barrio: "Los Laureles",
    zone: "recoleta",
    description: "Supermercado 24 horas en Los Laureles.",
    idealFor: "Compras de último momento",
    nearBuilding: "life-recoleta",
    mapsUrl: "https://maps.app.goo.gl/4Vr8UKemqZwspEnk9",
    lat: -25.3029633,
    lng: -57.5813456,
        image: mapPoi2BiggiePng.url,
featured: false,
  },
  {
    id: "biggie-las-palmeras",
    name: "Biggie Express Las Palmeras",
    category: "supermercado",
    barrio: "Recoleta",
    zone: "recoleta",
    description: "Supermercado 24 horas cerca de los edificios Life y Spirit.",
    idealFor: "Compras de último momento",
    nearBuilding: "life-recoleta",
    mapsUrl: "https://maps.app.goo.gl/F2cn94ZH3qYJwkc46",
    lat: -25.3031016,
    lng: -57.5851322,
        image: mapPoi2BiggiePng.url,
featured: false,
  },
  {
    id: "biggie-san-martin",
    name: "Biggie Express San Martín",
    category: "supermercado",
    barrio: "Villa Morra",
    zone: "villa-morra",
    description: "Supermercado 24 horas sobre San Martín.",
    idealFor: "Compras de último momento",
    nearBuilding: "spirit-villa-morra",
    mapsUrl: "https://maps.app.goo.gl/TfbTodejpubbYknP7",
    lat: -25.2871107,
    lng: -57.5719073,
        image: mapPoi2BiggiePng.url,
featured: false,
  },
  {
    id: "biggie-molas-lopez",
    name: "Biggie Express Molas López",
    category: "supermercado",
    barrio: "Las Lomas",
    zone: "eje-corporativo",
    description: "Supermercado 24 horas a pasos de Forvm Molas López.",
    idealFor: "Compras de último momento",
    nearBuilding: "forvm-molas-lopez",
    mapsUrl: "https://maps.app.goo.gl/mwiaU3YA6KE5Tdi86",
    lat: -25.277408,
    lng: -57.5647971,
        image: mapPoi2BiggiePng.url,
featured: false,
  },
  {
    id: "museo-casa-independencia",
    name: "Museo Casa de la Independencia",
    category: "cultura",
    barrio: "Centro Histórico",
    zone: "centro-historico",
    description:
      "Una casa histórica vinculada al proceso de independencia del Paraguay. Una visita para conocer parte de la historia del país y descubrir el patrimonio del Centro Histórico de Asunción.",
    idealFor: "Una mañana de historia",
    nearBuilding: "petra-tower",
    mapsUrl: "https://maps.app.goo.gl/SyBsS7GoeNyYZGxh7",
    lat: -25.2805476,
    lng: -57.6372319,
    image: mapPoi3CasaIndependenciaWebp.url,
    featured: true,
  },
  {
    id: "panteon-de-los-heroes",
    name: "Panteón de los Héroes",
    category: "cultura",
    barrio: "Centro Histórico",
    zone: "centro-historico",
    description:
      "Uno de los monumentos más emblemáticos de Asunción, dedicado a figuras importantes de la historia paraguaya. Una parada para conocer el patrimonio nacional y recorrer el corazón del Centro Histórico.",
    idealFor: "Recorrer el centro a pie",
    nearBuilding: "petra-tower",
    mapsUrl: "https://maps.app.goo.gl/sfcGxUxE17rRcjB2A",
    lat: -25.2812606,
    lng: -57.6361858,
    image: mapPoi3PanteonHeroesJpg.url,
    featured: false,
  },
  {
    id: "playa-de-la-costanera",
    name: "Playa de la Costanera",
    category: "aire-libre",
    barrio: "Centro Histórico",
    zone: "centro-historico",
    description:
      "Un espacio junto a la bahía de Asunción para caminar, disfrutar del paisaje y contemplar la ciudad desde otra perspectiva. Una parada para conocer la Costanera y disfrutar del aire libre.",
    idealFor: "Atardecer junto al río",
    nearBuilding: "petra-tower",
    mapsUrl: "https://maps.app.goo.gl/sYAYB2C5v87WoeEa7",
    lat: -25.2768765,
    lng: -57.6339229,
    image: mapPoi3PlayaCostaneraJpg.url,
    featured: true,
  },
  {
    id: "manzana-de-la-rivera",
    name: "Manzana de la Rivera",
    category: "cultura",
    barrio: "Centro Histórico",
    zone: "centro-historico",
    description:
      "Un conjunto de casas históricas convertido en espacio cultural, con exposiciones y actividades. Una visita para descubrir el patrimonio arquitectónico y la vida cultural de Asunción.",
    idealFor: "Arte y arquitectura",
    nearBuilding: "petra-tower",
    mapsUrl: "https://maps.app.goo.gl/ZJZDpX9YRLSb33Rq9",
    lat: -25.2781016,
    lng: -57.6392414,
    image: mapPoi3ManzanaRiveraPng.url,
    instagram: "https://www.instagram.com/manzanadelarivera.asu/",
    featured: false,
  },
  {
    id: "casa-clari",
    name: "Casa Clari",
    category: "gastronomia",
    barrio: "Centro Histórico",
    zone: "centro-historico",
    description:
      "Una propuesta gastronómica en el Centro Histórico para disfrutar de una comida o una pausa durante tu recorrido.",
    idealFor: "Almuerzo en el centro",
    nearBuilding: "petra-tower",
    mapsUrl: "https://maps.app.goo.gl/XAPiHT2NfAFtA1dm6",
    lat: -25.2798279,
    lng: -57.6361666,
    image: mapPoi3CasaClariPng.url,
    instagram: "https://www.instagram.com/casaclari_/",
    featured: false,
  },
  {
    id: "teatro-municipal",
    name: "Teatro Municipal Ignacio A. Pane",
    category: "cultura",
    barrio: "Centro Histórico",
    zone: "centro-historico",
    description:
      "Uno de los principales espacios culturales de Asunción, con una historia vinculada a las artes escénicas de la ciudad.",
    idealFor: "Una noche de teatro o música",
    nearBuilding: "petra-tower",
    mapsUrl: "https://maps.app.goo.gl/UT4vpHEgNEvSR45e7",
    lat: -25.2804991,
    lng: -57.6365399,
    image: mapPoi3TeatroMunicipalWebp.url,
    instagram: "https://www.instagram.com/teatromunicipaldeasuncion/",
    featured: false,
  },
  {
    id: "el-bolsi",
    name: "El Bolsi",
    category: "gastronomia",
    barrio: "Centro Histórico",
    zone: "centro-historico",
    description:
      "Un clásico de la gastronomía asuncena, ubicado en el Centro Histórico. Una opción para disfrutar de una comida y conocer un lugar que forma parte de la vida cotidiana y la tradición gastronómica de la ciudad.",
    idealFor: "Probar un clásico de la ciudad",
    nearBuilding: "petra-tower",
    mapsUrl: "https://maps.app.goo.gl/DdT29ntou2ceYjd98",
    lat: -25.2819931,
    lng: -57.6372694,
    image: mapPoi3ElBolsiPng.url,
    instagram: "https://www.instagram.com/elbolsi/",
    featured: false,
  },
];


/* --------------------------------- Helpers -------------------------------- */

/** Lugares activos, ordenados por el campo `order` cuando existe. */
export const activePlaces = places
  .filter((p) => p.active !== false)
  .map((p, i) => ({ place: p, i }))
  .sort((a, b) => (a.place.order ?? a.i) - (b.place.order ?? b.i))
  .map(({ place }) => place);

export const featuredPlaces = activePlaces.filter((p) => p.featured);

/** Barrios presentes en el contenido activo, ordenados alfabéticamente. */
export const barrios = Array.from(
  new Set(activePlaces.map((p) => p.barrio)),
).sort((a, b) => a.localeCompare(b, "es"));

/** Categorías que efectivamente tienen lugares activos. */
export const activeCategories = categories.filter((c) =>
  activePlaces.some((p) => p.category === c.id),
);

/** Puntos de interés relacionados con un edificio Sky Stays. */
export function placesForBuilding(buildingId: string) {
  return activePlaces.filter(
    (p) =>
      p.nearBuilding === buildingId || p.relatedBuildings?.includes(buildingId),
  );
}


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
