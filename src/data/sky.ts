/**
 * Contenido de ejemplo. Reemplazar por inventario real / CMS.
 * Los ratings, cantidad de evaluaciones y reviews deben ser datos reales
 * antes de publicar (el brief prohíbe testimonios ficticios).
 */

export const social = {
  rating: "4,9",
  reviews: "480",
  badge: "Superanfitrión Airbnb",
};

export const whatsappNumber = "595981000000";
export const ownersEmail = "propietarios@skystays.com.py";

export function wa(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function mailto(subject: string, body: string) {
  return `mailto:${ownersEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}


export const journeys = [
  {
    id: "negocios",
    label: "Negocios",
    title: "Todo listo para que te ocupes de lo importante.",
    text: "WiFi, workspace, ubicaciones corporativas, check-in digital y atención 24/7.",
    cta: "Encontrá tu estadía de negocios",
    photo: "Ejecutivo trabajando · workspace · vista al eje corporativo",
  },
  {
    id: "familia",
    label: "Fin de semana en familia",
    title: "Más espacio para estar juntos.",
    text: "Departamentos equipados y edificios con servicios para disfrutar Asunción en familia.",
    cta: "Planeá tu fin de semana",
    photo: "Familia en piscina del edificio · quincho",
  },
  {
    id: "shopping-asuncion",
    label: "Shopping",
    title: "Compras cerca. Descanso todavía más cerca.",
    text: "Hospedate cerca de los principales centros comerciales de Asunción.",
    cta: "Vení de compras a Asunción",
    photo: "Paseo La Galería · Shopping del Sol · caminata urbana",
  },
  {
    id: "escapadas",
    label: "Escapada",
    title: "No hace falta ir muy lejos para cambiar de aire.",
    text: "Una noche, un fin de semana o simplemente un día.",
    cta: "Encontrá tu próxima escapada",
    photo: "Pareja en terraza · piscina al atardecer",
  },
];


export const properties = [
  {
    id: "sky-suite-petra-1802",
    category: "Sky Suites",
    building: "Petra Tower",
    name: "Suite panorámica 18B",
    zone: "Ycuá Satí",
    rating: "5,0",
    reviews: 64,
    guests: 4,
    beds: "2 dormitorios · 3 camas",
    amenities: ["Piscina", "Gimnasio", "Restaurante", "Minimarket 24 h"],
    from: "US$ 118",
    photo: "Suite Petra Tower · vista panorámica de Asunción",
  },
  {
    id: "sky-room-villa-morra-704",
    category: "Sky Rooms",
    building: "Edificio Aurora",
    name: "Studio 704",
    zone: "Villa Morra",
    rating: "4,9",
    reviews: 112,
    guests: 2,
    beds: "1 dormitorio · 1 cama queen",
    amenities: ["Coworking", "Piscina", "WiFi 300 Mbps"],
    from: "US$ 62",
    photo: "Studio en Villa Morra · living y cocina integrada",
  },
  {
    id: "sky-room-recoleta-402",
    category: "Sky Rooms",
    building: "Edificio Recoleta Park",
    name: "Departamento 402",
    zone: "Recoleta",
    rating: "4,8",
    reviews: 87,
    guests: 4,
    beds: "2 dormitorios · 2 camas",
    amenities: ["Quincho", "Fitness", "Cocina equipada"],
    from: "US$ 74",
    photo: "Departamento en Recoleta · dormitorio principal",
  },
  {
    id: "sky-suite-galeria-2101",
    category: "Sky Suites",
    building: "Torre Galería",
    name: "Suite 2101",
    zone: "Ycuá Satí",
    rating: "5,0",
    reviews: 41,
    guests: 3,
    beds: "1 dormitorio · 2 camas",
    amenities: ["Piscina infinity", "Gastronomía", "Coworking"],
    from: "US$ 96",
    photo: "Suite con vista a Paseo La Galería · atardecer",
  },
  {
    id: "sky-room-mariscal-1105",
    category: "Sky Rooms",
    building: "Edificio Mariscal",
    name: "Studio 1105",
    zone: "Villa Morra",
    rating: "4,9",
    reviews: 73,
    guests: 2,
    beds: "1 dormitorio · 1 cama queen",
    amenities: ["Workspace", "Fitness", "Minimarket 24 h"],
    from: "US$ 58",
    photo: "Studio cerca de Shopping Mariscal · workspace",
  },
];

export const experiences = [
  { name: "Piscinas", text: "Tiempo para bajar el ritmo." },
  { name: "Gastronomía", text: "Opciones para disfrutar sin alejarte." },
  {
    name: "Coworking",
    text: "Espacios para trabajar cuando el viaje también es por negocios.",
  },
  { name: "Quinchos", text: "Momentos para compartir." },
  { name: "Fitness", text: "Mantené tu rutina." },
  { name: "Minimarket 24 h", text: "Lo que necesitás, cuando lo necesitás." },
];

export const locations = [
  {
    id: "villa-morra",
    name: "Villa Morra",
    text: "Restaurantes · cafés · Shopping Mariscal · vida urbana.",
    photo: "Villa Morra · calles arboladas y gastronomía",
  },
  {
    id: "ycua-sati",
    name: "Ycuá Satí",
    text: "Shopping del Sol · Paseo La Galería · eje corporativo.",
    photo: "Ycuá Satí · torres y eje corporativo",
  },
  {
    id: "recoleta",
    name: "Recoleta",
    text: "Gastronomía · cafés · conectividad.",
    photo: "Recoleta · cafés de barrio",
  },
];

export const benefits = [
  { name: "Check-in digital", text: "Llegá a tu ritmo." },
  { name: "Atención 24/7", text: "Estamos cuando nos necesitás." },
  { name: "Limpieza profesional", text: "Estándares consistentes en cada estadía." },
  {
    name: "Totalmente equipado",
    text: "Cocina, ropa blanca, WiFi y todo listo para llegar.",
  },
  {
    name: "Ubicaciones estratégicas",
    text: "Quedate cerca de donde Asunción sucede.",
  },
];

export const directBooking = [
  {
    name: "Atención directa",
    text: "Hablá con nuestro equipo antes y durante tu estadía.",
  },
  {
    name: "Beneficios exclusivos",
    text: "Accedé a promociones disponibles en nuestros canales propios.",
  },
  { name: "Sin intermediarios", text: "Tu reserva directamente con Sky Stays." },
  { name: "Asistencia 24/7", text: "Estamos disponibles durante toda tu estadía." },
];

export const guide = [
  {
    id: "asuncion-48-horas",
    category: "Guías",
    title: "Asunción en 48 horas",
    photo: "Costanera de Asunción · recorrido urbano",
  },
  {
    id: "donde-comer-villa-morra",
    category: "Gastronomía",
    title: "Dónde comer en Villa Morra",
    photo: "Mesa de restaurante en Villa Morra",
  },
  {
    id: "mejores-barrios-para-hospedarse",
    category: "Barrios",
    title: "Los mejores barrios para hospedarse",
    photo: "Vista aérea de barrios de Asunción",
  },
  {
    id: "asuncion-viajes-de-negocios",
    category: "Business",
    title: "Asunción para viajes de negocios",
    photo: "Eje corporativo de Asunción al amanecer",
  },
];

export const nav = [
  {
    label: "Alojamientos",
    items: [
      { label: "Todos", to: "/alojamientos" },
      { label: "Sky Rooms", to: "/sky-rooms" },
      { label: "Sky Suites", to: "/sky-suites" },
      { label: "Edificios", to: "/edificios" },
    ],
  },
  {
    label: "Tu viaje",
    items: [
      { label: "Negocios", to: "/tu-viaje/negocios" },
      { label: "Fin de semana en familia", to: "/tu-viaje/familia" },
      { label: "Shopping en Asunción", to: "/tu-viaje/shopping-asuncion" },
      { label: "Escapadas", to: "/tu-viaje/escapadas" },
      { label: "Conocé Asunción", to: "/tu-viaje/conoce-asuncion" },
      { label: "Estadías prolongadas", to: "/tu-viaje/long-stay" },
    ],
  },
  {
    label: "Experiencias",
    items: [
      { label: "Amenities", to: "/experiencias/amenities" },
      { label: "Servicios", to: "/experiencias/servicios" },
      { label: "Petra Tower", to: "/edificios/petra-tower" },
      { label: "Day Stay", to: "/day-stay-asuncion" },
    ],
  },
  {
    label: "Ubicaciones",
    items: [
      { label: "Villa Morra", to: "/ubicaciones/villa-morra" },
      { label: "Ycuá Satí", to: "/ubicaciones/ycua-sati" },
      { label: "Recoleta", to: "/ubicaciones/recoleta" },
    ],
  },
];
