import { createFileRoute } from "@tanstack/react-router";

import {
  AsuncionGuide,
  Backing,
  CorporateLongStay,
  DayStay,
  DirectBooking,
  ExperienceSection,
  FeaturedProperties,
  FinalCta,
  Hero,
  Locations,
  Reviews,
  RoomsAndSuites,
  WhatIsSkyStays,
  YourTrip,
} from "@/components/home/HomeSections";
import { SiteFooter } from "@/components/sky/SiteFooter";
import { SiteHeader } from "@/components/sky/SiteHeader";
import { WhatsAppFab } from "@/components/sky/WhatsAppFab";

const title = "Sky Stays | Hospedaje temporal en Asunción con servicio hotelero";
const description =
  "Departamentos equipados en Asunción con servicios hoteleros, check-in digital y atención 24/7. Reservá directo tu estadía en Villa Morra, Ycuá Satí o Recoleta.";

export const Route = createFileRoute("/")({
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
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Hero />
        <CorporateLongStay />
        <WhatIsSkyStays />
        <YourTrip />
        <RoomsAndSuites />
        <FeaturedProperties />
        <ExperienceSection />
        <Locations />
        <DayStay />
        <Reviews />
        <DirectBooking />
        <AsuncionGuide />
        <Backing />
        <FinalCta />
      </main>
      <SiteFooter />
      <WhatsAppFab />
    </div>
  );
}
