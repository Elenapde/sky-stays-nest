/**
 * Datos públicos de Guesty, seguros para el navegador (sin credenciales).
 */

/** URL base del booking engine de Sky Stays en Guesty. Cambiar por la real. */
export const GUESTY_BOOKING_BASE_URL = "https://skystays.guestybookings.com";

export type Listing = {
  id: string;
  name: string;
  category: string | null;
  building: string | null;
  zone: string | null;
  guests: number;
  bedrooms: number;
  beds: number;
  amenities: string[];
  price: number | null;
  currency: string;
  photos: string[];
};

export type StayParams = { checkIn?: string | undefined; checkOut?: string | undefined; guests?: number | undefined };

export function bookingUrl(id: string, p: StayParams = {}) {
  const url = new URL(`/properties/${encodeURIComponent(id)}`, GUESTY_BOOKING_BASE_URL);
  if (p.checkIn && p.checkOut) {
    url.searchParams.set("checkIn", p.checkIn);
    url.searchParams.set("checkOut", p.checkOut);
    if (p.guests) url.searchParams.set("minOccupancy", String(p.guests));
  }
  return url.toString();
}

export function formatPrice(price: number | null, currency: string) {
  if (price == null) return null;
  const symbol = currency === "USD" ? "US$" : currency === "PYG" ? "Gs." : currency;
  return `${symbol} ${Math.round(price).toLocaleString("es-PY")}`;
}
