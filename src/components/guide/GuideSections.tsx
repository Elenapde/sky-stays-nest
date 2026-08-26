import costaneraPhoto from "@/assets/sky-stays-costanera.jpeg.asset.json";
import barriosPhoto from "@/assets/sky-stays-barrios.png.asset.json";
import negociosAerialPhoto from "@/assets/sky-stays-negocios-aerial.png.asset.json";
import shoppingPhoto from "@/assets/sky-stays-shopping.png.asset.json";
import villaMorraPhoto from "@/assets/sky-stays-villa-morra.png.asset.json";
import recoletaPhoto from "@/assets/sky-stays-recoleta.png.asset.json";
import ycuaSatiPhoto from "@/assets/sky-stays-ycua-sati.png.asset.json";
import { PhotoSlot } from "@/components/sky/PhotoSlot";
import { Reveal } from "@/components/sky/Reveal";
import { CtaAnchor, Section, SectionHead } from "@/components/sky/ui";
import { guide, wa } from "@/data/sky";

/* --------------------------------- Hero ---------------------------------- */

export function GuideHero() {
  return (
    <section className="relative overflow-hidden bg-carbon px-6 pt-32 pb-16 text-carbon-foreground md:px-10 md:pt-40 md:pb-20">
      <div className="trama absolute inset-0 opacity-[0.14]" aria-hidden />
      <div className="relative mx-auto w-full max-w-[80rem]">
        <p className="kicker rule-line text-nude">Guía de Asunción</p>
        <h1 className="mt-6 max-w-2xl text-3xl leading-[1.1] text-nude md:text-[3rem]">
          Descubrí Asunción como alguien que vive acá.
        </h1>
        <p className="mt-6 max-w-xl text-[0.9375rem] leading-relaxed text-nude/75">
          Barrios, gastronomía, compras y consejos prácticos para sacarle el
          jugo a la ciudad, vengas por trabajo, vacaciones o un fin de semana.
        </p>
      </div>
    </section>
  );
}

/* ------------------------------ Guías destacadas ------------------------- */

const srcMap: Record<string, string> = {
  "asuncion-48-horas": costaneraPhoto.url,
  "donde-comer-villa-morra": villaMorraPhoto.url,
  "mejores-barrios-para-hospedarse": barriosPhoto.url,
  "asuncion-viajes-de-negocios": negociosAerialPhoto.url,
};

