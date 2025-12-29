import logo from "@/assets/images/logo.png";
import { Button } from "@/components/ui/button";
import { motion, useReducedMotion } from "framer-motion";

import { useLanguage } from "@/hooks/useLanguage";
import { fadeUp, EASE_OUT } from "@/lib/motion";
import { scrollToSection } from "@/lib/scroll";

const HeroSection = () => {
  const { t } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      <div className="absolute inset-0 bg-gradient-brand-subtle opacity-70" />

      <motion.div
        className="absolute top-0 left-0 h-[600px] w-[600px] rounded-full bg-primary/30 blur-[120px]"
        animate={prefersReducedMotion ? {} : { x: [0, 20, 0], y: [0, 10, 0] }}
        transition={
          prefersReducedMotion
            ? {}
            : { duration: 8, repeat: Infinity, ease: EASE_OUT }
        }
      />

      <motion.div
        className="absolute bottom-0 right-0 h-[600px] w-[600px] rounded-full bg-accent/30 blur-[120px]"
        animate={prefersReducedMotion ? {} : { x: [0, -20, 0], y: [0, -10, 0] }}
        transition={
          prefersReducedMotion
            ? {}
            : { duration: 9, repeat: Infinity, ease: EASE_OUT, delay: 0.6 }
        }
      />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          className="mb-12 inline-block"
          initial={
            prefersReducedMotion ? false : { opacity: 0, y: 18, scale: 0.98 }
          }
          animate={prefersReducedMotion ? {} : { opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
        >
          <motion.img
            src={logo}
            alt={t("hero.logoAlt")}
            width={400}
            height={400}
            className="object-contain drop-shadow-glow mx-auto"
            animate={prefersReducedMotion ? {} : { y: [0, -10, 0] }}
            transition={
              prefersReducedMotion
                ? {}
                : { duration: 4.5, repeat: Infinity, ease: EASE_OUT }
            }
          />
        </motion.div>

        <motion.h1
          className="mb-6 text-5xl md:text-7xl font-bold tracking-tight"
          initial="hidden"
          animate="show"
          variants={fadeUp}
        >
          <span className="bg-gradient-brand bg-clip-text text-transparent">
            {t("hero.title")}
          </span>
        </motion.h1>

        <motion.p
          className="mb-8 max-w-2xl mx-auto text-xl text-foreground/80 leading-relaxed"
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
              h-9 px-4 rounded-md font-medium
              bg-gradient-brand text-primary-foreground
              hover:opacity-90 transition-opacity shadow-lg text-lg px-8 py-6"
          >
            {t("hero.getStarted")}
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
