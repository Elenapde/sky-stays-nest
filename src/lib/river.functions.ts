import { createServerFn } from '@tanstack/react-start';
import { createClient } from '@supabase/supabase-js';
import { getRequest, setResponseHeader } from '@tanstack/react-start/server';
import { z } from 'zod';
import { riverContentSchema, riverOfferSchema, type RiverExperience } from './river.schema';
import type { Database } from '@/integrations/supabase/types';

// Constructor is called only inside handlers, with runtime configuration supplied there.
function client(url: string, key: string, token?: string) {
  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    ...(token ? { accessToken: async () => token } : {}),
    global: { fetch: (input, init) => {
      const headers = new Headers(init?.headers);
      if (key.startsWith('sb_') && headers.get('Authorization') === `Bearer ${key}`) headers.delete('Authorization');
      headers.set('apikey', key);
      return fetch(input, { ...init, headers });
    } },
  });
}

export const getRiverExperience = createServerFn({ method: 'GET' }).handler(async (): Promise<RiverExperience | null> => {
  const url = process.env['SUPABASE_URL']; const key = process.env['SUPABASE_PUBLISHABLE_KEY'] ?? process.env['SUPABASE_ANON_KEY'];
  if (!url || !key) throw new Error('No pudimos cargar la experiencia.');
  const db = client(url, key);
  const { data, error } = await db.from('experience_content').select('content, active').eq('slug', 'sky-stays-on-the-river').maybeSingle();
  if (error) throw new Error('No pudimos cargar la experiencia.');
  if (!data) return null;
  const { data: offers, error: offerError } = await db.from('experience_offers').select('id, content, active, validated').eq('experience_slug', 'sky-stays-on-the-river').order('id');
  if (offerError) throw new Error('No pudimos cargar las modalidades.');
  return { content: riverContentSchema.parse(data.content), active: data.active, offers: (offers ?? []).map(o => ({ ...o, content: riverOfferSchema.parse(o.content) })) };
});

export const getRiverAdmin = createServerFn({ method: 'GET' }).handler(async () => {
  setResponseHeader('Cache-Control', 'no-store');
  const { getSessionUser } = await import('./auth.server');
  const user = await getSessionUser();
  if (!user) return { status: 'anonymous' as const, experience: null };
  const token = getRequest().headers.get('x-lovable-identity-token');
  const url = process.env['SUPABASE_URL']; const key = process.env['SUPABASE_PUBLISHABLE_KEY'] ?? process.env['SUPABASE_ANON_KEY'];
  if (!url || !key || !token) throw new Error('No pudimos verificar el acceso.');
  const db = client(url, key, token);
  const { data: permission, error } = await db.from('experience_editors').select('user_id').eq('user_id', user.userId).maybeSingle();
  if (error) throw new Error('No pudimos verificar el acceso.');
  if (!permission) return { status: 'pending' as const, experience: null };
  const { data, error: readError } = await db.from('experience_content').select('content, active').eq('slug', 'sky-stays-on-the-river').single();
  const { data: offers, error: offerError } = await db.from('experience_offers').select('id, content, active, validated').eq('experience_slug', 'sky-stays-on-the-river').order('id');
  if (readError || offerError) throw new Error('No pudimos cargar la edición.');
  return { status: 'editor' as const, experience: { content: riverContentSchema.parse(data.content), active: data.active, offers: (offers ?? []).map(o => ({ ...o, content: riverOfferSchema.parse(o.content) })) } };
});

export const requestRiverAccess = createServerFn({ method: 'POST' }).handler(async () => {
  const { getSessionUser } = await import('./auth.server'); const user = await getSessionUser();
  if (!user) throw new Error('Ingresá desde tu cuenta de Lovable.');
  const token = getRequest().headers.get('x-lovable-identity-token');
  const url = process.env['SUPABASE_URL']; const key = process.env['SUPABASE_PUBLISHABLE_KEY'] ?? process.env['SUPABASE_ANON_KEY'];
  if (!url || !key || !token) throw new Error('No pudimos verificar el acceso.');
  const db = client(url, key, token);
  const { data: existing } = await db.from('experience_access_requests').select('user_id').eq('user_id', user.userId).maybeSingle();
  if (!existing) { const { error } = await db.from('experience_access_requests').insert({ user_id: user.userId }); if (error) throw new Error('No pudimos registrar tu solicitud.'); }
  return { ok: true };
});

export const saveRiverExperience = createServerFn({ method: 'POST' })
  .inputValidator((input: unknown) => z.object({ content: riverContentSchema, active: z.boolean(), offers: z.array(z.object({ id: z.enum(['business-sunset', 'private-moments']), content: riverOfferSchema, active: z.boolean(), validated: z.boolean() })).length(2) }).parse(input))
  .handler(async ({ data }) => {
    setResponseHeader('Cache-Control', 'no-store');
    const { getSessionUser } = await import('./auth.server'); const user = await getSessionUser();
    if (!user) throw new Error('Acceso no autorizado.');
    const token = getRequest().headers.get('x-lovable-identity-token');
    const url = process.env['SUPABASE_URL']; const key = process.env['SUPABASE_PUBLISHABLE_KEY'] ?? process.env['SUPABASE_ANON_KEY'];
    if (!url || !key || !token) throw new Error('Acceso no autorizado.');
    const db = client(url, key, token);
    const { data: editor, error: permissionError } = await db.from('experience_editors').select('user_id').eq('user_id', user.userId).maybeSingle();
    if (permissionError || !editor) throw new Error('Acceso no autorizado.');
    const { error } = await db.rpc('save_river_content', { payload: data });
    if (error) throw new Error('No pudimos guardar los cambios.');
    return { ok: true };
  });