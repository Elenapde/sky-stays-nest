import { createFileRoute } from "@tanstack/react-router";

import {
  GuideBarrios,
  GuideByTrip,
  GuideCta,
  GuideFeatured,
  GuideHero,
  GuideMap,
  GuideRecomendados,
  GuideZonas,
} from "@/components/guide/GuideSections";
import { SiteFooter } from "@/components/sky/SiteFooter";
import { SiteHeader } from "@/components/sky/SiteHeader";
import { WhatsAppFab } from "@/components/sky/WhatsAppFab";

const title = "Guía de Asunción | Barrios, gastronomía y consejos — Sky Stays";
const description =
  "Guía de Asunción para huéspedes de Sky Stays: barrios (Villa Morra, Ycuá Satí, Recoleta), gastronomía, compras, negocios y consejos prácticos para aprovechar tu estadía.";

export const Route = createFileRoute("/guia-de-asuncion")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GuidePage,
});

function GuidePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <GuideHero />
        <GuideMap />
        <GuideRecomendados />
        <GuideFeatured />
        <GuideBarrios />
        <GuideZonas />
        <GuideByTrip />
        <GuideCta />
      </main>
      <SiteFooter />
      <WhatsAppFab />
    </div>
  );
}
