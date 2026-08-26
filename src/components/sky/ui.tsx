import { Link } from "@tanstack/react-router";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ---------------------------------- CTA ---------------------------------- */

export const ctaVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-xs font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.18em] transition-all duration-500 ease-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground hover:bg-primary-soft hover:shadow-lift",
        nude: "bg-nude text-nude-foreground hover:bg-secondary hover:shadow-lift",
        outline:
          "border border-border-strong text-primary hover:bg-primary hover:text-primary-foreground",
        ghostLight:
          "border border-nude/45 text-nude hover:bg-nude hover:text-nude-foreground",
        link: "gap-3 text-primary hover:gap-4 hover:text-primary-soft",
        linkLight: "gap-3 text-nude hover:gap-4",
      },
      size: {
        md: "h-12 px-7",
        lg: "h-14 px-9",
        sm: "h-10 px-5",
        bare: "h-auto p-0",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type CtaProps = VariantProps<typeof ctaVariants> & { className?: string };

export function Cta({
  variant,
  size,
  className,
  ...props
}: CtaProps & ComponentProps<"button">) {
  return <button className={cn(ctaVariants({ variant, size }), className)} {...props} />;
}

export function CtaLink({
  variant,
  size,
  className,
  ...props
}: CtaProps & ComponentProps<typeof Link>) {
  return <Link className={cn(ctaVariants({ variant, size }), className)} {...props} />;
}

export function CtaAnchor({
  variant,
  size,
  className,
  ...props
}: CtaProps & ComponentProps<"a">) {
  return <a className={cn(ctaVariants({ variant, size }), className)} {...props} />;
}

/* -------------------------------- Sections -------------------------------- */

export function Section({
  id,
  className,
  children,
  tone = "light",
}: {
  id?: string;
  className?: string;
  children: ReactNode;
  tone?: "light" | "cream" | "dark" | "burgundy";
}) {
  const tones = {
    light: "bg-background text-foreground",
    cream: "bg-secondary text-foreground",
    dark: "bg-carbon text-carbon-foreground",
    burgundy: "bg-primary text-primary-foreground",
  } as const;

  return (
    <section
      id={id}
      className={cn("relative px-6 py-20 md:px-10 md:py-28", tones[tone], className)}
    >
      <div className="mx-auto w-full max-w-[80rem]">{children}</div>
    </section>
  );
}

export function Kicker({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("kicker rule-line text-primary-soft", className)}>{children}</p>
  );
}

export function SectionHead({
  kicker,
  title,
  lead,
  align = "left",
  invert = false,
  className,
}: {
  kicker?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  invert?: boolean;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {kicker ? <Kicker className={invert ? "text-nude" : ""}>{kicker}</Kicker> : null}
      <h2
        className={cn(
          "mt-5 text-3xl leading-[1.12] md:text-[2.75rem]",
          invert ? "text-nude" : "text-primary",
        )}
      >
        {title}
      </h2>
      {lead ? (
        <p
          className={cn(
            "mt-5 text-[0.9375rem] leading-relaxed",
            invert ? "text-nude/75" : "text-muted-foreground",
          )}
        >
          {lead}
        </p>
      ) : null}
    </header>
  );
}

/* --------------------------------- Rating -------------------------------- */

export function Stars({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("tracking-[0.12em]", className)}>
      ★★★★★
    </span>
  );
}
