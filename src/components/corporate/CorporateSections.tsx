import coworking from "@/assets/sky-stays-coworking.png.asset.json";
import escritorio from "@/assets/sky-stays-escritorio.jpg.asset.json";
import longStayPhoto from "@/assets/sky-stays-long-stay.png.asset.json";
import negociosAerialPhoto from "@/assets/sky-stays-negocios-aerial.png.asset.json";
import { PhotoSlot } from "@/components/sky/PhotoSlot";
import { Reveal } from "@/components/sky/Reveal";
import { CtaAnchor, Kicker, Section, SectionHead } from "@/components/sky/ui";
import { mailto, wa } from "@/data/sky";

/* --------------------------------- Hero ---------------------------------- */

export function CorporateHero() {
  return (
    <section className="relative overflow-hidden bg-carbon px-6 pt-32 pb-16 text-carbon-foreground md:px-10 md:pt-40 md:pb-20">
      <div className="trama absolute inset-0 opacity-[0.12]" aria-hidden />
      <div className="relative mx-auto w-full max-w-[80rem]">
        <Reveal>
          <Kicker className="text-nude">Corporate & Long Stay</Kicker>
          <h1 className="mt-6 max-w-2xl text-3xl leading-[1.1] text-nude md:text-[3rem]">
            Venís por trabajo. Quedate como en casa.
          </h1>
          <p className="mt-6 max-w-xl text-[0.9375rem] leading-relaxed text-nude/75">
            Departamentos equipados, ubicaciones estratégicas y la comodidad de
            tener tu propio espacio en Asunción. Para unos días, unas semanas o
            el tiempo que necesites.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="border border-nude/20 px-3 py-1.5 text-xs tracking-[0.14em] text-nude/70 uppercase">
              30 NOCHES
            </span>
            <span className="border border-nude/20 px-3 py-1.5 text-xs tracking-[0.14em] text-nude/70 uppercase">
              60 NOCHES
            </span>
            <span className="border border-nude/20 px-3 py-1.5 text-xs tracking-[0.14em] text-nude/70 uppercase">
              +90 NOCHES
            </span>
          </div>
          <div className="mt-9 flex flex-wrap gap-4">
            <CtaAnchor
              href={wa("Hola, quiero solicitar una propuesta corporativa / Long Stay.")}
              target="_blank"
              rel="noreferrer"
              variant="nude"
              size="lg"
            >
              Solicitar propuesta
            </CtaAnchor>
            <CtaAnchor href="#modalidades" variant="ghostLight" size="lg">
              Ver modalidades
            </CtaAnchor>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------- Modalidades ------------------------------- */

const modalidades = [
  {
    name: "Corporate Stay",
    text: "Para viajes de negocios, proyectos puntuales y relocalizaciones de ejecutivos. Estadías de 7 noches o más con todas las comodidades para trabajar y descansar.",
    items: [
      "WiFi de alta velocidad",
      "Workspace en el departamento",
      "Ubicaciones corporativas",
      "Facturación a empresa",
      "Check-in digital",
      "Atención 24/7",
    ],
    photo: negociosAerialPhoto.url,
    alt: "Eje corporativo de Asunción al amanecer, con torres de oficinas",
    cta: "Consultar Corporate Stay",
  },
  {
    name: "Long Stay",
    text: "Condiciones especiales para estadías prolongadas de 30 noches o más. Una alternativa a la-hotelería tradicional para profesionales, nómadas digitales y familias en proceso de mudanza.",
    items: [
      "Tarifas decrecientes por duración",
      "Limpieza periódica incluida",
      "Cocina totalmente equipada",
      "Amenities del edificio",
      "Ropa blanca y amenities",
      "Gestión de incidencias",
    ],
    photo: longStayPhoto.url,
    alt: "Departamento amplio y equipado para estadías prolongadas en Sky Stays",
    cta: "Consultar Long Stay",
  },
];

export function CorporateModalidades() {
  return (
    <Section tone="cream" id="modalidades">
      <SectionHead
        kicker="Modalidades"
        title="Dos propuestas, una misma calidad."
        lead="Elegí la modalidad que mejor se ajusta a tu necesidad. Ambas combinan la comodidad de un departamento con el respaldo operativo de Sky Stays."
      />
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {modalidades.map((m, i) => (
          <Reveal as="article" key={m.name} delay={i * 100} className="flex flex-col">
            <div className="overflow-hidden">
              <div className="transition-transform duration-[1200ms] ease-brand group-hover:scale-[1.04]">
                <PhotoSlot
                  src={m.photo}
                  alt={m.alt}
                  label={m.name}
                  ratio="16/9"
                  tone={i === 0 ? "carbon" : "burgundy"}
                  objectPosition="center"
                />
              </div>
            </div>
            <div className="flex flex-1 flex-col border border-t-0 border-border bg-card p-8">
              <h3 className="font-sans text-xs font-semibold tracking-[0.24em] uppercase text-primary-soft">
                {m.name}
              </h3>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted-foreground">
                {m.text}
              </p>
              <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2.5 border-t border-border pt-6">
                {m.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-foreground/80"
                  >
                    <span className="text-primary" aria-hidden>·</span>
                    {item}
                  </li>
                ))}
              </ul>
              <CtaAnchor
                href={wa(`Hola, quiero consultar ${m.name}.`)}
                target="_blank"
                rel="noreferrer"
                variant="outline"
                className="mt-8 self-start"
              >
                {m.cta}
              </CtaAnchor>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------- Duraciones ------------------------------ */

const duraciones = [
  {
    label: "7+ noches",
    name: "Estadía semanal",
    text: "Ideal para proyectos cortos, giras de negocios o capacitaciones. Tarifa preferencial sobre la tarifa diaria estándar.",
  },
  {
    label: "30+ noches",
    name: "Estadía mensual",
    text: "Pensado para relocalizaciones, asignaciones de mediano plazo o nómadas digitales. Condiciones especiales y limpieza periódica incluida.",
  },
  {
    label: "60+ noches",
    name: "Long Stay extendido",
    text: "La mejor tarifa por noche. Para equipos apostados en Asunción por períodos prolongados o familias en proceso de mudanza.",
  },
];

export function CorporateDuraciones() {
  return (
    <Section>
      <SectionHead
        kicker="Duraciones"
        title="Mientras más te quedes, mejores condiciones."
        lead="Tarifas decrecientes según la duración de la estadía. Solicitá una propuesta a medida y comparamos lo que más te convenga."
      />
      <ul className="mt-12 grid gap-px overflow-hidden rounded-xs bg-border sm:grid-cols-3">
        {duraciones.map((d, i) => (
          <Reveal as="li" key={d.label} delay={i * 70} className="flex flex-col bg-background p-8">
            <p className="font-display text-3xl text-primary">{d.label}</p>
            <p className="kicker mt-4 text-primary-soft">{d.name}</p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {d.text}
            </p>
          </Reveal>
        ))}
      </ul>
      <p className="mt-6 text-xs text-muted-foreground">
        Las condiciones y tarifas son referenciales. Cada propuesta se cotiza según
        duración, ubicación, categoría y disponibilidad.
      </p>
    </Section>
  );
}

/* ------------------------------- Beneficios ------------------------------ */

const beneficios = [
  {
    name: "Facturación a empresa",
    text: "Condiciones comerciales, facturación centralizada y reportes para gestionar los gastos de viaje de tu equipo.",
  },
  {
    name: "Workspace integrado",
    text: "Escritorio, WiFi de alta velocidad y coworking en el edificio. Tu equipo trabaja sin salir del alojamiento.",
  },
  {
    name: "Ubicaciones corporativas",
    text: "A minutos del eje corporativo de Asunción: Ycuá Satí, Villa Morra y Recoleta.",
  },
  {
    name: "Operación hotelera",
    text: "Check-in digital, limpieza profesional, ropa blanca y atención 24/7. Nosotros nos ocupamos del día a día.",
  },
  {
    name: "Flexibilidad",
    text: "Ampliaciones, reducciones y cambios de ubicación con anticipación. La estadía se adapta a tu agenda.",
  },
  {
    name: "Amenities del edificio",
    text: "Piscina, gimnasio, quincho, gastronomía y minimarket 24 h disponibles según la propiedad seleccionada.",
  },
];

export function CorporateBeneficios() {
  return (
    <Section tone="dark">
      <SectionHead
        invert
        kicker="Por qué empresas y profesionales eligen Sky Stays"
        title="Más que un lugar donde dormir."
        lead="Una infraestructura pensada para que tu equipo se concentre en lo importante, mientras nosotros nos encargamos del resto."
      />
      <div className="mt-12 grid gap-px overflow-hidden rounded-xs bg-nude/10 sm:grid-cols-2 lg:grid-cols-3">
        {beneficios.map((b, i) => (
          <Reveal as="div" key={b.name} delay={i * 50} className="bg-carbon p-8">
            <h3 className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-nude">
              {b.name}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-nude/70">
              {b.text}
            </p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------ Espacios --------------------------------- */

export function CorporateEspacios() {
  return (
    <Section tone="cream">
      <SectionHead
        kicker="Los espacios"
        title="Todo lo que tu equipo necesita dentro del departamento."
      />
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <Reveal className="overflow-hidden">
          <PhotoSlot
            src={escritorio.url}
            alt="Escritorio equipado en un departamento Sky Stays para trabajo remoto y viajes de negocios"
            label="Workspace · trabajo y nómadas digitales"
            ratio="4/3"
            tone="burgundy"
          />
        </Reveal>
        <Reveal delay={100} className="overflow-hidden">
          <PhotoSlot
            src={coworking.url}
            alt="Coworking moderno dentro de un edificio Sky Stays en Asunción"
            label="Coworking · espacio compartido en el edificio"
            ratio="4/3"
            tone="carbon"
          />
        </Reveal>
      </div>
    </Section>
  );
}

/* --------------------------------- CTA ----------------------------------- */

export function CorporateCta() {
  return (
    <Section tone="burgundy">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <h2 className="text-2xl text-nude md:text-3xl">
            ¿Necesitás alojar a tu equipo en Asunción?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-nude/75">
            Contanos cuántas personas, por cuánto tiempo y en qué zona.
            Te preparamos una propuesta a medida en 24 horas.
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <CtaAnchor
            href={wa("Hola, quiero solicitar una propuesta corporativa / Long Stay.")}
            target="_blank"
            rel="noreferrer"
            variant="nude"
          >
            Solicitar propuesta
          </CtaAnchor>
          <CtaAnchor
            href={mailto("Solicitud de propuesta Corporate & Long Stay", "Quisiera recibir información sobre Corporate Stay y Long Stay para mi equipo.")}
            variant="ghostLight"
          >
            Escribir un email
          </CtaAnchor>
        </div>
      </div>
    </Section>
  );
}
