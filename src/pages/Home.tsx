import { useMemo } from "react";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

import HeroSection from "@/components/sections/HeroSection";
import TeamSection from "@/components/sections/TeamSection";
import PackageSection from "@/components/sections/PackageSection";
import ContextSection from "@/components/sections/ContextSection";
import ClientsSection from "@/components/sections/ClientsSection";
import ContactSection from "@/components/sections/ContactSection";

const Home = () => {
  const viewport = useMemo(() => ({ once: true, amount: 0.2 }), []);

  return (
    <div className="relative min-h-[100svh] overflow-x-hidden">
      <Nav />

      <main>
        <HeroSection />
        <PackageSection />
        <ContextSection />
        <TeamSection viewport={viewport} />
        <ClientsSection viewport={viewport} />
        <ContactSection viewport={viewport} />
        <Footer />
      </main>
    </div>
  );
};

export default Home;
