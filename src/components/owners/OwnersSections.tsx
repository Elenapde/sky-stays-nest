import { useState } from "react";

import longStay from "@/assets/sky-stays-long-stay.png.asset.json";
import cocina from "@/assets/sky-stays-cocina.png.asset.json";
import checkin from "@/assets/sky-stays-checkin.jpg.asset.json";
import coworking from "@/assets/sky-stays-coworking.png.asset.json";
import skyRooms from "@/assets/sky-stays-sky-rooms.jpg.asset.json";
import skySuites from "@/assets/sky-stays-sky-suites.jpg.asset.json";
import { PhotoSlot } from "@/components/sky/PhotoSlot";
import { Reveal } from "@/components/sky/Reveal";
import { Cta, CtaAnchor, Section, SectionHead } from "@/components/sky/ui";
import { mailto, social, wa } from "@/data/sky";
import { cn } from "@/lib/utils";

/* --------------------------------- Hero ---------------------------------- */

export function OwnersHero() {
  return (
    <section className="relative overflow-hidden bg-carbon px-6 pt-32 pb-20 text-carbon-foreground md:px-10 md:pt-40 md:pb-28">
      <div className="trama absolute inset-0 opacity-[0.14]" aria-hidden />
      <div className="relative mx-auto grid w-full max-w-[80rem] items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <p className="kicker rule-line text-nude">Propietarios</p>
          <h1 className="mt-6 max-w-xl text-3xl leading-[1.1] text-nude md:text-[3rem]">
            Tu departamento, administrado como un hotel.
          </h1>
          <p className="mt-6 max-w-lg text-[0.9375rem] leading-relaxed text-nude/75">
            Nos encargamos de la operación, los huéspedes, la limpieza y el
            mantenimiento. Vos recibís reportes claros y una gestión orientada
            a maximizar el potencial de tu propiedad, sin ocuparte del día a día.
          </p>
          <dl className="mt-10 grid max-w-lg grid-cols-3 gap-6 border-t border-nude/20 pt-8">
            {[
              { k: "OPERACIÓN", v: "24/7" },
              { k: "Reputación", v: social.badge },
              { k: "Calificación promedio", v: `${social.rating} / 5` },
            ].map((item) => (
              <div key={item.k}>
                <dt className="kicker text-nude/55">{item.k}</dt>
                <dd className="mt-2 text-[0.9375rem] text-nude">{item.v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-10 flex flex-wrap gap-3">
            <CtaAnchor href="#formulario-propietarios" variant="nude">
              Solicitar evaluación de mi propiedad
            </CtaAnchor>
            <CtaAnchor
              href={wa(
                "Hola Sky Stays, soy propietario/a y quiero saber cómo administran departamentos.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              variant="ghostLight"
            >
              Hablar por WhatsApp
            </CtaAnchor>
          </div>
        </div>
        <PhotoSlot
          src={longStay.url}
          alt="Living amplio de un departamento administrado por Sky Stays"
          label="Departamentos listos para recibir huéspedes"
          ratio="4 / 3"
          className="rounded-xs"
        />
      </div>
    </section>
  );
}

/* ------------------------------- Propuesta -------------------------------- */

const pillars = [
  {
    name: "Renta previsible",
    text: "Precios dinámicos y combinación de estadías cortas, corporativas y long stay para optimizar ocupación e ingresos.",
  },
  {
    name: "Operación hotelera",
    text: "Check-in digital, limpieza profesional, ropa blanca, amenities y mantenimiento preventivo con proveedores propios.",
  },
  {
    name: "Cuidado del activo",
    text: "Selección de huéspedes, inventario fotográfico, revisiones post-estadía y reporte de cualquier incidencia.",
  },
  {
    name: "Transparencia",
    text: "Reporte mensual con ocupación, ingresos, gastos y liquidación. Acceso a la información cuando la necesités.",
  },
];

export function OwnersValue() {
  return (
    <Section tone="light">
      <SectionHead
        kicker="Por qué Sky Stays"
        title="Una administración pensada para cuidar tu inversión."
        lead="Combinamos la comodidad de un departamento con estándares de servicio hotelero. Eso sostiene mejores calificaciones, mejores huéspedes y mejor renta."
      />
      <ul className="mt-14 grid gap-px overflow-hidden rounded-xs bg-border md:grid-cols-2">
        {pillars.map((p, i) => (
          <Reveal as="li" key={p.name} delay={i * 60} className="bg-background p-8 md:p-10">
            <p className="kicker text-primary-soft">0{i + 1}</p>
            <h3 className="mt-4 text-xl text-primary">{p.name}</h3>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted-foreground">
              {p.text}
            </p>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

/* -------------------------------- Servicio -------------------------------- */

const included = [
  "Publicación y gestión en Airbnb, Booking y canales propios",
  "Fotografía profesional y ficha del departamento",
  "Atención al huésped 24/7 en español, inglés y portugués",
  "Check-in y check-out digital",
  "Limpieza profesional y lavandería entre estadías",
  "Reposición de amenities y consumibles",
  "Mantenimiento preventivo y coordinación de reparaciones",
  "Reporte mensual de ocupación, ingresos y liquidación",
];

export function OwnersService() {
  return (
    <Section tone="cream">
      <div className="grid items-start gap-14 lg:grid-cols-[1fr_1.05fr]">
        <div>
          <SectionHead
            kicker="Qué incluye"
            title="Todo lo que implica operar tu departamento."
            lead="Un solo equipo se ocupa de la comercialización, la operación y el mantenimiento."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <PhotoSlot
              src={cocina.url}
              alt="Cocina equipada de un departamento Sky Stays"
              label="Equipamiento completo"
              ratio="4 / 5"
              className="rounded-xs"
            />
            <PhotoSlot
              src={checkin.url}
              alt="Huésped haciendo check-in digital"
              label="Check-in digital"
              ratio="4 / 5"
              objectPosition="88% center"
              className="rounded-xs"
            />
          </div>
        </div>
        <ul className="grid gap-px overflow-hidden rounded-xs bg-border">
          {included.map((item) => (
            <li
              key={item}
              className="flex items-start gap-4 bg-secondary p-6 text-[0.9375rem] leading-relaxed text-foreground"
            >
              <span aria-hidden className="mt-[0.35rem] text-primary-soft">
                ―
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

/* ---------------------------- Líneas de producto -------------------------- */

const lines = [
  {
    name: "Sky Rooms",
    src: skyRooms.url,
    alt: "Departamento equipado con la línea Sky Rooms",
    tag: "Inversión inicial más accesible",
    lead: "Equipamiento completo, funcional y contemporáneo. Todo lo necesario para operar con estándar hotelero desde el primer día.",
    ideal: "Ideal si querés poner el departamento en operación rápido, con una inversión medida y sin resignar confort.",
    items: [
      "Selección de mobiliario estándar en melamina símil madera y textiles de lino",
      "Sommiers de estándar hotelero, blanquería, edredón y toallas",
      "Sofá o asientos, mesa de comedor, sillas y rack de TV",
      "Smart TV, heladera, microondas, hervidora, grillera y cafetera de goteo",
      "Bazar completo: vajilla, ollas, copas, vasos y utensilios",
      "Decoración esencial: alfombra, espejo, cuadros, plantas y almohadas deco",
    ],
  },
  {
    name: "Sky Suites",
    src: skySuites.url,
    alt: "Departamento equipado con la línea Sky Suites",
    tag: "Propuesta premium de interiorismo",
    lead: "Diseño interior de autor, materiales nobles y detalles de artesanía paraguaya para posicionar la unidad en el segmento alto.",
    ideal: "Ideal si buscás diferenciar tu departamento, apuntar a un huésped más exigente y sostener una tarifa superior.",
    items: [
      "Proyecto de interiorismo a medida, con mobiliario de líneas curvas y texturas suaves",
      "Cabecera con mesas de luz, poltrona o sofá y sillas de comedor tapizadas",
      "Cortinas blackout + traslúcido en todos los ambientes",
      "Doble Smart TV (sala y habitación) y cafetera multicápsula",
      "Blanquería premium: duvet, edredón, mantas de pie de cama y set completo de toallas",
      "Decoración con barro artesanal paraguayo, deco de baño y piezas de autor",
    ],
  },
];

const comparison = [
  {
    k: "Enfoque de diseño",
    rooms: "Diseño funcional con paleta neutra y materiales estándar de calidad.",
    suites: "Proyecto de interiorismo personalizado, con identidad y capas de detalle.",
  },
  {
    k: "Mobiliario",
    rooms: "Línea estándar: melamina símil madera, sofá o asientos y sillas.",
    suites: "Piezas seleccionadas: poltronas, tapizados, mesas ratonas y recibidor.",
  },
  {
    k: "Dormitorio",
    rooms: "Sommier hotelero, blanquería y cortinas.",
    suites: "Cabecera con mesas de luz, portamaletas, mantas deco y TV propia.",
  },
  {
    k: "Cortinados",
    rooms: "Cortinas de lino en tonos claros.",
    suites: "Doble sistema blackout + traslúcido en todos los ambientes.",
  },
  {
    k: "Cocina y bazar",
    rooms: "Bazar completo con cafetera de goteo y grillera.",
    suites: "Bazar seleccionado con cafetera multicápsula.",
  },
  {
    k: "Decoración",
    rooms: "Set esencial: alfombra, espejo, cuadros y plantas.",
    suites: "Curaduría con artesanía en barro paraguayo y deco de baño.",
  },
  {
    k: "Huésped objetivo",
    rooms: "Viajes de trabajo, escapadas y estadías cortas.",
    suites: "Huésped corporativo senior, estadías largas y viajeros de alto perfil.",
  },
  {
    k: "Tiempo de puesta a punto",
    rooms: "Proceso más ágil con selección predefinida.",
    suites: "Anteproyecto y ejecución con desarrollo de diseño a medida.",
  },
];

export function OwnersLines() {
  return (
    <Section tone="light">
      <SectionHead
        kicker="Dos líneas de equipamiento"
        title="Sky Rooms o Sky Suites: vos elegís hasta dónde llevar tu departamento."
        lead="Las dos líneas se operan con el mismo estándar de hospitalidad. La diferencia está en el nivel de interiorismo, el mobiliario y la inversión que quieras hacer en la puesta a punto."
      />
      <div className="mt-14 grid gap-px overflow-hidden rounded-xs bg-border md:grid-cols-2">
        {lines.map((line, i) => (
          <Reveal key={line.name} delay={i * 90} className="bg-background">
            <PhotoSlot
              src={line.src}
              alt={line.alt}
              label={line.name}
              ratio="16 / 10"
            />
            <div className="p-8">
              <p className="kicker text-primary-soft">{line.tag}</p>
              <h3 className="mt-4 text-2xl text-primary">{line.name}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted-foreground">
                {line.lead}
              </p>
              <p className="mt-5 border-l-2 border-primary-soft pl-4 text-[0.9375rem] leading-relaxed text-foreground">
                {line.ideal}
              </p>
              <ul className="mt-7 space-y-4 border-t border-border pt-7">
                {line.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-4 text-[0.9375rem] leading-relaxed text-foreground"
                  >
                    <span aria-hidden className="mt-[0.35rem] text-primary-soft">
                      ―
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-16">
        <h3 className="text-xl text-primary md:text-2xl">
          En qué se diferencian
        </h3>
        <div className="mt-8 overflow-hidden rounded-xs border border-border">
          <div className="hidden grid-cols-[1fr_1.3fr_1.3fr] bg-secondary md:grid">
            <p className="kicker px-6 py-4 text-primary-soft">Aspecto</p>
            <p className="kicker px-6 py-4 text-primary">Sky Rooms</p>
            <p className="kicker px-6 py-4 text-primary">Sky Suites</p>
          </div>
          <dl>
            {comparison.map((row, i) => (
              <div
                key={row.k}
                className={cn(
                  "grid gap-x-6 gap-y-3 px-6 py-6 md:grid-cols-[1fr_1.3fr_1.3fr] md:items-start md:py-5",
                  i % 2 === 1 && "bg-secondary/45",
                  i > 0 && "border-t border-border",
                )}
              >
                <dt className="kicker text-primary-soft">{row.k}</dt>
                <dd className="text-[0.9375rem] leading-relaxed text-foreground">
                  <span className="mr-2 font-semibold text-primary md:hidden">
                    Sky Rooms ·
                  </span>
                  {row.rooms}
                </dd>
                <dd className="text-[0.9375rem] leading-relaxed text-foreground">
                  <span className="mr-2 font-semibold text-primary md:hidden">
                    Sky Suites ·
                  </span>
                  {row.suites}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <p className="mt-8 max-w-3xl text-xs leading-relaxed text-muted-foreground">
        El equipamiento presentado es ilustrativo y referencial. La disposición,
        cantidad y selección final del mobiliario pueden variar según la
        tipología, distribución y superficie de cada departamento, manteniendo
        siempre el estándar de calidad y diseño de cada línea.
      </p>
    </Section>
  );
}




/* ------------------------------ Cómo funciona ----------------------------- */

const steps = [
  {
    name: "Evaluación",
    text: "Analizamos ubicación, edificio, tipología y amenities para estimar la renta potencial de tu departamento.",
  },
  {
    name: "Propuesta",
    text: "Recibís una proyección de ingresos, el esquema de comisión y las condiciones del contrato de administración.",
  },
  {
    name: "Puesta a punto",
    text: "Definimos equipamiento y ambientación, hacemos la fotografía profesional y armamos la ficha comercial.",
  },
  {
    name: "Operación",
    text: "Publicamos, gestionamos huéspedes y operamos la estadía. Vos seguís todo desde el reporte mensual.",
  },
];

export function OwnersProcess() {
  return (
    <Section tone="dark">
      <SectionHead
        kicker="Cómo funciona"
        title="De la primera conversación a la primera reserva."
        lead="Un proceso claro, sin sorpresas y con tiempos definidos."
        invert
      />
      <ol className="mt-14 grid gap-px overflow-hidden rounded-xs bg-nude/15 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <Reveal as="li" key={s.name} delay={i * 70} className="bg-carbon p-8">
            <p className="kicker text-nude/55">Paso 0{i + 1}</p>
            <h3 className="mt-4 text-lg text-nude">{s.name}</h3>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-nude/70">{s.text}</p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

/* ------------------------------- Requisitos ------------------------------- */

export function OwnersRequirements() {
  return (
    <Section tone="light">
      <div className="grid items-center gap-14 lg:grid-cols-[1fr_1fr]">
        <PhotoSlot
          src={coworking.url}
          alt="Área de coworking en un edificio con departamentos Sky Stays"
          label="Edificios con amenities"
          ratio="16 / 11"
          className="rounded-xs"
        />
        <div>
          <SectionHead
            kicker="Qué buscamos"
            title="Departamentos que podamos operar con nuestro estándar."
          />
          <ul className="mt-8 space-y-5">
            {[
              {
                k: "Ubicación",
                v: "Villa Morra, Ycuá Satí, Recoleta y zonas del eje corporativo de Asunción.",
              },
              {
                k: "Edificio",
                v: "Con amenities y reglamento que permita alquiler temporal.",
              },
              {
                k: "Tipología",
                v: "Studios, uno y dos dormitorios en buen estado, amoblados o a amoblar con nosotros.",
              },
              {
                k: "Disponibilidad",
                v: "Mínimo 12 meses de administración para sostener la estrategia de ocupación.",
              },
            ].map((r) => (
              <li key={r.k} className="border-t border-border pt-5">
                <p className="kicker text-primary-soft">{r.k}</p>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">
                  {r.v}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

/* -------------------------------- Formulario ------------------------------ */

const zones = ["Villa Morra", "Ycuá Satí", "Recoleta", "Otra zona de Asunción"];
const typologies = ["Studio", "1 dormitorio", "2 dormitorios", "3+ dormitorios"];
const furnishOptions = ["Amoblado", "Sin amoblar", "Parcialmente amoblado"];

export function OwnersForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [building, setBuilding] = useState("");
  const [zone, setZone] = useState(zones[0]);
  const [typology, setTypology] = useState(typologies[0]);
  const [furnish, setFurnish] = useState(furnishOptions[0]);
  const [notes, setNotes] = useState("");

  const message = [
    "Hola Sky Stays, quiero una evaluación para administrar mi departamento.",
    "",
    `Nombre: ${name || "—"}`,
    `Teléfono: ${phone || "—"}`,
    `Edificio: ${building || "—"}`,
    `Zona: ${zone}`,
    `Tipología: ${typology}`,
    `Estado: ${furnish}`,
    notes ? `Comentarios: ${notes}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const field =
    "mt-2 h-12 w-full rounded-xs border border-nude/25 bg-transparent px-4 text-[0.9375rem] text-nude placeholder:text-nude/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nude/60";

  return (
    <Section id="formulario-propietarios" tone="burgundy">
      <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <SectionHead
            kicker="Evaluación sin costo"
            title="Contanos de tu departamento."
            lead="Completá los datos y te enviamos una estimación de renta y el esquema de administración. Al enviar se abre WhatsApp con el mensaje listo."
            invert
          />
        </div>

        <form
          className="grid gap-6 sm:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            window.open(wa(message), "_blank", "noopener,noreferrer");
          }}
        >
          <label className="block">
            <span className="kicker text-nude/70">Nombre</span>
            <input
              className={field}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre y apellido"
              required
            />
          </label>
          <label className="block">
            <span className="kicker text-nude/70">Teléfono</span>
            <input
              className={field}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+595 9xx xxx xxx"
              required
            />
          </label>
          <label className="block">
            <span className="kicker text-nude/70">Edificio</span>
            <input
              className={field}
              value={building}
              onChange={(e) => setBuilding(e.target.value)}
              placeholder="Nombre del edificio"
            />
          </label>
          <label className="block">
            <span className="kicker text-nude/70">Zona</span>
            <select
              className={field}
              value={zone}
              onChange={(e) => setZone(e.target.value)}
            >
              {zones.map((z) => (
                <option key={z} value={z} className="text-foreground">
                  {z}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="kicker text-nude/70">Tipología</span>
            <select
              className={field}
              value={typology}
              onChange={(e) => setTypology(e.target.value)}
            >
              {typologies.map((t) => (
                <option key={t} value={t} className="text-foreground">
                  {t}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="kicker text-nude/70">Estado</span>
            <select
              className={field}
              value={furnish}
              onChange={(e) => setFurnish(e.target.value)}
            >
              {furnishOptions.map((f) => (
                <option key={f} value={f} className="text-foreground">
                  {f}
                </option>
              ))}
            </select>
          </label>
          <label className="block sm:col-span-2">
            <span className="kicker text-nude/70">Comentarios</span>
            <textarea
              className={`${field} h-28 py-3`}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Contanos cualquier detalle relevante"
            />
          </label>
          <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
            <Cta type="submit" variant="nude">
              Enviar por WhatsApp
            </Cta>
            <CtaAnchor
              href={mailto("Evaluación de propiedad · Sky Stays", message)}
              variant="ghostLight"
            >
              Enviar por email
            </CtaAnchor>
          </div>
        </form>
      </div>
    </Section>
  );
}

/* ----------------------------------- FAQ ---------------------------------- */

const faqs = [
  {
    q: "¿Cómo se cobra el servicio?",
    a: "Trabajamos con un porcentaje sobre los ingresos generados por tu departamento. No hay costos fijos mensuales: si no hay renta, no hay comisión.",
  },
  {
    q: "¿Puedo usar mi departamento cuando quiera?",
    a: "Sí. Podés bloquear fechas para uso propio avisando con anticipación para no afectar reservas ya confirmadas.",
  },
  {
    q: "¿Quién se ocupa del equipamiento?",
    a: "Si el departamento no está amoblado, te presentamos una propuesta de equipamiento con costos y plazos, alineada al estándar Sky Stays.",
  },
  {
    q: "¿Qué pasa si un huésped daña algo?",
    a: "Cada estadía tiene garantía y control de inventario. Documentamos el estado del departamento y gestionamos la reparación y el reclamo.",
  },
  {
    q: "¿Cuándo recibo la liquidación?",
    a: "Enviamos el reporte y la liquidación una vez por mes, con el detalle de ocupación, ingresos y gastos operativos.",
  },
];

export function OwnersFaq() {
  return (
    <Section tone="cream">
      <SectionHead kicker="Preguntas frecuentes" title="Lo que suelen consultarnos." />
      <div className="mt-12 divide-y divide-border border-t border-border">
        {faqs.map((f) => (
          <details key={f.q} className="group py-6">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-[1.0625rem] text-primary">
              {f.q}
              <span
                aria-hidden
                className="mt-1 text-primary-soft transition-transform duration-500 ease-brand group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-4 max-w-3xl text-[0.9375rem] leading-relaxed text-muted-foreground">
              {f.a}
            </p>
          </details>
        ))}
      </div>
    </Section>
  );
}

/* ---------------------------------- CTA ----------------------------------- */

export function OwnersCta() {
  return (
    <Section tone="dark" className="text-center">
      <h2 className="mx-auto max-w-2xl text-3xl leading-[1.14] text-nude md:text-[2.75rem]">
        Hablemos de tu departamento.
      </h2>
      <p className="mx-auto mt-5 max-w-xl text-[0.9375rem] leading-relaxed text-nude/70">
        Una conversación de 15 minutos alcanza para saber si tu propiedad encaja
        con Sky Stays.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <CtaAnchor
          href={wa("Hola Sky Stays, quiero conversar sobre la administración de mi departamento.")}
          target="_blank"
          rel="noopener noreferrer"
          variant="nude"
        >
          Hablar por WhatsApp
        </CtaAnchor>
        <CtaAnchor href="#formulario-propietarios" variant="ghostLight">
          Completar el formulario
        </CtaAnchor>
      </div>
    </Section>
  );
}
