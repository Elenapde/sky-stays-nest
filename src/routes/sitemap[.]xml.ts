import { createFileRoute } from "@tanstack/react-router";

const paths = ["/", "/alojamientos", "/corporate-long-stay", "/guia-de-asuncion"];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const origin = "https://sky-stays.com";
        const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `  <url><loc>${origin}${p}</loc><changefreq>weekly</changefreq></url>`).join("\n")}
</urlset>`;
        return new Response(body, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
