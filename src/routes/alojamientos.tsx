import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import { PropertyCard, PropertyCardSkeleton } from "@/components/sky/PropertyCard";
import { SiteFooter } from "@/components/sky/SiteFooter";
import { SiteHeader } from "@/components/sky/SiteHeader";
import { StaySearch } from "@/components/sky/StaySearch";
import { WhatsAppFab } from "@/components/sky/WhatsAppFab";
import { CtaAnchor, Section, SectionHead } from "@/components/sky/ui";
import { wa } from "@/data/sky";
import { getListings, searchListings } from "@/lib/guesty.functions";

type Search = { checkIn?: string; checkOut?: string; guests?: number; tag?: string };
const DATE = /^\d{4}-\d{2}-\d{2}$/;

const title = "Alojamientos en Asunción | Sky Rooms y Sky Suites — Sky Stays";
const description =
  "Buscá departamentos con servicio hotelero en Asunción por fecha y cantidad de huéspedes. Reservá directo con Sky Stays.";

export const Route = createFileRoute("/alojamientos")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    checkIn: typeof s.checkIn === "string" && DATE.test(s.checkIn) ? s.checkIn : undefined,
    checkOut: typeof s.checkOut === "string" && DATE.test(s.checkOut) ? s.checkOut : undefined,
    guests: Number(s.guests) > 0 ? Math.floor(Number(s.guests)) : undefined,
    tag: typeof s.tag === "string" && s.tag ? s.tag : undefined,
  }),
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AlojamientosPage,
});

function fmt(d: string) {
  const [y, m, day] = d.split("-");
  return `${day}/${m}/${y}`;
}

function AlojamientosPage() {
  const { checkIn, checkOut, guests, tag } = Route.useSearch();
  const hasDates = !!checkIn && !!checkOut && checkOut > checkIn;
  const stay = hasDates ? { checkIn, checkOut, guests: guests ?? 2 } : undefined;

  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["listings", hasDates ? { checkIn, checkOut, guests, tag } : "all"],
    queryFn: () =>
      hasDates
        ? searchListings({ data: { checkIn: checkIn!, checkOut: checkOut!, guests: guests ?? 2, tag } })
        : getListings(),
    staleTime: 60_000,
  });

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="pt-24">
        <Section tone="cream">
          <StaySearch />
          <div className="mt-14">
            <SectionHead
              kicker="Alojamientos"
              title={hasDates ? "Disponibles para tus fechas." : "Todos nuestros alojamientos."}
            />
            {hasDates && (
              <p className="mt-3 text-sm text-muted-foreground">
                {fmt(checkIn!)} → {fmt(checkOut!)} · {guests ?? 2} huéspedes
                {tag ? ` · ${tag}` : ""}
              </p>
            )}
          </div>

          {isError ? (
            <div role="alert" className="mt-12 bg-card p-8 text-center shadow-soft">
              <p className="text-primary">No pudimos cargar los alojamientos en este momento.</p>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <button type="button" onClick={() => refetch()} className="text-sm text-primary underline">
                  Reintentar
                </button>
                <CtaAnchor href={wa("Hola, quiero consultar disponibilidad.")} target="_blank" rel="noreferrer" size="sm">
                  Consultar por WhatsApp
                </CtaAnchor>
              </div>
            </div>
          ) : isPending ? (
            <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }, (_, i) => (
                <li key={i}>
                  <PropertyCardSkeleton />
                </li>
              ))}
            </ul>
          ) : data.length === 0 ? (
            <div className="mt-12 bg-card p-8 text-center shadow-soft">
              <p className="text-primary">No encontramos alojamientos disponibles para esa búsqueda.</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Probá con otras fechas o escribinos y te ayudamos a encontrar opciones.
              </p>
              <CtaAnchor
                href={wa("Hola, no encontré disponibilidad para mis fechas. ¿Me ayudan?")}
                target="_blank"
                rel="noreferrer"
                size="sm"
                className="mt-5"
              >
                Consultar por WhatsApp
              </CtaAnchor>
            </div>
          ) : (
            <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.map((p) => (
                <li key={p.id}>
                  <PropertyCard p={p} stay={stay} />
                </li>
              ))}
            </ul>
          )}
        </Section>
      </main>
      <SiteFooter />
      <WhatsAppFab />
    </div>
  );
}
