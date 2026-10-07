import { PhotoSlot } from "@/components/sky/PhotoSlot";
import { CtaAnchor } from "@/components/sky/ui";
import { bookingUrl, formatPrice, type Listing, type StayParams } from "@/lib/guesty-config";

export function PropertyCard({ p, stay }: { p: Listing; stay?: StayParams | undefined }) {
  const price = formatPrice(p.price, p.currency);
  const details = [
    p.bedrooms ? `${p.bedrooms} ${p.bedrooms === 1 ? "dormitorio" : "dormitorios"}` : null,
    p.beds ? `${p.beds} ${p.beds === 1 ? "cama" : "camas"}` : null,
  ].filter(Boolean);
  return (
    <article className="flex h-full flex-col bg-card shadow-soft">
      <PhotoSlot src={p.photos[0]} alt={p.name} ratio="4/3" />
      <div className="flex flex-1 flex-col p-6">
        {p.category && <p className="kicker text-primary-soft">{p.category}</p>}
        <h3 className="mt-3 text-xl text-primary">{p.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {[p.building, p.zone].filter(Boolean).join(" · ")}
        </p>
        <p className="mt-4 text-sm text-foreground/80">
          {[`${p.guests} huéspedes`, ...details].join(" · ")}
        </p>
        {p.amenities.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {p.amenities.map((a) => (
              <li key={a} className="border border-border-strong/25 px-2.5 py-1 text-[0.6875rem] text-primary">
                {a}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-auto pt-6">
          {price && (
            <p className="border-t border-border pt-5 text-sm text-muted-foreground">
              Desde <span className="font-display text-xl text-primary">{price}</span> / noche
            </p>
          )}
          <CtaAnchor href={bookingUrl(p.id, stay)} target="_blank" rel="noreferrer" size="sm" className="mt-5">
            Ver disponibilidad
          </CtaAnchor>
        </div>
      </div>
    </article>
  );
}

export function PropertyCardSkeleton() {
  return (
    <div className="flex h-full animate-pulse flex-col bg-card shadow-soft">
      <div className="aspect-[4/3] bg-muted" />
      <div className="space-y-3 p-6">
        <div className="h-3 w-20 bg-muted" />
        <div className="h-5 w-3/4 bg-muted" />
        <div className="h-3 w-1/2 bg-muted" />
        <div className="h-10 w-full bg-muted" />
      </div>
    </div>
  );
}
