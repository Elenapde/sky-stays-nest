import logo from "@/assets/sky-stays-logo-beige.png.asset.json";
import { nav, social, wa } from "@/data/sky";
import { CtaAnchor, Stars } from "./ui";

export function SiteFooter() {
  return (
    <footer className="bg-carbon text-carbon-foreground">
      {/* Acceso discreto para propietarios */}
      <div className="border-b border-nude/10 px-6 py-12 md:px-10">
        <div className="mx-auto flex w-full max-w-[80rem] flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl text-nude md:text-2xl">
              ¿Tenés un departamento en Asunción?
            </h2>
            <p className="mt-2 text-sm text-nude/60">
              Convertí tu propiedad en una experiencia Sky Stays.
            </p>
          </div>
          <CtaAnchor href="/propietarios" variant="ghostLight">
            Conocer servicio para propietarios →
          </CtaAnchor>
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-[80rem] gap-12 px-6 py-16 md:grid-cols-[1.2fr_2fr] md:px-10">
        <div>
          <img src={logo.url} alt="Sky Stays" className="h-16 w-auto" />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-nude/60">
            Hospedaje temporal en Asunción. La comodidad de un departamento, con
            servicios hoteleros y atención 24/7.
          </p>
          <p className="mt-6 flex items-center gap-2 text-sm text-nude/70">
            <Stars className="text-nude" />
            {social.rating} · +{social.reviews} evaluaciones
          </p>
          <p className="kicker mt-2 text-nude/45">{social.badge}</p>
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
