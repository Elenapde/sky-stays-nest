import { describe, expect, test } from 'bun:test';
import { canEditExperience, canPublishOffer, riverOfferSchema } from './river.schema';

const business = { name: 'SKY BUSINESS SUNSET', subtitle: 'After office privado', price: 850, fromPrice: false, currency: 'USD', duration: '3 horas', capacity: '4 a 6 personas', schedule: '17:00 a 20:00', services: 'Traslado, yate, bebidas y picada', photo: 'https://sky-stays.com/yate.jpg' };
const privateMoments = { ...business, name: 'SKY PRIVATE MOMENTS', price: 850, fromPrice: true, duration: '2 a 4 horas', capacity: '', schedule: 'Horarios flexibles', services: 'Experiencia personalizada, comida y bebidas' };
describe('River commercial terms', () => {
  test('Business Sunset costs USD 850', () => { const v = riverOfferSchema.parse(business); expect([v.price, v.currency, v.fromPrice]).toEqual([850, 'USD', false]); });
  test('Business Sunset lasts three hours', () => expect(riverOfferSchema.parse(business).duration).toBe('3 horas'));
  test('Business Sunset accommodates four to six', () => expect(riverOfferSchema.parse(business).capacity).toBe('4 a 6 personas'));
  test('Business Sunset runs from 17 to 20', () => expect(riverOfferSchema.parse(business).schedule).toBe('17:00 a 20:00'));
  test('Private Moments starts at USD 850', () => { const v = riverOfferSchema.parse(privateMoments); expect([v.price, v.currency, v.fromPrice]).toEqual([850, 'USD', true]); });
  test('Private Moments lasts two to four hours', () => expect(riverOfferSchema.parse(privateMoments).duration).toBe('2 a 4 horas'));
  test('Private Moments has no inferred capacity', () => expect(riverOfferSchema.parse(privateMoments).capacity).toBe(''));
  test('Unvalidated terms cannot publish', () => expect(canPublishOffer(true, false, true)).toBe(false));
  test('Inactive offers cannot publish', () => expect(canPublishOffer(false, true, true)).toBe(false));
  test('Inactive experiences cannot publish offers', () => expect(canPublishOffer(true, true, false)).toBe(false));
  test('Active validated offers can publish', () => expect(canPublishOffer(true, true, true)).toBe(true));
  test('Anonymous visitors cannot edit', () => expect(canEditExperience(null, ['editor-1'])).toBe(false));
  test('Lovable identity without permission cannot edit', () => expect(canEditExperience('visitor', ['editor-1'])).toBe(false));
  test('Authorized verified identity can edit', () => expect(canEditExperience('editor-1', ['editor-1'])).toBe(true));
});