import { wa } from "@/data/sky";

/**
 * Botón flotante permanente. El mensaje es contextual: cada sección puede
 * pasar el suyo mediante `wa("...")` en su propio CTA.
 */
export function WhatsAppFab() {
  return (
    <a
      href={wa("Hola, quiero consultar disponibilidad en Sky Stays.")}
      target="_blank"
      rel="noreferrer"
      aria-label="Escribinos por WhatsApp"
      className="group fixed right-5 bottom-5 z-50 flex items-center gap-3 rounded-full bg-primary py-3 pr-5 pl-3 text-primary-foreground shadow-lift transition-all duration-500 ease-brand hover:bg-primary-soft md:right-8 md:bottom-8"
    >
      <svg viewBox="0 0 24 24" aria-hidden className="h-6 w-6 fill-current">
        <path d="M17.5 14.4c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.1-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.2-.7-1.8-1-2.4-.2-.5-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.6s1.1 3 1.3 3.2c.1.2 2 3.2 5 4.4 2.5 1 3 .8 3.5.8.6-.1 1.8-.7 2-1.5.3-.7.3-1.4.2-1.5 0-.1-.2-.2-.5-.3Z" />
        <path d="M12 2.2A9.8 9.8 0 0 0 3.6 17l-1.4 5.1 5.2-1.4A9.8 9.8 0 1 0 12 2.2Zm0 17.8c-1.5 0-3-.4-4.2-1.2l-.3-.2-3.1.8.8-3-.2-.3A8 8 0 1 1 12 20Z" />
      </svg>
      <span className="kicker max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-500 ease-brand group-hover:max-w-40 group-hover:opacity-100">
        WhatsApp
      </span>
    </a>
  );
}
