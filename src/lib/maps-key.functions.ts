import { createServerFn } from "@tanstack/react-start";

/** Clave de navegador de Google Maps propia (restringida a sky-stays.com). */
export const getCustomMapsKey = createServerFn().handler(async () => {
  return process.env["GOOGLE_API_KEY"] ?? null;
});
