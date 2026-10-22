/// <reference types="bun" />
import { describe, expect, test } from 'bun:test';
import { canEditExperience, canPublishOffer, riverOfferSchema } from './river.schema';
import { riverInitial } from '@/data/river-initial';

const business = riverInitial.offers.find(o => o.id === 'business-sunset')?.content;
const privateMoments = riverInitial.offers.find(o => o.id === 'private-moments')?.content;
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