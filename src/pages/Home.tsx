import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

import HeroSection from "@/components/sections/HeroSection";
import TeamSection from "@/components/sections/TeamSection";
import PackageSection from "@/components/sections/PackageSection";
import ContextSection from "@/components/sections/ContextSection";
import ClientsSection from "@/components/sections/ClientsSection";
import ContactSection from "@/components/sections/ContactSection";
import { useIsMobile } from "@/hooks/useMobile";

type SectionId =
  | "hero"
  | "packages"
  | "context"
  | "team"
  | "clients"
  | "contact";

function useActiveSection(sectionIds: SectionId[], enabled = true) {
  const [active, setActive] = useState<SectionId>(sectionIds[0]);

  useEffect(() => {
    if (!enabled) return;

    const els = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!els.length) return;

    const getClosestToCenter = () => {
      const centerY = window.innerHeight / 2;

      let bestId = sectionIds[0];
      let bestDist = Number.POSITIVE_INFINITY;

      for (const el of els) {
        const rect = el.getBoundingClientRect();
        const elCenter = rect.top + rect.height / 2;
        const dist = Math.abs(elCenter - centerY);

        if (dist < bestDist) {
          bestDist = dist;
          bestId = el.id as SectionId;
        }
      }

      setActive(bestId);
    };

    getClosestToCenter();

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(getClosestToCenter);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [enabled, sectionIds]);

  return active;
}

const sectionBase =
  "relative transition-all duration-500 ease-out will-change-transform";

const Home = () => {
  const viewport = useMemo(() => ({ once: true, amount: 0.2 }), []);
  const isMobile = useIsMobile();
  const { hash } = useLocation();

  const sections = useMemo<SectionId[]>(
    () => ["hero", "packages", "context", "team", "clients", "contact"],
    [],
  );

  const animationsEnabled = !isMobile && !hash;

  const active = useActiveSection(sections, animationsEnabled);

  useEffect(() => {
    if (!hash) return;
    const id = hash.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "auto" });
  }, [hash]);

  const sectionClass = (id: SectionId) => {
    if (!animationsEnabled) return "relative";

    return [
      sectionBase,
      active === id
        ? "opacity-100 blur-0 scale-100 pointer-events-auto"
        : "opacity-25 blur-[2px] scale-[0.985] pointer-events-none",
    ].join(" ");
  };

  return (
    <div className="relative min-h-[100svh] overflow-x-hidden">
      <main>
        <div id="hero" className={sectionClass("hero")}>
          <HeroSection />
        </div>

        <div id="packages" className={sectionClass("packages")}>
          <PackageSection />
        </div>

        <div id="context" className={sectionClass("context")}>
          <ContextSection />
        </div>

        <div id="team" className={sectionClass("team")}>
          <TeamSection viewport={viewport} />
        </div>

        <div id="clients" className={sectionClass("clients")}>
          <ClientsSection viewport={viewport} />
        </div>

        <div id="contact" className={sectionClass("contact")}>
          <ContactSection viewport={viewport} />
        </div>
      </main>
    </div>
  );
};

export default Home;
