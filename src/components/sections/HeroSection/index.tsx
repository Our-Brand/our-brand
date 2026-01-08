import logo from "@/assets/images/logo.png";
import { Button } from "@/components/ui/button";
import { motion, useReducedMotion } from "framer-motion";

import { useLanguage } from "@/hooks/useLanguage";
import { fadeUp, EASE_OUT } from "@/lib/motion";
import { scrollToSection } from "@/lib/scroll";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      <div className="relative z-10 container mx-auto px-4 text-start flex flex-col gap-8">
        <motion.h1
          className="text-5xl md:text-7xl font-bold tracking-tight"
          initial="hidden"
          animate="show"
          variants={fadeUp}
        >
          <span className="text-foreground/80 bg-clip-text">
            {t("hero.title")}
          </span>
        </motion.h1>

        <motion.p
          className="max-w-2xl text-xl text-foreground/80 leading-relaxed"
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ delay: 0.08, ease: EASE_OUT }}
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ delay: 0.16, ease: EASE_OUT }}
        >
          <Button
            onClick={() => scrollToSection("contact")}
            className="inline-flex items-center justify-center
                  h-10 px-6 rounded-full
                  text-base font-semibold
                  text-foreground
                  bg-white/5
                  border border-white/15
                  backdrop-blur
                  transition-all duration-200 ease-out
                  hover:bg-white/10
                  hover:-translate-y-[1px]
                  hover:shadow-lg
                  active:translate-y-0
                  whitespace-nowrap"
          >
            {t("hero.getStarted")}
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
