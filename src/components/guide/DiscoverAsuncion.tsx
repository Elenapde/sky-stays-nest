import { useMemo, useState } from "react";

import { PhotoSlot } from "@/components/sky/PhotoSlot";
import { Reveal } from "@/components/sky/Reveal";
import { Section, SectionHead } from "@/components/sky/ui";
import {
  activeCategories,
  activePlaces,
  categoryLabel,
  featuredPlaces,
  zoneLabel,
  type Place,
} from "@/data/asuncion";

/** Lugares visibles en "Explorá por interés" — se excluyen los supermercados 24 h. */
const explorePlaces = activePlaces.filter((p) => p.category !== "supermercado");
const exploreCategories = activeCategories.filter((c) => c.id !== "supermercado");
import { cn } from "@/lib/utils";

/* --------------------------------- Chips ---------------------------------- */

function FilterChip({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "kicker shrink-0 border px-4 py-2 text-[0.625rem] transition-colors duration-300 ease-brand",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border-strong text-primary-soft hover:border-primary hover:text-primary",
      )}
    >
      {children}
    </button>
  );
}

/* ------------------------------- Card links ------------------------------- */

function PlaceLinks({ place }: { place: Place }) {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
      <a
        href={place.mapsUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-primary transition-all duration-300 hover:gap-3 hover:text-primary-soft"
      >
        Ver ubicación →
      </a>
      {place.instagram ? (
        <a
          href={place.instagram}
          target="_blank"
          rel="noreferrer"
          className="text-[0.6875rem] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-primary"
        >
          Instagram
        </a>
      ) : null}
      {place.website ? (
        <a
          href={place.website}
          target="_blank"
          rel="noreferrer"
          className="text-[0.6875rem] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-primary"
        >
          Sitio web
        </a>
      ) : null}
    </div>
  );
}

/* ----------------------------- Destacados (hero) -------------------------- */

function FeaturedCard({ place, large }: { place: Place; large?: boolean }) {
  return (
    <article className="group flex h-full flex-col">
      <div className="overflow-hidden">
        <div className="transition-transform duration-[1200ms] ease-brand group-hover:scale-[1.04]">
          <PhotoSlot
            label={`${place.barrio} · ${categoryLabel(place.category)}`}
            {...(place.image ? { src: place.image } : {})}
            alt={`${place.name}, ${place.barrio}, Asunción`}
            ratio={large ? "4/3" : "3/2"}
            tone="burgundy"
          />
        </div>
      </div>
      <p className="kicker mt-4 text-primary-soft">
        {categoryLabel(place.category)}
      </p>
      <h3
        className={cn(
          "mt-2 leading-snug text-primary",
          large ? "text-2xl md:text-3xl" : "text-lg",
        )}
      >
        {place.name}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {place.description}
      </p>
      <p className="mt-3 text-xs uppercase tracking-[0.14em] text-primary-soft">
        {place.barrio} · {zoneLabel(place.zone)}
      </p>
      <PlaceLinks place={place} />
    </article>
  );
}

export function DiscoverFeatured() {
  if (featuredPlaces.length === 0) return null;
  const [lead, ...rest] = featuredPlaces;
  if (!lead) return null;

  return (
    <Section>
      <SectionHead
        kicker="Descubrí Asunción"
        title="Una ciudad para descubrir a tu manera."
        lead="Gastronomía, cultura, compras y lugares para disfrutar. Una selección de experiencias para conocer Asunción durante tu estadía."
      />
      <p className="kicker mt-10 rule-line text-primary-soft">
        Recomendados Sky Stays
      </p>
      <div className="mt-6 grid gap-8 lg:grid-cols-[1.35fr_1fr]">
        <Reveal>
          <FeaturedCard place={lead} large />
        </Reveal>
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
          {rest.slice(0, 2).map((p, i) => (
            <Reveal as="li" key={p.id} delay={80 + i * 70}>
              <FeaturedCard place={p} />
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}

/* --------------------------- Explorar (filtros) --------------------------- */

export function DiscoverExplore() {
  const [category, setCategory] = useState<string>("all");
  const filtered = useMemo(
    () =>
      explorePlaces.filter((p) => category === "all" || p.category === category),
    [category],
  );

  return (
    <Section tone="cream" id="descubrir-asuncion">
      <SectionHead
        kicker="Explorá por interés"
        title="Elegí qué querés hacer en Asunción."
        lead="Filtrá por tipo de experiencia y descubrí los lugares que quedan cerca de nuestros alojamientos."
      />

      <div className="mt-8 -mx-6 overflow-x-auto px-6 md:mx-0 md:px-0">
        <div className="flex gap-2 pb-1">
          <FilterChip active={category === "all"} onClick={() => setCategory("all")}>
            Todos
          </FilterChip>
          {exploreCategories.map((c) => (
            <FilterChip
              key={c.id}
              active={category === c.id}
              onClick={() => setCategory(c.id)}
            >
              {c.label}
            </FilterChip>
          ))}
        </div>
      </div>

      <p className="mt-6 text-xs uppercase tracking-[0.14em] text-primary-soft">
        {filtered.length} {filtered.length === 1 ? "lugar" : "lugares"}
      </p>

      {filtered.length === 0 ? (
        <p className="mt-6 text-sm text-muted-foreground">
          No hay lugares con esa categoría. Probá con otra opción.
        </p>
      ) : (
        <ul className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <Reveal as="li" key={p.id} delay={Math.min(i, 6) * 60}>
              <FeaturedCard place={p} />
            </Reveal>
          ))}
        </ul>
      )}
    </Section>
  );
}
