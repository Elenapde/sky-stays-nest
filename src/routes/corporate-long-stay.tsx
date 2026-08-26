import { createFileRoute } from "@tanstack/react-router";

import {
  CorporateBeneficios,
  CorporateCta,
  CorporateDuraciones,
  CorporateEspacios,
  CorporateHero,
  CorporateModalidades,
} from "@/components/corporate/CorporateSections";
import { SiteFooter } from "@/components/sky/SiteFooter";
import { SiteHeader } from "@/components/sky/SiteHeader";
import { WhatsAppFab } from "@/components/sky/WhatsAppFab";

const title = "Corporate & Long Stay | Estadías prolongadas en Asunción — Sky Stays";
const description =
  "Departamentos equipados en Asunción para empresas y profesionales: Corporate Stay y Long Stay con tarifas especiales desde 7 noches, facturación a empresa, workspace y ubicaciones corporativas.";

export const Route = createFileRoute("/corporate-long-stay")({
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
  component: CorporatePage,
});

function CorporatePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <CorporateHero />
        <CorporateModalidades />
        <CorporateDuraciones />
        <CorporateBeneficios />
        <CorporateEspacios />
        <CorporateCta />
      </main>
      <SiteFooter />
      <WhatsAppFab />
    </div>
  );
}
