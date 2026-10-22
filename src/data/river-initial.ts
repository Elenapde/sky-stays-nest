import type { RiverExperience } from "@/lib/river.schema";

/** Initial commercial draft, persisted once by deployment tooling; never seeded on page load. */
export const riverInitial: RiverExperience = {
  "content": {
    "name": "El río, ahora parte de tus planes",
    "title": "Paseos privados en yate por el río Paraguay\n",
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
    "availability": "consultar"
  },
  "active": true,
  "offers": [
    {
      "id": "business-sunset",
      "content": {
        "name": "SKY BUSINESS SUNSET",
        "subtitle": "After office privado",
        "price": 850,
        "fromPrice": false,
        "currency": "USD",
        "duration": "3 horas",
        "capacity": "4 a 6 personas",
        "schedule": "17:00 a 20:00",
        "services": "Traslado, yate, bebidas y picada",
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
        "schedule": "Horarios flexibles",
        "services": "Experiencia personalizada, comida y bebidas",
        "photo": "/__l5e/assets-v1/9e09ac40-e17b-4ea7-bb2a-f49134fa03aa/river-20.jpg"
      },
      "active": true,
      "validated": false
    }
  ]
};
