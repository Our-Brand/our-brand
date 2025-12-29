import { useMemo } from "react";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

import HeroSection from "@/components/sections/HeroSection";
import MissionSection from "@/components/sections/MissionSection";
import ClientsSection from "@/components/sections/ClientsSection";
import TeamSection from "@/components/sections/TeamSection";
import CareersSection from "@/components/sections/CareersSection";
import ContactSection from "@/components/sections/ContactSection";

const Home = () => {
  const viewport = useMemo(() => ({ once: true, amount: 0.2 }), []);

  return (
    <div className="relative min-h-screen bg-background">
      <Nav />

      <HeroSection />
      <MissionSection viewport={viewport} />
      <ClientsSection viewport={viewport} />
      <TeamSection viewport={viewport} />
      <CareersSection viewport={viewport} />
      <ContactSection viewport={viewport} />

      <Footer />
    </div>
  );
};

export default Home;
