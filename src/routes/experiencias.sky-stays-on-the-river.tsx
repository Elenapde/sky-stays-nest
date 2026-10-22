import { createFileRoute, notFound } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { riverQuery } from '@/lib/river.query';
import { RiverExperiencePage } from '@/components/river/RiverExperience';
import { SiteHeader } from '@/components/sky/SiteHeader';
import { SiteFooter } from '@/components/sky/SiteFooter';
import { WhatsAppFab } from '@/components/sky/WhatsAppFab';

export const Route = createFileRoute('/experiencias/sky-stays-on-the-river')({
  loader: async ({ context }) => { const data = await context.queryClient.ensureQueryData(riverQuery); if (!data?.active) throw notFound(); return data; },
  head: ({ loaderData }) => {
    const title = 'Sky Stays On The River | Paseos privados en yate en Asunción';
    const description = loaderData?.content.description ?? 'Paseos privados por el río Paraguay con Sky Stays.';
    const image = loaderData?.content.hero;
    return { meta: [{ title }, { name: 'description', content: description }, { property: 'og:title', content: title }, { property: 'og:description', content: description }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }, ...(!loaderData ? [{ name: 'robots', content: 'noindex' }] : []), ...(image?.startsWith('https://') ? [{ property: 'og:image', content: image }, { name: 'twitter:image', content: image }] : [])] };
  },
  component: RiverPage,
});
function RiverPage() { const { data } = useSuspenseQuery(riverQuery); if (!data) return null; return <div className="min-h-screen bg-background"><SiteHeader /><main><RiverExperiencePage experience={data} /></main><SiteFooter /><WhatsAppFab /></div>; }