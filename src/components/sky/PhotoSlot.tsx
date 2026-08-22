import monogram from "@/assets/sky-stays-monogram.png.asset.json";
import { cn } from "@/lib/utils";

/**
 * Espacio para fotografía de Sky Stays. Si llega `src`, muestra la foto real
 * con el caption superpuesto; si no, renderiza el placeholder de marca con la
 * trama geométrica y el monograma.
 */
export function PhotoSlot({
  label,
  className,
  tone = "burgundy",
  ratio,
  src,
  alt,
}: {
  label: string;
  className?: string;
  tone?: "burgundy" | "nude" | "carbon";
  ratio?: string;
  src?: string;
  alt?: string;
}) {
  const tones = {
    burgundy: "bg-primary text-nude",
    nude: "bg-nude text-primary",
    carbon: "bg-carbon text-nude",
  } as const;

  const captionColor = src
    ? "text-nude"
    : tone === "nude"
      ? "text-primary"
      : "text-nude";

  return (
    <figure
      className={cn(
        "trama relative flex h-full w-full items-end overflow-hidden",
        tones[tone],
        className,
      )}
      style={{ aspectRatio: ratio, ["--trama-opacity" as string]: "0.16" }}
    >
      {src ? (
        <>
          <img
            src={src}
            alt={alt ?? label}
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-carbon/80 via-carbon/10 to-transparent" />
        </>
      ) : (
        <img
          src={monogram.url}
          alt=""
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-1/2 w-[38%] max-w-[8rem] -translate-x-1/2 -translate-y-1/2 opacity-25"
        />
      )}
      <figcaption
        className={cn(
          "relative w-full p-4 text-[0.5625rem] leading-relaxed font-semibold tracking-[0.2em] uppercase opacity-90",
          captionColor,
        )}
      >
        {label}
      </figcaption>
    </figure>
  );
}
