import { ArrowUpRight } from 'lucide-react';
import { CtaAnchor, Section, SectionHead } from '@/components/sky/ui';
import { wa } from '@/data/sky';
import { canPublishOffer, type RiverExperience } from '@/lib/river.schema';

export function RiverModalities({ experience, preview }: { experience: RiverExperience; preview: boolean }) {
  const bookable = experience.content.availability !== 'no_disponible';
  return <Section id="modalidades" tone="cream" className="scroll-mt-24 py-16 md:py-24">
    <SectionHead kicker="Modalidades" title="Dos formas de vivir el río." lead="Un encuentro diferente o una ocasión especial. Elegí cómo querés disfrutarlo." />
    <div className="mt-14 space-y-16 md:mt-20 md:space-y-24">
      {experience.content.modalities.map((modality, index) => {
        if (experience.hiddenOfferIds?.includes(modality.id)) return null;
        const offer = experience.offers.find(o => o.id === modality.id);
        if (preview && offer && !offer.active) return null;
        const terms = offer && (preview || canPublishOffer(offer.active, offer.validated, experience.active)) ? offer.content : null;
        const name = terms?.name ?? modality.name;
        const included = terms ? [
          terms.services.split('\n')[0],
          `${terms.duration}${modality.id === 'business-sunset' ? `, de ${terms.schedule}` : '.'}`,
          ...(terms.capacity ? [`Capacidad para ${terms.capacity}.`] : []),
          ...(modality.id === 'private-moments' ? [terms.schedule] : []),
          ...terms.services.split('\n').slice(1),
        ].filter(Boolean) : modality.included;
        const message = modality.id === 'business-sunset'
          ? `Hola, quiero consultar disponibilidad para ${name} de Sky Stays On The River y organizar un encuentro corporativo.`
          : `Hola, quiero consultar disponibilidad para ${name} de Sky Stays On The River para una celebración o un momento especial.`;
        return <article key={modality.id} aria-labelledby={`${modality.id}-title`} className="grid items-center gap-8 border-t border-border pt-10 md:gap-12 lg:grid-cols-2 lg:gap-16">
          <figure className={`min-w-0 ${index % 2 ? 'lg:order-2' : ''}`}>
            <img src={terms?.photo ?? modality.photo} alt={modality.id === 'business-sunset' ? 'Yate privado Sky Stays navegando por el río Paraguay al atardecer' : 'Un brindis compartido a bordo del yate de Sky Stays'} loading="lazy" className="aspect-[3/4] w-full object-cover md:aspect-[4/5]" />
          </figure>
          <div className="min-w-0 [&_h3]:tracking-normal [&_p]:tracking-normal">
            <p className="text-[11px] font-semibold uppercase leading-5 text-primary-soft">{modality.category}</p>
            <p className="mt-4 text-sm font-semibold text-primary">{name}</p>
            <h3 id={`${modality.id}-title`} className="mt-5 text-3xl leading-tight text-primary md:text-4xl">{modality.headline}</h3>
            <p className="mt-6 text-sm leading-7 text-muted-foreground">{modality.description}</p>
            <p className="mt-5 border-l-2 border-border-strong pl-4 text-xs leading-6 text-primary-soft">{modality.uses.join(' · ')}</p>
            {included.length > 0 && <div className="mt-7">
              <h4 className="font-sans text-xs font-semibold uppercase tracking-normal text-primary">Incluye</h4>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">{included.map((service, i) => <li key={i} className="flex gap-3"><span aria-hidden="true" className="text-primary-soft">—</span><span>{service}</span></li>)}</ul>
            </div>}
            {terms && <div className="mt-6"><p className="text-xl text-primary"><span className="font-display">{terms.fromPrice ? 'Desde ' : ''}{terms.currency} {terms.price.toLocaleString('es-PY')}</span><span className="ml-2 text-xs text-muted-foreground">por experiencia.</span></p>{preview && !offer?.validated && <p className="mt-3 text-sm text-destructive">Pendiente de validación comercial</p>}</div>}
            {bookable ? <CtaAnchor href={wa(message)} target="_blank" rel="noreferrer" className="mt-7 w-full sm:w-auto">Consultar disponibilidad <ArrowUpRight size={16} /></CtaAnchor> : <p className="mt-7 text-sm text-muted-foreground">No disponible por el momento.</p>}
          </div>
        </article>;
      })}
    </div>
  </Section>;
}