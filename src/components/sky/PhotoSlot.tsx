import monogram from "@/assets/sky-stays-monogram.png.asset.json";
import { cn } from "@/lib/utils";

/**
 * Espacio reservado para fotografía real de Sky Stays.
 * Mantiene la composición del sitio hasta que se carguen las imágenes
 * definitivas: reemplazar por <img src={...} alt={...} /> cuando estén.
 */
export function PhotoSlot({
  label,
  className,
  tone = "burgundy",
  ratio,
}: {
  label: string;
  className?: string;
  tone?: "burgundy" | "nude" | "carbon";
  ratio?: string;
}) {
  const tones = {
    burgundy: "bg-primary text-nude",
    nude: "bg-nude text-primary",
    carbon: "bg-carbon text-nude",
  } as const;

  return (
    <figure
      className={cn(
        "trama relative flex h-full w-full items-end overflow-hidden",
        tones[tone],
        className,
      )}
      style={{ aspectRatio: ratio, ["--trama-opacity" as string]: "0.16" }}
    >
      <img
        src={monogram.url}
        alt=""
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 w-[38%] max-w-[8rem] -translate-x-1/2 -translate-y-1/2 opacity-25"
      />
      <figcaption className="relative w-full p-4 text-[0.5625rem] leading-relaxed font-semibold tracking-[0.2em] uppercase opacity-70">
        {label}
      </figcaption>
    </figure>
  );
}
