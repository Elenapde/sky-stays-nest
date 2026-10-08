import { createServerFn } from "@tanstack/react-start";

const DATE = /^\d{4}-\d{2}-\d{2}$/;

export const getListings = createServerFn({ method: "GET" }).handler(async () => {
  const { cachedListings } = await import("./guesty.server");
  return cachedListings();
});

export const searchListings = createServerFn({ method: "GET" })
  .validator((d: { checkIn: string; checkOut: string; guests: number; tag?: string | undefined }) => {
    if (!DATE.test(d.checkIn) || !DATE.test(d.checkOut)) throw new Error("Fechas inválidas");
    if (d.checkOut <= d.checkIn) throw new Error("El check-out debe ser posterior al check-in");
    const guests = Math.max(1, Math.min(20, Math.floor(Number(d.guests) || 1)));
    return { checkIn: d.checkIn, checkOut: d.checkOut, guests, tag: d.tag?.slice(0, 60) };
  })
  .handler(async ({ data }) => {
    const { cachedSearch } = await import("./guesty.server");
    return cachedSearch({
      checkIn: data.checkIn,
      checkOut: data.checkOut,
      minOccupancy: String(data.guests),
      tags: data.tag,
    });
  });

export const getListing = createServerFn({ method: "GET" })
  .validator((d: { id: string }) => {
    if (!/^[A-Za-z0-9_-]{1,64}$/.test(d.id)) throw new Error("ID inválido");
    return d;
  })
  .handler(async ({ data }) => {
    const { fetchListing } = await import("./guesty.server");
    return fetchListing(data.id);
  });
