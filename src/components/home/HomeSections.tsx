import checkin from "@/assets/sky-stays-checkin.jpg.asset.json";
import cocina from "@/assets/sky-stays-cocina.png.asset.json";
import coworking from "@/assets/sky-stays-coworking.png.asset.json";
import escritorio from "@/assets/sky-stays-escritorio.jpg.asset.json";
import piscina from "@/assets/sky-stays-piscina.png.asset.json";
import quincho from "@/assets/sky-stays-quincho.webp.asset.json";
import gimnasio from "@/assets/sky-stays-gimnasio.png.asset.json";
import minimarket from "@/assets/sky-stays-minimarket.png.asset.json";
import gastronomia from "@/assets/sky-stays-gastronomia.png.asset.json";
import skyRooms from "@/assets/sky-stays-sky-rooms.jpg.asset.json";
import skySuites from "@/assets/sky-stays-sky-suites.jpg.asset.json";
import superhostLogo from "@/assets/airbnb-superhost.png.asset.json";
import negociosPhoto from "@/assets/sky-stays-negocios.png.asset.json";
import escapadasPhoto from "@/assets/sky-stays-escapadas.png.asset.json";
import longStayPhoto from "@/assets/sky-stays-long-stay.png.asset.json";
import familiaPhoto from "@/assets/sky-stays-familia.png.asset.json";
import villaMorraPhoto from "@/assets/sky-stays-villa-morra.png.asset.json";
import recoletaPhoto from "@/assets/sky-stays-recoleta.png.asset.json";
import ycuaSatiPhoto from "@/assets/sky-stays-ycua-sati.png.asset.json";
import heroPoster from "@/assets/sky-stays-hero-poster.jpg.asset.json";
import dayStayPhoto from "@/assets/sky-stays-day-stay.png.asset.json";
import barriosPhoto from "@/assets/sky-stays-barrios.png.asset.json";
import negociosAerialPhoto from "@/assets/sky-stays-negocios-aerial.png.asset.json";
import costaneraPhoto from "@/assets/sky-stays-costanera.jpeg.asset.json";
import shoppingPhoto from "@/assets/sky-stays-shopping.png.asset.json";

import heroVideo from "@/assets/sky-stays-hero.mp4.asset.json";
import monogram from "@/assets/sky-stays-monogram.png.asset.json";
import { AsuncionMap } from "@/components/sky/AsuncionMap";
import { PhotoSlot } from "@/components/sky/PhotoSlot";
import { Reveal } from "@/components/sky/Reveal";
import { StaySearch } from "@/components/sky/StaySearch";
import { SuperhostBadge } from "@/components/sky/SuperhostBadge";

import {
  Cta,
  CtaAnchor,
  Kicker,
  Section,
  SectionHead,
  Stars,
} from "@/components/sky/ui";
import {
  benefits,
  directBooking,
  experiences,
  guide,
  journeys,
  locations,
  properties,
  social,
  wa,
} from "@/data/sky";

/* ----------------------------- 01 · Hero + 02 ----------------------------- */

export function Hero() {
  return (
    <>
      <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-primary">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={heroVideo.url}
          poster={heroPoster.url}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-t from-carbon/85 via-carbon/45 to-carbon/35" />

        <div className="relative mx-auto w-full max-w-[80rem] px-6 pt-32 pb-16 md:px-10 md:pb-24">
          <Reveal>
            <Kicker className="text-nude">Hospedaje temporal en Asunción</Kicker>
            <h1 className="mt-5 max-w-2xl text-3xl leading-[1.1] text-nude md:text-4xl lg:text-5xl">
              Hospedaje temporal en Asunción.
              <br />
              <span className="italic">Vivilo como si fuera tuyo.</span>
            </h1>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-nude/75">
              La comodidad de un departamento, con servicios hoteleros y atención 24/7.
              Estadías flexibles en las mejores ubicaciones de Asunción.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-5">
              <CtaAnchor href="#buscador" variant="nude" size="lg">
                Ver disponibilidad
              </CtaAnchor>
            </div>
          </Reveal>
        </div>
      </section>


      <Section tone="cream" className="py-0 md:py-0">
        <div className="pt-16 pb-20 md:pt-20 md:pb-28">
          <Reveal>
            <StaySearch />
          </Reveal>
        </div>
      </Section>
    </>
  );
}

