import { z } from 'zod';

const mediaUrl = z.string().refine(v => v.startsWith('/__l5e/assets-v1/') || /^https:\/\//.test(v), 'Usá una imagen o video del sitio.');
export const riverContentSchema = z.object({
  name: z.string().min(1).max(120), title: z.string().min(1).max(160), description: z.string().min(1).max(800),
  editorialTitle: z.string().min(1).max(160), editorialText: z.string().min(1).max(1200),
  hero: mediaUrl, video: mediaUrl, gallery: z.array(mediaUrl).min(1).max(8),
  availability: z.enum(['consultar', 'disponible', 'no_disponible']),
});
export const riverOfferSchema = z.object({
  name: z.string().min(1).max(100), subtitle: z.string().min(1).max(180),
  price: z.number().positive(), fromPrice: z.boolean(), currency: z.literal('USD'),
  duration: z.string().min(1).max(100), capacity: z.string().max(100), schedule: z.string().min(1).max(100),
  services: z.string().min(1).max(500), photo: mediaUrl,
});
export type RiverContent = z.infer<typeof riverContentSchema>;
export type RiverOffer = { id: string; content: z.infer<typeof riverOfferSchema>; active: boolean; validated: boolean };
export type RiverExperience = { content: RiverContent; active: boolean; offers: RiverOffer[] };
export function canPublishOffer(active: boolean, validated: boolean, experienceActive: boolean) { return active && validated && experienceActive; }
export function canEditExperience(verifiedUserId: string | null, editorIds: string[]) { return verifiedUserId !== null && editorIds.includes(verifiedUserId); }