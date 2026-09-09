import logo from "@/assets/sky-stays-logo-beige.png.asset.json";
import { nav, social, wa } from "@/data/sky";
import { CtaAnchor } from "./ui";

export function SiteFooter() {
  return (
    <footer className="bg-carbon text-carbon-foreground">
      <div className="mx-auto grid w-full max-w-[80rem] gap-12 px-6 py-16 md:grid-cols-[1.2fr_2fr] md:px-10">
        <div>
          <img src={logo.url} alt="Sky Stays" className="h-16 w-auto" />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-nude/60">
            Hospedaje temporal en Asunción. La comodidad de un departamento, con
            servicios hoteleros y atención 24/7.
          </p>
          <p className="kicker mt-6 text-nude/45">{social.badge}</p>

          <CtaAnchor
            href={wa("Hola, quiero consultar disponibilidad en Sky Stays.")}
            target="_blank"
            rel="noreferrer"
            variant="ghostLight"
            size="sm"
            className="mt-6"
          >
            Hablar por WhatsApp
          </CtaAnchor>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {nav.map((group) => (
            <nav key={group.label} aria-label={group.label}>
              <p className="kicker text-nude/45">{group.label}</p>
              <ul className="mt-4 space-y-2.5">
                {group.items.map((item) => (
                  <li key={item.to}>
                    <a
                      href={item.to}
                      className="text-sm text-nude/70 transition-colors duration-300 hover:text-nude"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="border-t border-nude/10 px-6 py-6 md:px-10">
        <div className="mx-auto flex w-full max-w-[80rem] flex-col gap-3 text-[0.6875rem] tracking-wide text-nude/40 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Sky Stays · Asunción, Paraguay</p>
          <p>Hospitalidad respaldada por Grupo Petra</p>
        </div>
      </div>
    </footer>
  );
}
