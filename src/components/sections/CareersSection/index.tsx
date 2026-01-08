import { Button } from "@/components/ui/button";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { EASE_OUT } from "@/lib/motion";
import { scrollToSection } from "@/lib/scroll";
import { ViewportOptions } from "@/types/ui";

type CareersSectionProps = {
  viewport: ViewportOptions;
};

const CareersSection = ({ viewport }: CareersSectionProps) => {
  const { t } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="careers" className="py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            viewport={viewport}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-brand bg-clip-text text-transparent">
              {t("join.sectionTitle")}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t("join.text")}
            </p>
          </motion.div>

          <motion.div
            className="flex md:justify-end justify-center"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.05 }}
            viewport={viewport}
          >
            <a
              href="/careers"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Button
                className="w-80 bg-gradient-brand text-primary-foreground hover:opacity-90"
                onClick={() => scrollToSection("contact")}
              >
                {t("join.cta")}
              </Button>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CareersSection;
