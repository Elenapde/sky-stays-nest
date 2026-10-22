import type { RiverExperience } from "@/lib/river.schema";

/** Initial commercial draft, persisted once by deployment tooling; never seeded on page load. */
export const riverInitial: RiverExperience = {
  "content": {
    "name": "El río, ahora parte de tus planes",
    "title": "Paseos por el río Paraguay",
    "description": "Una forma diferente de disfrutar Asunción.\u00a0",
    "editorialTitle": "Asunción, desde otra perspectiva.",
    "editorialText": "El horizonte abierto. La ciudad a lo lejos. Un paseo privado para bajar el ritmo y compartir un momento diferente sobre el río Paraguay.",
    "hero": "/__l5e/assets-v1/b4351375-9abc-4ddd-8066-c569f0a3c65e/river-17.jpg",
    "video": "/__l5e/assets-v1/4b85cf63-678f-41a0-b69f-2b5e8dc094ab/river-reel.mp4",
    "gallery": [
      "/__l5e/assets-v1/9e09ac40-e17b-4ea7-bb2a-f49134fa03aa/river-20.jpg",
      "/__l5e/assets-v1/bc9d1184-df57-4a48-8188-920e02afafac/river-4.jpg",
      "/__l5e/assets-v1/cc199e35-f167-4694-8f3c-047ee5e07f42/river-3-2.jpg",
      "/__l5e/assets-v1/41fe52e8-febd-47fc-990b-7a0b2830878b/river-5.jpg"
    ],
    "availability": "consultar",
    "modalities": [
      { "id": "business-sunset", "name": "SKY BUSINESS SUNSET", "category": "ENCUENTROS CORPORATIVOS", "headline": "Las mejores conversaciones no siempre suceden en una oficina.", "description": "Cambiá la sala de reuniones por una experiencia privada sobre el río Paraguay. Un espacio diferente para conectar con clientes, compartir con colegas o celebrar los logros de tu equipo.", "included": ["Paseo privado en yate con capitán.", "3 horas, de 17:00 a 20:00 h.", "Capacidad para 4 a 6 personas.", "Servicio de traslado.", "Bebidas y picada a bordo."], "uses": ["Reuniones fuera de la oficina", "Networking", "After office", "Celebraciones de equipo"], "photo": "/__l5e/assets-v1/cc199e35-f167-4694-8f3c-047ee5e07f42/river-3-2.jpg" },
      { "id": "private-moments", "name": "SKY PRIVATE MOMENTS", "category": "CELEBRACIONES Y MOMENTOS ESPECIALES", "headline": "Hay momentos que merecen un escenario diferente.", "description": "Un cumpleaños, un aniversario, una escapada en pareja o una tarde para compartir en familia y con amigos. Disfrutá del río Paraguay en una experiencia privada, preparada para que cada momento sea especial.", "included": ["Paseo privado en yate con capitán.", "Duración de 2 a 4 horas.", "Horarios flexibles, sujetos a disponibilidad.", "Experiencia personalizada para grupos pequeños.", "Comida y bebidas a bordo."], "uses": ["Aniversarios", "Cumpleaños", "Parejas", "Familia y amigos"], "photo": "/__l5e/assets-v1/9e09ac40-e17b-4ea7-bb2a-f49134fa03aa/river-20.jpg" }
    ]
  },
  "active": true,
  "offers": [
    {
      "id": "business-sunset",
      "content": {
        "name": "SKY BUSINESS SUNSET",
        "subtitle": "After office privado",
        "price": 850,
        "fromPrice": true,
        "currency": "USD",
        "duration": "3 horas",
        "capacity": "4 a 6 personas",
        "schedule": "17:00 a 20:00 h",
        "services": "Paseo privado en yate con capitán.\nServicio de traslado.\nBebidas y picada a bordo.",
        "photo": "/__l5e/assets-v1/cc199e35-f167-4694-8f3c-047ee5e07f42/river-3-2.jpg"
      },
      "active": true,
      "validated": false
    },
    {
      "id": "private-moments",
      "content": {
        "name": "SKY PRIVATE MOMENTS",
        "subtitle": "Parejas y celebraciones",
        "price": 850,
        "fromPrice": true,
        "currency": "USD",
        "duration": "2 a 4 horas",
        "capacity": "",
        "schedule": "Horarios flexibles, sujetos a disponibilidad.",
        "services": "Paseo privado en yate con capitán.\nExperiencia personalizada para grupos pequeños.\nComida y bebidas a bordo.",
        "photo": "/__l5e/assets-v1/9e09ac40-e17b-4ea7-bb2a-f49134fa03aa/river-20.jpg"
      },
      "active": true,
      "validated": false
    }
  ]
};