/* --------------------------- 03 · Qué es Sky Stays ------------------------ */

export function WhatIsSkyStays() {
  return (
    <Section>
      <div className="grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-20">
        <Reveal>
          <SectionHead
            kicker="Qué es Sky Stays"
            title={
              <>
                La comodidad de un departamento.
                <br />
                <span className="italic">El servicio de un hotel.</span>
              </>
            }
            lead="Tu propio espacio, completamente equipado, con la tranquilidad de contar con un equipo profesional durante toda tu estadía."
          />
          <dl className="mt-10 divide-y divide-border border-t border-border">
            {benefits.map((item) => (
              <div key={item.name} className="grid gap-1 py-4 sm:grid-cols-[13rem_1fr]">
                <dt className="text-sm font-semibold text-primary">{item.name}</dt>
                <dd className="text-sm text-muted-foreground">{item.text}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
        <Reveal delay={120} className="grid grid-cols-2 items-stretch gap-4">
          <PhotoSlot
            label="Tu día · a tu manera"
            ratio="3/4"
            src={escritorio.url}
            alt="Escritorio equipado en un departamento Sky Stays, ideal para trabajo y nómadas digitales"
          />
          <PhotoSlot
            label="Llegá a tu ritmo · check-in digital"
            ratio="3/4"
            src={checkin.url}
            alt="Huésped haciendo check-in digital con su celular en la puerta del departamento"
            objectPosition="88% center"
          />
          <PhotoSlot
            label="Todo listo · desde que llegás"
            ratio="16/9"
            tone="carbon"
            className="col-span-2"
            src={cocina.url}
            alt="Cocina equipada y ambiente integrado de un departamento Sky Stays en Asunción"
          />
        </Reveal>

      </div>
    </Section>
  );
}

/* ------------------------------ 04 · Tu viaje ---------------------------- */

export function YourTrip() {
  return (
    <Section tone="cream" id="tu-viaje">
      <SectionHead
        kicker="Tu viaje"
        title="¿Qué te trae a Asunción?"
        lead="Hay muchas formas de venir a la ciudad. Tenemos una estadía para cada una."
      />
      <ul className="edge-fade mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {journeys.map((j, i) => (
          <Reveal as="li" key={j.id} delay={i * 70} className="w-[78%] shrink-0 snap-start sm:w-[calc((100%-1.5rem)/2)] md:w-[calc((100%-3rem)/3)]">
            <a
              href={`/tu-viaje/${j.id}`}
              className="group flex h-full flex-col bg-card shadow-soft transition-shadow duration-500 ease-brand hover:shadow-lift"
            >
              <div className="overflow-hidden">
                <div className="transition-transform duration-[1200ms] ease-brand group-hover:scale-[1.04]">
                  <PhotoSlot
                    label=""
                    ratio="4/5"
                    tone={i % 3 === 1 ? "carbon" : "burgundy"}
                    {...(j.id === "negocios"
                      ? {
                          src: negociosPhoto.url,
                          alt: "Ejecutivos trabajando en sala de reuniones de un edificio Sky Stays en Asunción",
                          objectPosition: "62% center",
                        }
                      : j.id === "familia"
                        ? {
                            src: familiaPhoto.url,
                            alt: "Niños jugando en sala de juegos infantil de un departamento Sky Stays en Asunción",
                            objectPosition: "65% center",
                          }
                        : j.id === "escapadas"
                          ? {
                              src: escapadasPhoto.url,
                              alt: "Pareja relajándose en la piscina rooftop de un edificio Sky Stays al atardecer en Asunción",
                              objectPosition: "58% center",
                            }
                          : j.id === "shopping-asuncion"
                            ? {
                                src: shoppingPhoto.url,
                                alt: "Interior de un shopping moderno en Asunción con tiendas, escaleras y zonas de descanso",
                                objectPosition: "center",
                              }
                            : {})}
                  />
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="kicker text-primary-soft">{j.label}</p>
                <h3 className="mt-3 text-xl text-primary">{j.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {j.text}
                </p>
                <span className="kicker mt-6 inline-flex items-center gap-2 text-primary transition-all duration-300 group-hover:gap-3">
                  {j.cta} <span aria-hidden>→</span>
                </span>
              </div>
            </a>
          </Reveal>
        ))}
      </ul>
      <p className="kicker mt-2 text-muted-foreground">
        Deslizá para ver más perfiles de viaje
      </p>
    </Section>
  );
}

/* -------------------------- 05 · Rooms vs Suites ------------------------- */

export function RoomsAndSuites() {
  const categories = [
    {
      id: "sky-rooms",
      name: "Sky Rooms",
      claim: "Todo lo que necesitás. Donde necesitás estar.",
      text: "Departamentos funcionales, completamente equipados y estratégicamente ubicados.",
      ideal: "Ideal para turismo, trabajo y estadías prácticas.",
      cta: "Descubrir Sky Rooms",
      tone: "nude" as const,
      src: skyRooms.url,
      alt: "Departamento Sky Stays categoría Sky Rooms, equipado y estratégicamente ubicado en Asunción",
    },
    {
      id: "sky-suites",
      name: "Sky Suites",
      claim: "Cuando quedarse también es parte del viaje.",
      text: "Departamentos seleccionados en edificios destacados, con mayor foco en diseño, espacio y experiencia.",
      ideal: "Ideal para escapadas y estadías especiales.",
      cta: "Descubrir Sky Suites",
      tone: "burgundy" as const,
      src: skySuites.url,
      alt: "Departamento Sky Stays categoría Sky Suites, con mayor foco en diseño, espacio y experiencia en Asunción",
    },
  ];

  return (
    <Section>
      <SectionHead kicker="Categorías" title="Elegí cómo querés quedarte." />
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {categories.map((c, i) => (
          <Reveal as="article" key={c.id} delay={i * 100}>
            <div className="flex h-full flex-col">
              <PhotoSlot
                label={`${c.name} · departamento y detalle de acondicionamiento`}
                ratio="16/10"
                tone={c.tone}
                {...(c.src ? { src: c.src, alt: c.alt, objectPosition: "center" } : {})}
              />
              <div className="flex flex-1 flex-col border border-t-0 border-border bg-card p-8">
                <h3 className="font-sans text-xs font-semibold tracking-[0.24em] uppercase text-primary-soft">
                  {c.name}
                </h3>
                <p className="mt-4 font-display text-2xl text-primary">{c.claim}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {c.text}
                </p>
                <p className="mt-2 text-sm text-muted-foreground italic">{c.ideal}</p>
                <CtaAnchor
                  href={`/${c.id}`}
                  variant="outline"
                  className="mt-8 self-start"
                >
                  {c.cta}
                </CtaAnchor>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------ 06 · Propiedades destacadas -------------------- */

export function FeaturedProperties() {
  return (
    <Section tone="cream" id="alojamientos">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHead kicker="Alojamientos" title="Elegí dónde querés quedarte." />
        <CtaAnchor href="/alojamientos" variant="link" size="bare">
          Ver todos los alojamientos <span aria-hidden>→</span>
        </CtaAnchor>
      </div>

      <ul className="edge-fade mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {properties.map((p) => (
          <li
            key={p.id}
            className="w-[78%] shrink-0 snap-start bg-card shadow-soft sm:w-[calc((100%-1.5rem)/2)] md:w-[calc((100%-3rem)/3)]"
          >
            <article className="flex h-full flex-col">
              <PhotoSlot label={p.photo} ratio="4/3" />
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between gap-3">
                  <p className="kicker text-primary-soft">{p.category}</p>
                  <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Stars className="text-[0.625rem] text-primary" />
                    {p.rating} · {p.reviews}
                  </p>
                </div>
                <h3 className="mt-3 text-xl text-primary">{p.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {p.building} · {p.zone}
                </p>
                <p className="mt-4 text-sm text-foreground/80">
                  {p.guests} huéspedes · {p.beds}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {p.amenities.map((a) => (
                    <li
                      key={a}
                      className="border border-border-strong/25 px-2.5 py-1 text-[0.6875rem] text-primary"
                    >
                      {a}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex items-end justify-between gap-4 border-t border-border pt-5">
                  <p className="text-sm text-muted-foreground">
                    Desde{" "}
                    <span className="font-display text-xl text-primary">{p.from}</span>{" "}
                    / noche
                  </p>
                </div>
                <CtaAnchor
                  href={wa(`Hola, quiero consultar disponibilidad de ${p.name} (${p.building}).`)}
                  target="_blank"
                  rel="noreferrer"
                  size="sm"
                  className="mt-5"
                >
                  Ver disponibilidad
                </CtaAnchor>
              </div>
            </article>
          </li>
        ))}
      </ul>
      <p className="kicker mt-2 text-muted-foreground">
        Deslizá para ver más alojamientos
      </p>
    </Section>
  );
}

/* --------------------------- 07 · Experiencia --------------------------- */

export function ExperienceSection() {
  return (
    <Section tone="burgundy" id="experiencias">
      <SectionHead
        invert
        kicker="Experiencia Sky Stays"
        title="Tu estadía es mucho más que tu departamento."
      />
      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {experiences.map((e, i) => (
          <Reveal as="li" key={e.name} delay={i * 60}>
            <div className="group relative overflow-hidden">
              <PhotoSlot
                label={
                  e.name === "Coworking"
                    ? "TU DÍA TAMBIÉN PUEDE EMPEZAR ACÁ"
                    : e.name === "Piscinas"
                      ? "ASUNCIÓN DESDE ARRIBA\u00a0"
                      : e.name === "Quinchos"
                        ? "MOMENTOS PARA COMPARTIR\u00a0"
                        : e.name === "Fitness"
                          ? "SEGUÍ CON TU RUTINA DONDE ESTÉS"
                          : e.name === "Minimarket 24 h"
                            ? "TODO A MANO LAS 24H"
                            : e.name === "Gastronomía"
                              ? "UNA MESA CON VISTA A LA CIUDAD"
                              : `${e.name} · fotografía real del edificio`
                }
                ratio="5/4"
                tone={i % 2 === 0 ? "carbon" : "nude"}
                {...(e.name === "Coworking"
                  ? { src: coworking.url, alt: "Coworking en edificio de Sky Stays", objectPosition: "center" }
                  : e.name === "Piscinas"
                    ? { src: piscina.url, alt: "Piscina rooftop en edificio de Sky Stays", objectPosition: "left center" }
                    : e.name === "Quinchos"
                      ? { src: quincho.url, alt: "Quincho con vista a la ciudad en edificio de Sky Stays", objectPosition: "center" }
                      : e.name === "Fitness"
                        ? { src: gimnasio.url, alt: "Gimnasio en edificio de Sky Stays", objectPosition: "center" }
                        : e.name === "Minimarket 24 h"
                          ? { src: minimarket.url, alt: "Minimarket 24 h en edificio de Sky Stays", objectPosition: "center" }
                          : e.name === "Gastronomía"
                            ? { src: gastronomia.url, alt: "Restaurant con vista a la ciudad en edificio de Sky Stays", objectPosition: "center" }
                            : {})}
              />
              <div className="border border-t-0 border-nude/15 p-5">
                <h3 className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-nude">
                  {e.name}
                </h3>
                <p className="mt-2 text-sm text-nude/70">{e.text}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </ul>
      <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-nude/15 pt-8">
        <p className="max-w-xl text-xs leading-relaxed text-nude/55">
          Los servicios y amenities disponibles varían según el edificio y la propiedad
          seleccionada.
        </p>
        <CtaAnchor href="/experiencias/amenities" variant="ghostLight">
          Explorar experiencias
        </CtaAnchor>
      </div>
    </Section>
  );
}

/* ---------------------------- 08 · Petra Tower -------------------------- */

export function PetraTower() {
  return (
    <section className="relative overflow-hidden bg-carbon">
      <div className="absolute inset-0">
        <PhotoSlot
          label="Petra Tower · video o fotografía de alto impacto · vistas panorámicas"
          tone="carbon"
          className="h-full"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-carbon/90 via-carbon/70 to-transparent" />
      <div className="relative mx-auto w-full max-w-[80rem] px-6 py-24 md:px-10 md:py-36">
        <Reveal className="max-w-xl">
          <Kicker className="text-nude">Petra Tower</Kicker>
          <h2 className="mt-6 text-4xl text-nude md:text-5xl">
            Dormí sobre <span className="italic">Asunción.</span>
          </h2>
          <p className="mt-6 text-[0.9375rem] leading-relaxed text-nude/75">
            Una experiencia Sky Stays en uno de los edificios más destacados de la
            ciudad. Departamentos equipados, vistas panorámicas y servicios para hacer
            que quedarse también sea parte del viaje.
          </p>
          <p className="mt-6 text-xs tracking-[0.14em] text-nude/60 uppercase">
            Piscinas · Quinchos · Gimnasio · Restaurante · Minimarket 24 h
          </p>
          <CtaAnchor
            href="/edificios/petra-tower"
            variant="nude"
            size="lg"
            className="mt-9"
          >
            Descubrir Petra Tower
          </CtaAnchor>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------- 09 · Ubicaciones -------------------------- */

export function Locations() {
  return (
    <Section id="ubicaciones">
      <SectionHead
        kicker="Ubicaciones"
        title="Quedate donde Asunción sucede."
        lead="No importa si venís por trabajo, compras, gastronomía o simplemente a disfrutar la ciudad. Tenemos un Sky Stays cerca."
      />
      <ul className="mt-12 grid gap-6 sm:grid-cols-3">
        {locations.map((l, i) => (
          <Reveal as="li" key={l.id} delay={i * 80}>
            <a href={`/ubicaciones/${l.id}`} className="group block h-full">
              <div className="overflow-hidden">
                <div className="transition-transform duration-[1200ms] ease-brand group-hover:scale-[1.05]">
                  <PhotoSlot
                    label={l.photo}
                    ratio="3/4"
                    tone="burgundy"
                    {...(l.id === "villa-morra"
                      ? {
                          src: villaMorraPhoto.url,
                          alt: "Terraza gastronómica en Villa Morra, Asunción",
                          objectPosition: "center",
                        }
                      : l.id === "recoleta"
                        ? {
                            src: recoletaPhoto.url,
                            alt: "Patio de cafés en Recoleta, Asunción",
                            objectPosition: "center",
                          }
                        : l.id === "ycua-sati"
                          ? {
                              src: ycuaSatiPhoto.url,
                              alt: "Torres y eje corporativo de Ycuá Satí, Asunción",
                              objectPosition: "center",
                            }
                          : {})}
                  />
                </div>
              </div>
              <h3 className="mt-4 text-xl text-primary">{l.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{l.text}</p>
            </a>
          </Reveal>
        ))}
      </ul>

      <Reveal delay={120} className="mt-10">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-xl">
            <p className="kicker rule-line text-primary-soft">Mapa de Asunción</p>
            <h3 className="mt-3 text-2xl text-primary md:text-3xl">
              Asunción, a tu alrededor.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Nuestros alojamientos están cerca de los lugares que hacen que la
              ciudad valga la pena. Explorá el mapa y descubrí qué hacer
              alrededor de cada Sky Stays.
            </p>

          </div>
          <CtaAnchor
            href={wa("Hola Sky Stays, quiero una recomendación de zona para hospedarme en Asunción.")}
            target="_blank"
            rel="noreferrer"
            variant="outline"
            size="sm"
          >
            Pedir recomendación
          </CtaAnchor>
        </div>
        <AsuncionMap />
      </Reveal>
    </Section>
  );
}

/* ------------------------------ 10 · Day Stay --------------------------- */

export function DayStay() {
  return (
    <Section tone="cream">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <PhotoSlot
            label="Day Stay · descanso y desconexión durante el día"
            ratio="4/3"
            tone="burgundy"
            src={dayStayPhoto.url}
            alt="Pareja disfrutando un desayuno tranquilo en un departamento Sky Stays durante una estadía de día"
            objectPosition="center"
          />
        </Reveal>
        <Reveal delay={100}>
          <Kicker>Day Stay by Sky Stays</Kicker>
          <h2 className="mt-5 text-3xl text-primary md:text-[2.5rem] md:leading-[1.12]">
            No necesitás viajar para sentir que te escapaste.
          </h2>
          <p className="mt-6 text-[0.9375rem] leading-relaxed text-muted-foreground">
            Tu espacio por unas horas para descansar, trabajar, disfrutar de los
            amenities o simplemente cambiar de aire.
          </p>
          <p className="mt-4 text-sm font-semibold text-primary">
            Tarifas especiales para estadías durante el día.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <CtaAnchor href="/day-stay-asuncion">Descubrir Day Stay</CtaAnchor>
            <CtaAnchor
              href={wa("Hola, quiero consultar tarifas de Day Stay.")}
              target="_blank"
              rel="noreferrer"
              variant="outline"
            >
              Consultar por WhatsApp
            </CtaAnchor>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* --------------------- 11 · Corporate & Long Stay ----------------------- */

export function CorporateLongStay() {
  const perks = [
    "WiFi",
    "Workspace",
    "Cocina equipada",
    "Facturación",
    "Atención 24/7",
    "Ubicaciones corporativas",
  ];

  return (
    <Section tone="dark">
      <Reveal className="mb-12 overflow-hidden">
        <img
          src={longStayPhoto.url}
          alt="Departamento equipado y espacioso para estadías corporativas y prolongadas en Sky Stays"
          className="h-[280px] w-full object-cover sm:h-[360px] lg:h-[440px]"
          style={{ objectPosition: "center" }}
          loading="lazy"
        />
      </Reveal>
      <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <Reveal>
          <SectionHead
            invert
            kicker="Corporate & Long Stay"
            title="Quedate el tiempo que necesites."
            lead="Soluciones flexibles para empresas, profesionales y quienes necesitan hacer de Asunción su casa por un tiempo."
          />
          <p className="mt-8 flex flex-wrap gap-3 text-xs tracking-[0.14em] text-nude/70 uppercase">
            <span className="border border-nude/20 px-3 py-1.5">7+ noches</span>
            <span className="border border-nude/20 px-3 py-1.5">30+ noches</span>
            <span className="border border-nude/20 px-3 py-1.5">60+ noches</span>
          </p>
        </Reveal>
        <Reveal delay={100} className="grid gap-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="border border-nude/15 p-6">
              <h3 className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-nude">
                Corporate Stay
              </h3>
              <p className="mt-3 text-sm text-nude/70">
                Viajes de negocios · proyectos · relocalizaciones.
              </p>
            </div>
            <div className="border border-nude/15 p-6">
              <h3 className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-nude">
                Long Stay
              </h3>
              <p className="mt-3 text-sm text-nude/70">
                Condiciones especiales para estadías prolongadas.
              </p>
            </div>
          </div>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 border-t border-nude/15 pt-6 text-sm text-nude/70">
            {perks.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <CtaAnchor
            href={wa("Hola, quiero solicitar una propuesta corporativa / Long Stay.")}
            target="_blank"
            rel="noreferrer"
            variant="nude"
            className="self-start"
          >
            Solicitar propuesta
          </CtaAnchor>
        </Reveal>
      </div>
    </Section>
  );
}

/* ------------------------------ 12 · Reviews ---------------------------- */

const reviews = [
  {
    text: "Reemplazar por reviews reales de Airbnb, Booking y canales propios. Cada reseña debe incluir rating, extracto textual, nombre, país o ciudad y plataforma de origen.",
    name: "Pendiente de carga",
    place: "—",
    platform: "Airbnb",
  },
  {
    text: "Espacio reservado para reseña real. No se publican testimonios ficticios ni redactados como publicidad.",
    name: "Pendiente de carga",
    place: "—",
    platform: "Booking",
  },
  {
    text: "Espacio reservado para reseña real verificada por el equipo Sky Stays.",
    name: "Pendiente de carga",
    place: "—",
    platform: "Google",
  },
];

export function Reviews() {
  return (
    <Section>
      <div className="flex flex-wrap items-end justify-between gap-8">
        <SectionHead kicker="Reviews" title="Nuestros huéspedes lo cuentan mejor." />
        <div className="flex items-center gap-8">
          <div>
            <Stars className="text-primary" />
            <p className="mt-1 font-display text-2xl text-primary">
              {social.rating} / 5
            </p>
          </div>
          <div className="border-l border-border pl-8">
            <p className="font-display text-2xl text-primary">+{social.reviews}</p>
            <p className="kicker mt-1 text-muted-foreground">evaluaciones</p>
          </div>
          <div className="border-l border-border pl-8">
            <img
              src={superhostLogo.url}
              alt="Airbnb Superhost — Superanfitrión de Airbnb"
              className="h-10 w-auto"
              loading="lazy"
            />
            <p className="kicker mt-2 text-primary-soft">{social.badge}</p>
          </div>

        </div>
      </div>

      <ul className="mt-12 grid gap-6 md:grid-cols-3">
        {reviews.map((r, i) => (
          <Reveal as="li" key={i} delay={i * 80}>
            <blockquote className="flex h-full flex-col border border-border bg-card p-7">
              <Stars className="text-sm text-primary" />
              <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground/80">
                “{r.text}”
              </p>
              <footer className="mt-6 border-t border-border pt-4 text-xs text-muted-foreground">
                <span className="font-semibold text-primary">{r.name}</span> · {r.place}{" "}
                · {r.platform}
              </footer>
            </blockquote>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

/* -------------------------- 13 · Reserva directa ------------------------ */

export function DirectBooking() {
  return (
    <Section tone="cream">
      <SectionHead
        align="center"
        kicker="Reserva directa"
        title="Reservá directo con Sky Stays."
      />
      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {directBooking.map((b, i) => (
          <Reveal as="li" key={b.name} delay={i * 60}>
            <div className="h-full border-t-2 border-primary bg-card p-6">
              <p className="font-display text-xl text-primary">{b.name}</p>
              <p className="mt-3 text-sm text-muted-foreground">{b.text}</p>
            </div>
          </Reveal>
        ))}
      </ul>
      <div className="mt-12 flex flex-wrap justify-center gap-4">
        <Cta size="lg" onClick={() => document.getElementById("buscador")?.scrollIntoView()}>
          Reservar ahora
        </Cta>
        <CtaAnchor
          href={wa("Hola, quiero reservar directo con Sky Stays.")}
          target="_blank"
          rel="noreferrer"
          variant="outline"
          size="lg"
        >
          Hablar por WhatsApp
        </CtaAnchor>
      </div>
    </Section>
  );
}

/* ------------------------ 14 · Guía de Asunción ------------------------- */

export function AsuncionGuide() {
  return (
    <Section>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHead
          kicker="Guía de Asunción"
          title="Descubrí Asunción como alguien que vive acá."
        />
        <CtaAnchor href="/guia-de-asuncion" variant="link" size="bare">
          Explorar guía de Asunción <span aria-hidden>→</span>
        </CtaAnchor>
      </div>
      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {guide.map((g, i) => {
          const srcMap: Record<string, string> = {
            "asuncion-48-horas": costaneraPhoto.url,
            "mejores-barrios-para-hospedarse": barriosPhoto.url,
            "asuncion-viajes-de-negocios": negociosAerialPhoto.url,
          };
          return (
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
          );
        })}
      </ul>
    </Section>
  );
}

/* ---------------------------- 15 · Respaldo ---------------------------- */

export function Backing() {
  return (
    <Section tone="cream" className="py-14 md:py-16">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-2xl text-primary">
            Hospitalidad respaldada por Grupo Petra.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Sky Stays opera con el respaldo de Grupo Petra, desarrollador de edificios y
            proyectos en Asunción. Esa estructura sostiene el estándar de mantenimiento,
            seguridad y servicio de cada estadía.
          </p>
        </div>
        <img src={monogram.url} alt="" aria-hidden className="h-16 w-auto opacity-25" />
      </div>
    </Section>
  );
}

/* ---------------------------- 16 · CTA final --------------------------- */

export function FinalCta() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <PhotoSlot
          label="Fotografía o video fuerte de Asunción · ciudad de noche"
          tone="burgundy"
          className="h-full"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-primary/95 to-primary/60" />
      <div className="relative mx-auto w-full max-w-[80rem] px-6 py-24 text-center md:px-10 md:py-32">
        <Reveal>
          <h2 className="mx-auto max-w-2xl text-4xl text-nude md:text-5xl">
            Tu próxima estadía <span className="italic">empieza acá.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[0.9375rem] leading-relaxed text-nude/75">
            Una noche. Un fin de semana. Un viaje de trabajo. Quedate en Asunción a tu
            manera.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <CtaAnchor href="#buscador" variant="nude" size="lg">
              Ver disponibilidad
            </CtaAnchor>
            <CtaAnchor
              href={wa("Hola, quiero consultar disponibilidad en Sky Stays.")}
              target="_blank"
              rel="noreferrer"
              variant="ghostLight"
              size="lg"
            >
              WhatsApp
            </CtaAnchor>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
