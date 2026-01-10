import { useMemo } from "react";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

import HeroSection from "@/components/sections/HeroSection";
import MissionSection from "@/components/sections/MissionSection";
import ClientsSection from "@/components/sections/ClientsSection";
import TeamSection from "@/components/sections/TeamSection";
import CareersSection from "@/components/sections/CareersSection";
import ContactSection from "@/components/sections/ContactSection";
import PackageSection from "@/components/sections/PackageSection";
import ContextSection from "@/components/sections/ContextSection";

const Home = () => {
  const viewport = useMemo(() => ({ once: true, amount: 0.2 }), []);

  return (
    <div
      className="
        relative
        min-h-[100svh]
        bg-background
        overflow-x-hidden
      "
    >
      <Nav />

      {/* If Nav is fixed, this prevents content being hidden behind it */}
      <main>
        <HeroSection />
        <PackageSection viewport={viewport} />
        <ContextSection viewport={viewport} />
        {/* <MissionSection viewport={viewport} /> */}
        {/* <ClientsSection viewport={viewport} /> */}
        {/* <TeamSection viewport={viewport} /> */}
        {/* <CareersSection viewport={viewport} /> */}
        {/* <ContactSection viewport={viewport} /> */}
        {/* <Footer /> */}
      </main>
    </div>
  );
};

export default Home;
