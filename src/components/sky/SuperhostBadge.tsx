import superhost from "@/assets/airbnb-superhost-v2.png.asset.json";
import { cn } from "@/lib/utils";
import { social } from "@/data/sky";


/**
 * Sello Superanfitrión de Airbnb con prueba social.
 * El logo original es oscuro, por eso siempre se apoya sobre una placa clara.
 */
export function SuperhostBadge({
  className,
  size = "md",
  invert = false,
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
  invert?: boolean;
}) {
  const logoHeight = { sm: "h-6", md: "h-8", lg: "h-11" }[size];

  return (
    <div
      className={cn(
        "inline-flex items-center gap-4 border px-5 py-3 backdrop-blur-sm",
        invert
          ? "border-nude/25 bg-nude/95 text-nude-foreground"
          : "border-border bg-card text-foreground",
        className,
      )}
    >
      <img
        src={superhost.url}
        alt="Airbnb Superhost — Superanfitrión de Airbnb"
        className={cn("w-auto shrink-0", logoHeight)}
        loading="lazy"
      />
      <span className="kicker border-l border-primary/20 pl-4 leading-tight text-primary-soft">
        {social.badge}
      </span>

    </div>
  );
}
