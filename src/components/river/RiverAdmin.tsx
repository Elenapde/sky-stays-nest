import { useState } from 'react';
import { useServerFn } from '@tanstack/react-start';
import { useQueryClient } from '@tanstack/react-query';
import { Save, Eye, Pencil } from 'lucide-react';
import { Cta, CtaLink } from '@/components/sky/ui';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { saveRiverExperience, requestRiverAccess } from '@/lib/river.functions';
import type { RiverExperience } from '@/lib/river.schema';
import { RiverExperiencePage } from './RiverExperience';
import hero from '@/assets/river-17.jpg.asset.json';
import toast from '@/assets/river-20.jpg.asset.json';
import boat from '@/assets/river-4.jpg.asset.json';
import sunset from '@/assets/river-3-2.jpg.asset.json';
import bow from '@/assets/river-5.jpg.asset.json';
import reel from '@/assets/river-reel.mp4.asset.json';

const photos = [hero, toast, boat, sunset, bow];
function Field({ label, value, onChange, multiline = false, number = false }: { label: string; value: string; onChange: (v: string) => void; multiline?: boolean; number?: boolean }) {
  return <label className="grid gap-2 text-sm text-foreground"><span>{label}</span>{multiline ? <Textarea value={value} onChange={e => onChange(e.target.value)} rows={3} /> : <Input type={number ? 'number' : 'text'} value={value} onChange={e => onChange(e.target.value)} />}</label>;
}
function PhotoPicker({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return <div className="space-y-3"><Field label={label} value={value} onChange={onChange} /><div className="flex flex-wrap gap-2">{photos.map((p,i) => <Cta key={p.url} size="bare" variant="outline" aria-label={`${label}: foto ${i+1}`} aria-pressed={value === p.url} onClick={() => onChange(p.url)} className={`h-16 w-24 overflow-hidden ${value === p.url ? 'ring-2 ring-ring ring-offset-2' : ''}`}><img src={p.url} alt={`Foto del yate ${i+1}`} className="h-full w-full object-cover" /></Cta>)}</div></div>;
}
export function RiverAccess({ status }: { status: 'anonymous' | 'pending' }) {
  const request = useServerFn(requestRiverAccess); const [message,setMessage] = useState(''); const [busy,setBusy] = useState(false);
  return <main className="mx-auto max-w-2xl px-6 py-32"><p className="kicker text-primary-soft">Administración · Experiencias</p><h1 className="mt-5 text-3xl text-primary">{status === 'anonymous' ? 'Acceso del equipo de Sky Stays' : 'Tu acceso está pendiente'}</h1><p className="mt-5 text-sm leading-7 text-muted-foreground">{status === 'anonymous' ? 'Abrí esta página desde tu cuenta de Lovable. Solo los integrantes autorizados pueden editar la experiencia.' : 'La edición necesita autorización. Podés registrar tu solicitud para que se habilite tu cuenta.'}</p>{status === 'pending' && <Cta className="mt-6" disabled={busy} onClick={async () => {setBusy(true); try { await request(); setMessage('Solicitud registrada. Avisá al responsable del sitio para habilitar tu cuenta.'); } catch { setMessage('No pudimos registrar la solicitud.'); } finally { setBusy(false); } }}>Solicitar acceso</Cta>}<p role="status" className="mt-5 text-sm">{message}</p><CtaLink to="/" variant="link" size="bare" className="mt-8">Volver al sitio</CtaLink></main>;
}

export function RiverAdmin({ initial }: { initial: RiverExperience }) {
  const [draft,setDraft] = useState(initial); const [preview,setPreview] = useState(false); const [saving,setSaving] = useState(false); const [message,setMessage] = useState('');
  const save = useServerFn(saveRiverExperience); const cache = useQueryClient();
  const content = (key: keyof RiverExperience['content'], value: unknown) => setDraft(d => ({ ...d, content: { ...d.content, [key]: value } }));
  const offer = (index: number, key: string, value: unknown) => setDraft(d => ({ ...d, offers: d.offers.map((o,i) => i === index ? { ...o, content: { ...o.content, [key]: value } } : o) }));
  return <div className="bg-background">
    <header className="sticky top-0 z-50 flex flex-wrap items-center justify-between gap-4 border-b border-border bg-background px-6 py-4">
      <CtaLink to="/" variant="link" size="bare">Sky Stays</CtaLink><div className="flex gap-3"><Cta variant="outline" size="sm" onClick={() => setPreview(v => !v)}>{preview ? <Pencil size={16} /> : <Eye size={16} />}{preview ? 'Editar' : 'Vista previa'}</Cta><Cta size="sm" disabled={saving} onClick={async () => { setSaving(true); setMessage(''); try { await save({ data: draft }); await cache.invalidateQueries({queryKey:['river-experience']}); setMessage('Cambios guardados.'); } catch(e) {setMessage(e instanceof Error ? e.message : 'No pudimos guardar.');} finally {setSaving(false);} }}><Save size={16} />{saving ? 'Guardando' : 'Guardar'}</Cta></div>
    </header>
    <p role="status" className="px-6 pt-4 text-sm text-primary">{message}</p>
    {preview ? <RiverExperiencePage experience={draft} preview /> : <main className="mx-auto max-w-5xl px-6 py-10">
      <p className="kicker text-primary-soft">Administración · Experiencias</p><h1 className="mt-4 text-3xl text-primary">Sky Stays On The River</h1>
      <div className="mt-8 flex flex-wrap items-center gap-4 border-y border-border py-5"><Switch id="river-active" checked={draft.active} onCheckedChange={v => setDraft(d => ({...d,active:v}))} /><label htmlFor="river-active" className="text-sm">Experiencia activa en el sitio</label></div>
      <section className="mt-10 space-y-6"><h2 className="text-2xl text-primary">Presentación</h2>
        <Field label="Nombre" value={draft.content.name} onChange={v=>content('name',v)} /><Field label="Título principal" value={draft.content.title} onChange={v=>content('title',v)} /><Field label="Descripción" value={draft.content.description} onChange={v=>content('description',v)} multiline />
        <PhotoPicker label="Foto principal" value={draft.content.hero} onChange={v=>content('hero',v)} />
        <Field label="Video del yate" value={draft.content.video} onChange={v=>content('video',v)} /><Cta variant="link" size="bare" onClick={()=>content('video',reel.url)}>Usar video recibido</Cta>
        <label className="grid gap-2 text-sm">Disponibilidad comercial<select className="h-10 rounded-xs border border-input bg-background px-3" value={draft.content.availability} onChange={e=>content('availability',e.target.value)}><option value="consultar">Consultar con el equipo</option><option value="disponible">Disponible para consultas</option><option value="no_disponible">No disponible por el momento</option></select></label>
      </section>
      <section className="mt-12 space-y-6 border-t border-border pt-10"><h2 className="text-2xl text-primary">La experiencia</h2><Field label="Título editorial" value={draft.content.editorialTitle} onChange={v=>content('editorialTitle',v)} /><Field label="Texto editorial" value={draft.content.editorialText} onChange={v=>content('editorialText',v)} multiline />{draft.content.gallery.map((p,i)=><PhotoPicker key={i} label={`Foto editorial ${i+1}`} value={p} onChange={v=>content('gallery',draft.content.gallery.map((old,j)=>i===j?v:old))} />)}</section>
      <section className="mt-12 border-t border-border pt-10"><h2 className="text-2xl text-primary">Modalidades</h2><p className="mt-3 text-sm text-muted-foreground">Los precios y condiciones solo aparecen al público cuando la modalidad está activa y validada comercialmente.</p><div className="mt-8 grid gap-8 md:grid-cols-2">{draft.offers.map((o,i)=><article key={o.id} className="space-y-5 rounded-xs border border-border bg-card p-6"><h3 className="text-xl text-primary">{o.content.name}</h3><div className="flex items-center gap-3"><Switch id={`${o.id}-active`} checked={o.active} onCheckedChange={v=>setDraft(d=>({...d,offers:d.offers.map((old,j)=>i===j?{...old,active:v}:old)}))} /><label htmlFor={`${o.id}-active`} className="text-sm">Modalidad activa</label></div><div className="flex items-center gap-3"><Switch id={`${o.id}-validated`} checked={o.validated} onCheckedChange={v=>setDraft(d=>({...d,offers:d.offers.map((old,j)=>i===j?{...old,validated:v}:old)}))} /><label htmlFor={`${o.id}-validated`} className="text-sm">Validado comercialmente</label></div>
        {draft.content.modalities.filter(m=>m.id===o.id).map(m=>{
          const update = (key: string, value: unknown) => content('modalities', draft.content.modalities.map(old=>old.id===m.id?{...old,[key]:value}:old));
          return <div key={m.id} className="space-y-5 border-y border-border py-5"><Field label="Nombre público" value={m.name} onChange={v=>update('name',v)} /><Field label="Categoría" value={m.category} onChange={v=>update('category',v)} /><Field label="Titular de la experiencia" value={m.headline} onChange={v=>update('headline',v)} multiline /><Field label="Descripción editorial" value={m.description} onChange={v=>update('description',v)} multiline /><Field label="Usos (uno por línea)" value={m.uses.join('\n')} onChange={v=>update('uses',v.split('\n').filter(Boolean))} multiline /><PhotoPicker label="Foto editorial de modalidad" value={m.photo} onChange={v=>update('photo',v)} /></div>;
        })}
        <Field label="Nombre de modalidad" value={o.content.name} onChange={v=>offer(i,'name',v)} /><Field label="Descripción breve" value={o.content.subtitle} onChange={v=>offer(i,'subtitle',v)} /><Field label="Precio USD" value={String(o.content.price)} number onChange={v=>offer(i,'price',Number(v))} /><div className="flex items-center gap-3"><Switch id={`${o.id}-from`} checked={o.content.fromPrice} onCheckedChange={v=>offer(i,'fromPrice',v)} /><label htmlFor={`${o.id}-from`} className="text-sm">Mostrar “Desde”</label></div><Field label="Duración" value={o.content.duration} onChange={v=>offer(i,'duration',v)} /><Field label="Capacidad (opcional)" value={o.content.capacity} onChange={v=>offer(i,'capacity',v)} /><Field label="Horario" value={o.content.schedule} onChange={v=>offer(i,'schedule',v)} /><Field label="Servicios incluidos (uno por línea)" value={o.content.services} onChange={v=>offer(i,'services',v)} multiline /><PhotoPicker label="Foto de modalidad" value={o.content.photo} onChange={v=>offer(i,'photo',v)} />
      </article>)}</div></section>
    </main>}
  </div>;
}