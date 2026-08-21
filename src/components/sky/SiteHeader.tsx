import { useEffect, useState } from "react";
import logo from "@/assets/sky-stays-logo.png.asset.json";
import { nav, wa } from "@/data/sky";
import { cn } from "@/lib/utils";
import { CtaAnchor } from "./ui";

const languages = ["ES", "PT", "EN"];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState("ES");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-brand",
        scrolled || open
          ? "bg-primary/95 shadow-panel backdrop-blur-md"
          : "bg-gradient-to-b from-carbon/55 to-transparent",
      )}
    >
      <div className="mx-auto flex w-full max-w-[84rem] items-center justify-between gap-6 px-6 py-4 md:px-10">
        <a href="/" className="shrink-0" aria-label="Sky Stays — inicio">
          <img
            src={logo.url}
            alt="Sky Stays"
            className={cn(
              "w-auto transition-all duration-500 ease-brand",
              scrolled ? "h-9" : "h-11 md:h-14",
            )}
          />
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
          {nav.map((group) => (
            <div key={group.label} className="group relative">
              <button
                className="kicker flex h-11 items-center px-4 text-nude/85 transition-colors duration-300 group-hover:text-nude"
                aria-haspopup="true"
              >
                {group.label}
              </button>
              <div className="invisible absolute top-full left-0 w-64 translate-y-2 border border-nude/15 bg-primary p-2 opacity-0 shadow-panel transition-all duration-300 ease-brand group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                {group.items.map((item) => (
                  <a
                    key={item.to}
                    href={item.to}
                    className="block px-4 py-2.5 text-sm text-nude/75 transition-colors duration-200 hover:bg-primary-soft hover:text-nude"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
          <a href="/guia-de-asuncion" className="kicker px-4 py-3 text-nude/85 hover:text-nude">
            Guía de Asunción
          </a>
          <a href="/propietarios" className="kicker px-4 py-3 text-nude/85 hover:text-nude">
            Propietarios
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <div
            className="hidden items-center gap-1 md:flex"
            role="group"
            aria-label="Idioma"
          >
            {languages.map((code) => (
              <button
                key={code}
                onClick={() => setLang(code)}
                aria-pressed={lang === code}
                className={cn(
                  "kicker px-1.5 py-1 transition-colors duration-300",
                  lang === code ? "text-nude" : "text-nude/45 hover:text-nude/80",
                )}
              >
                {code}
              </button>
            ))}
          </div>
          <CtaAnchor href="#buscador" variant="nude" size="sm" className="hidden sm:inline-flex">
            Reservar
          </CtaAnchor>
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
            aria-expanded={open}
            aria-label="Abrir menú"
          >
            <span
              className={cn(
                "h-px w-6 bg-nude transition-transform duration-300",
                open && "translate-y-[3.5px] rotate-45",
              )}
            />
            <span
              className={cn(
                "h-px w-6 bg-nude transition-transform duration-300",
                open && "-translate-y-[3.5px] -rotate-45",
              )}
            />
          </button>
        </div>
      </div>

      {open ? (
        <div className="max-h-[75vh] overflow-y-auto border-t border-nude/10 bg-primary px-6 pt-4 pb-8 lg:hidden">
          {nav.map((group) => (
            <div key={group.label} className="border-b border-nude/10 py-4">
              <p className="kicker text-nude/50">{group.label}</p>
              <div className="mt-3 grid gap-2">
                {group.items.map((item) => (
                  <a
                    key={item.to}
                    href={item.to}
                    className="text-sm text-nude/85"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
          <div className="grid gap-3 py-5">
            <a href="/guia-de-asuncion" className="kicker text-nude">
              Guía de Asunción
            </a>
            <a href="/propietarios" className="kicker text-nude">
              Propietarios
            </a>
          </div>
          <div className="grid gap-3">
            <CtaAnchor href="#buscador" variant="nude" onClick={() => setOpen(false)}>
              Ver disponibilidad
            </CtaAnchor>
            <CtaAnchor
              href={wa("Hola, quiero consultar disponibilidad en Sky Stays.")}
              variant="ghostLight"
              target="_blank"
              rel="noreferrer"
            >
              Hablar por WhatsApp
            </CtaAnchor>
          </div>
        </div>
      ) : null}
    </header>
  );
}
