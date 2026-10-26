import { ArrowUpRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { CtaAnchor, CtaLink, Section, SectionHead } from '@/components/sky/ui';
import { wa } from '@/data/sky';
import { riverQuery } from '@/lib/river.query';
import type { RiverExperience as Experience } from '@/lib/river.schema';
import riverCover from '@/assets/river-cover.jpg.asset.json';
import { RiverModalities } from './RiverModalities';

export function RiverHomeFeature() {
  const { data } = useQuery(riverQuery);
  if (!data?.active) return null;
  return <section className="relative isolate overflow-hidden bg-carbon text-carbon-foreground">
    <img src={data.content.hero} alt="Yate de Sky Stays sobre el río Paraguay, frente a Asunción" loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover" />
    <div className="absolute inset-0 -z-10 bg-carbon/50" />
    <div className="mx-auto flex min-h-[580px] max-w-[80rem] flex-col justify-end px-6 py-14 md:px-10 md:py-20">
      <p className="kicker text-nude">EXPERIENCIAS · {data.content.name}</p>
      <h2 className="mt-5 max-w-xl text-4xl leading-tight md:text-5xl">{data.content.title}</h2>
      <p className="mt-5 max-w-lg text-sm leading-relaxed text-carbon-foreground/90">{data.content.description}</p>
      <CtaLink to="/experiencias/sky-stays-on-the-river" variant="nude" className="mt-8 self-start">Descubrir la experiencia <ArrowUpRight size={16} /></CtaLink>
    </div>
  </section>;
}

export function RiverNav({ mobile = false, footer = false }: { mobile?: boolean; footer?: boolean }) {
  const { data } = useQuery(riverQuery);
  if (!data?.active) return null;
  if (footer) return <nav aria-label="Experiencias"><p className="kicker text-nude/45">Experiencias</p><CtaLink to="/experiencias/sky-stays-on-the-river" variant="linkLight" size="bare" className="mt-4 text-sm normal-case">Sky Stays On The River</CtaLink></nav>;
  return <CtaLink to="/experiencias/sky-stays-on-the-river" variant="linkLight" size="bare" title="Sky Stays On The River" className={mobile ? 'kicker justify-start text-nude' : 'kicker px-3 py-3 text-nude/85'}>Experiencias</CtaLink>;
}

function RiverHero({ experience }: { experience: Experience }) {
  const { content } = experience;
  return <section className="river-hero relative isolate overflow-hidden bg-carbon text-carbon-foreground">
    <img src={riverCover.url} alt="Yate privado Sky Stays navegando frente a Asunción al atardecer" className="absolute inset-0 -z-30 h-full w-full object-cover" fetchPriority="high" />
    <div className="absolute inset-0 -z-10 bg-carbon/50" />
    <div className="mx-auto flex h-full max-w-[80rem] flex-col justify-end px-6 pt-32 pb-16 md:px-10 md:pb-20">
      <p className="kicker text-nude">Experiencias · Sky Stays On The River</p>
      <p className="mt-6 max-w-xl font-display text-xl text-nude md:text-2xl">{content.name}</p>
      <h1 className="mt-4 max-w-3xl text-4xl leading-[1.08] md:text-7xl">{content.title}</h1>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-carbon-foreground/85 md:text-base">{content.description}</p>
      <CtaAnchor href="#modalidades" variant="nude" className="mt-8 self-start">Descubrir las modalidades <ArrowUpRight size={16} /></CtaAnchor>
    </div>
  </section>;
}

export function RiverExperiencePage({ experience, preview = false }: { experience: Experience; preview?: boolean }) {
  const { content, offers } = experience;
  const business = offers.find(o => o.id === 'business-sunset');
  const privateOffer = offers.find(o => o.id === 'private-moments');
  const bookable = content.availability !== 'no_disponible';
  return <>
    <RiverHero experience={experience} />
    <section className="border-b border-border bg-secondary px-6 py-9 md:px-10">
      <dl className="mx-auto grid max-w-[80rem] gap-7 md:grid-cols-3">
        <div><dt className="kicker text-primary-soft">Duración</dt><dd className="mt-3 font-display text-xl text-primary">{business || privateOffer ? [business?.content.duration, privateOffer?.content.duration].filter(Boolean).join(' · ') : 'De 2 a 4 hs'}</dd></div>
        <div><dt className="kicker text-primary-soft">Capacidad</dt><dd className="mt-3 font-display text-xl text-primary">{business ? `${business.content.capacity} · Business Sunset` : 'Hasta 6 personas'}</dd></div>
        <div><dt className="kicker text-primary-soft">A bordo</dt><dd className="mt-3 font-display text-xl text-primary">Capitán, gastronomía y bebidas</dd></div>
      </dl>
    </section>
    <Section className="py-16 md:py-24">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <SectionHead kicker="La experiencia" title={content.editorialTitle} />
        <p className="max-w-lg text-sm leading-7 text-muted-foreground">{content.editorialText}</p>
      </div>
      <div className="mt-12 grid gap-5 md:grid-cols-[1.35fr_1fr]">
        {content.gallery.slice(0, 2).map((photo, i) => <figure key={photo} className={i === 0 ? 'md:pt-0' : 'md:pt-16'}><img src={photo} alt={i === 0 ? 'Momentos compartidos a bordo del yate' : 'Yate Sky Stays sobre el río Paraguay'} loading="lazy" className="aspect-[4/3] w-full object-cover" /><figcaption className="mt-4 text-sm text-muted-foreground">{i === 0 ? 'Un momento para compartir.' : 'La ciudad queda atrás. El río te espera.'}</figcaption></figure>)}
      </div>
    </Section>
    <RiverModalities experience={experience} preview={preview} />
    {content.gallery[2] && <section className="bg-carbon"><img src={content.gallery[2]} alt="El río Paraguay al atardecer desde el yate de Sky Stays" loading="lazy" className="max-h-[620px] w-full object-cover" /></section>}
    <Section tone="burgundy" className="text-center">
      <p className="kicker text-nude">Sky Stays On The River</p><h2 className="mt-5 text-3xl md:text-4xl">Tu próximo plan, sobre el río.</h2>
      {bookable && <CtaAnchor href={wa('Hola, quiero organizar un paseo privado con Sky Stays On The River.')} target="_blank" rel="noreferrer" variant="nude" className="mt-8">Consultar por WhatsApp <ArrowUpRight size={16} /></CtaAnchor>}
    </Section>
  </>;
}