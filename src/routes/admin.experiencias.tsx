import { createFileRoute } from '@tanstack/react-router';
import { getRiverAdmin } from '@/lib/river.functions';
import { RiverAccess, RiverAdmin } from '@/components/river/RiverAdmin';
const title = 'Administración de experiencias | Sky Stays';
const description = 'Edición autorizada de Sky Stays On The River para el equipo de Sky Stays.';
export const Route = createFileRoute('/admin/experiencias')({
  loader: () => getRiverAdmin(),
  head: () => ({meta:[{title},{name:'description',content:description},{property:'og:title',content:title},{property:'og:description',content:description},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary'},{name:'robots',content:'noindex,nofollow'}]}),
  component: AdminPage,
});
function AdminPage() { const data=Route.useLoaderData(); return data.status === 'editor' && data.experience ? <RiverAdmin initial={data.experience} /> : <RiverAccess status={data.status === 'anonymous' ? 'anonymous' : 'pending'} />; }