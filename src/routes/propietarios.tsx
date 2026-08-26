import { createFileRoute } from "@tanstack/react-router";

import {
  OwnersCta,
  OwnersFaq,
  OwnersForm,
  OwnersHero,
  OwnersLines,
  OwnersPetra,
  OwnersProcess,
  
  OwnersService,
  OwnersValue,
} from "@/components/owners/OwnersSections";
import { SiteFooter } from "@/components/sky/SiteFooter";
import { SiteHeader } from "@/components/sky/SiteHeader";
import { WhatsAppFab } from "@/components/sky/WhatsAppFab";

const title = "Propietarios | Administramos tu departamento en Asunción — Sky Stays";
const description =
  "Sumá tu departamento a Sky Stays: operación hotelera, huéspedes gestionados 24/7, limpieza, mantenimiento y reporte mensual. Pedí una evaluación de renta sin costo.";

export const Route = createFileRoute("/propietarios")({
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
  component: OwnersPage,
});

function OwnersPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <OwnersHero />
        <OwnersValue />
        <OwnersService />
        <OwnersLines />
        <OwnersProcess />
        <OwnersPetra />

        <OwnersForm />
        <OwnersFaq />
        <OwnersCta />
      </main>
      <SiteFooter />
      <WhatsAppFab />
    </div>
  );
}
