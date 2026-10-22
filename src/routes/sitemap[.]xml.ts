import { createFileRoute } from "@tanstack/react-router";
import { getRiverExperience } from '@/lib/river.functions';

const paths = ["/", "/alojamientos", "/corporate-long-stay", "/guia-de-asuncion"];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const origin = "https://sky-stays.com";
        const experience = await getRiverExperience().catch(() => null);
        const visiblePaths = experience?.active ? [...paths, '/experiencias/sky-stays-on-the-river'] : paths;
        const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${visiblePaths.map((p) => `  <url><loc>${origin}${p}</loc><changefreq>weekly</changefreq></url>`).join("\n")}
</urlset>`;
        return new Response(body, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