export function GuideFeatured() {
  return (
    <Section>
      <SectionHead
        kicker="Guías"
        title="Lo esencial para moverte por la ciudad."
        lead="Itinerarios prácticos y recomendaciones curadas por el equipo de Sky Stays, pensadas para huéspedes que quieren aprovechar cada día."
      />
      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {guide.map((g, i) => (
          <Reveal as="li" key={g.id} delay={i * 70}>
            <a href={`/guia-de-asuncion/${g.id}`} className="group block h-full">
              <div className="overflow-hidden">
                <div className="transition-transform duration-[1200ms] ease-brand group-hover:scale-[1.05]">
                  <PhotoSlot
                    label={g.photo}
                    {...(srcMap[g.id] ? { src: srcMap[g.id] } : {})}
                    alt={g.title}
                    ratio="4/3"
                    tone={i % 2 === 0 ? "burgundy" : "carbon"}
                  />
                </div>
              </div>
              <p className="kicker mt-4 text-primary-soft">{g.category}</p>
              <h3 className="mt-2 text-lg leading-snug text-primary">{g.title}</h3>
            </a>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

/* -------------------------------- Barrios -------------------------------- */

const barrios = [
  {
    name: "Villa Morra",
    text: "El barrio más urbano de Asunción: calles arboladas, cafés, restaurantes y Shopping Mariscal. Ideal para caminar, comer afuera y tener todo a mano.",
    photo: villaMorraPhoto.url,
    alt: "Terraza gastronómica en Villa Morra, Asunción",
    highlights: ["Gastronomía", "Cafés", "Shopping Mariscal"],
  },
  {
    name: "Ycuá Satí",
    text: "El eje corporativo de la ciudad. Shopping del Sol, Paseo La Galería, torres de oficinas y restaurantes ejecutivos. La mejor zona para viajes de negocios.",
    photo: ycuaSatiPhoto.url,
    alt: "Torres y eje corporativo de Ycuá Satí, Asunción",
    highlights: ["Shopping del Sol", "Paseo La Galería", "Eje corporativo"],
  },
  {
    name: "Recoleta",
    text: "Tranquilo y bien conectado. Cafés de barrio, gastronomía de autor y un ambiente residencial a minutos del centro corporativo.",
    photo: recoletaPhoto.url,
    alt: "Patio de cafés en Recoleta, Asunción",
    highlights: ["Cafés", "Gastronomía", "Conectividad"],
  },
];

export function GuideBarrios() {
  return (
    <Section tone="cream">
      <SectionHead
        kicker="Barrios"
        title="Conocé las zonas donde vas a hospedarte."
        lead="Cada barrio de Asunción tiene su carácter. Elegí según tu viaje: negocios, compras, gastronomía o descanso."
      />
      <ul className="mt-10 grid gap-6 md:grid-cols-3">
        {barrios.map((b, i) => (
          <Reveal as="li" key={b.name} delay={i * 80} className="flex flex-col">
            <div className="overflow-hidden">
              <div className="transition-transform duration-[1200ms] ease-brand group-hover:scale-[1.05]">
                <PhotoSlot
                  src={b.photo}
                  alt={b.alt}
                  label={b.name}
                  ratio="4/3"
                  tone="burgundy"
                  objectPosition="center"
                />
              </div>
            </div>
            <h3 className="mt-4 text-xl text-primary">{b.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {b.text}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {b.highlights.map((h) => (
                <li
                  key={h}
                  className="kicker border border-border-strong px-3 py-1 text-[0.625rem] text-primary-soft"
                >
                  {h}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

/* ------------------------------- Por tipo de viaje ----------------------- */

const byTrip = [
  {
    name: "Negocios",
    text: "Ubicaciones corporativas, workspace en el departamento y check-in digital para que te ocupes de lo importante.",
  },
  {
    name: "Escapadas",
    text: "Una noche, un fin de semana o un día. Sky Stays cerca de lo que querés hacer.",
  },
  {
    name: "Compras",
    text: "Hospedate a pasos de Shopping del Sol, Paseo La Galería y Shopping Mariscal.",
  },
  {
    name: "Familia",
    text: "Departamentos amplios con amenities del edificio: piscina, quincho y espacios para compartir.",
  },
];

export function GuideByTrip() {
  return (
    <Section>
      <SectionHead
        kicker="Por tipo de viaje"
        title="Asunción, según por qué venís."
        lead="Te ayudamos a elegir la zona y el alojamiento según el motivo de tu viaje."
      />
      <ul className="mt-10 grid gap-px overflow-hidden rounded-xs bg-border sm:grid-cols-2 lg:grid-cols-4">
        {byTrip.map((t, i) => (
          <Reveal as="li" key={t.name} delay={i * 60} className="bg-background p-8">
            <p className="kicker text-primary-soft">0{i + 1}</p>
            <h3 className="mt-4 text-xl text-primary">{t.name}</h3>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted-foreground">
              {t.text}
            </p>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

/* --------------------------------- CTA ----------------------------------- */

export function GuideCta() {
  return (
    <Section tone="dark">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <h2 className="text-2xl text-nude md:text-3xl">
            ¿Planeando tu viaje a Asunción?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-nude/75">
            Contanos qué buscás y te recomendamos la mejor zona y alojamiento
            para tu estadía.
          </p>
        </div>
        <CtaAnchor
          href={wa("Hola Sky Stays, estoy planeando un viaje a Asunción y quiero una recomendación.")}
          target="_blank"
          rel="noreferrer"
          variant="ghostLight"
        >
          Hablar por WhatsApp
        </CtaAnchor>
      </div>
    </Section>
  );
}
