import { useEffect, useState } from "react";
import logo from "@/assets/sky-stays-logo-beige.png.asset.json";
import { nav, wa } from "@/data/sky";
import { cn } from "@/lib/utils";
import { CtaAnchor } from "./ui";

const languages = ["ES", "PT", "EN"];

function readLang(): string {
  const m = document.cookie.match(/(?:^|; )googtrans=\/es\/(pt|en)/);
  return m?.[1] ? m[1].toUpperCase() : "ES";
}

function changeLang(code: string) {
  const host = window.location.hostname;
  const domains = ["", host, `.${host.split(".").slice(-2).join(".")}`];
  for (const d of domains) {
    const dom = d ? `; domain=${d}` : "";
    if (code === "ES") {
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${dom}`;
    } else {
      document.cookie = `googtrans=/es/${code.toLowerCase()}; path=/${dom}`;
    }
  }
  window.location.reload();
}

function loadTranslator() {
  if (document.getElementById("gt-script")) return;
  const w = window as unknown as Record<string, unknown>;
  w.googleTranslateElementInit = () => {
    const g = (w.google as { translate: { TranslateElement: new (o: object, id: string) => unknown } });
    new g.translate.TranslateElement({ pageLanguage: "es", includedLanguages: "es,pt,en", autoDisplay: false }, "gt-element");
  };
  const el = document.createElement("div");
  el.id = "gt-element";
  el.style.display = "none";
  document.body.appendChild(el);
  const s = document.createElement("script");
  s.id = "gt-script";
  s.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  document.body.appendChild(s);
}

function LangSwitch({ lang, className }: { lang: string; className?: string }) {
  return (
    <div className={cn("items-center gap-1", className)} role="group" aria-label="Idioma">
      {languages.map((code) => (
        <button
          key={code}
          onClick={() => code !== lang && changeLang(code)}
          aria-pressed={lang === code}
          translate="no"
          className={cn(
            "notranslate kicker px-1.5 py-1 transition-colors duration-300",
            lang === code ? "text-nude" : "text-nude/45 hover:text-nude/80",
          )}
        >
          {code}
        </button>
      ))}
    </div>
  );
}

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

  useEffect(() => {
    const current = readLang();
    setLang(current);
    document.documentElement.lang = current.toLowerCase();
    if (current !== "ES") loadTranslator();
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
      <div className="flex w-full items-center justify-between gap-6 px-6 py-4 md:px-10">
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
          <a href="/corporate-long-stay" className="kicker px-4 py-3 text-nude/85 hover:text-nude">
            Corporate & Long Stay
          </a>
          <a href="/guia-de-asuncion" className="kicker px-4 py-3 text-nude/85 hover:text-nude">
            Guía de Asunción
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <LangSwitch lang={lang} className="hidden md:flex" />
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
          <LangSwitch lang={lang} className="flex border-b border-nude/10 py-4 md:hidden" />
          <div className="grid gap-3 py-5">
            <a href="/corporate-long-stay" className="kicker text-nude">
              Corporate & Long Stay
            </a>
            <a href="/guia-de-asuncion" className="kicker text-nude">
              Guía de Asunción
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
