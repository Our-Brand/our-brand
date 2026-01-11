import { useMemo } from "react";

import Nav from "@/components/Nav";
// import Footer from "@/components/Footer";

import HeroSection from "@/components/sections/HeroSection";
// import MissionSection from "@/components/sections/MissionSection";
// import ClientsSection from "@/components/sections/ClientsSection";
// import TeamSection from "@/components/sections/TeamSection";
// import ContactSection from "@/components/sections/ContactSection";
import PackageSection from "@/components/sections/PackageSection";
import ContextSection from "@/components/sections/ContextSection";

const Home = () => {
  const viewport = useMemo(() => ({ once: true, amount: 0.2 }), []);

  return (
    <div className="relative min-h-[100svh] overflow-x-hidden">
      <Nav />

      <main>
        <HeroSection />
        <PackageSection viewport={viewport} />
        <ContextSection viewport={viewport} />
      </main>
    </div>
  );
};

export default Home;
