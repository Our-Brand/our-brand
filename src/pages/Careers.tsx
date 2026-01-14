import ContactForm from "@/components/ContactForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCareers } from "@/hooks/useCareers";
import { useLanguage } from "@/hooks/useLanguage";
import * as React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const containerStagger: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const popUp: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.985, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: EASE_OUT },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
};

const SkeletonCard = () => (
  <Card className="p-8 h-full bg-card/40 backdrop-blur-sm border border-border/60">
    <CardHeader>
      <div className="h-6 w-2/3 rounded-md bg-muted animate-pulse" />
      <div className="mt-4 space-y-2">
        <div className="h-4 w-full rounded-md bg-muted animate-pulse" />
        <div className="h-4 w-5/6 rounded-md bg-muted animate-pulse" />
      </div>
    </CardHeader>
    <CardFooter className="pt-0">
      <div className="h-4 w-1/2 rounded-md bg-muted animate-pulse" />
    </CardFooter>
  </Card>
);

const Careers = () => {
  const { t } = useLanguage();
  const { careers, loading } = useCareers();
  const prefersReducedMotion = useReducedMotion();

  const handleCareerClick = React.useCallback((link: string) => {
    if (!link) return;

    if (link.startsWith("#")) {
      const el = document.querySelector(link);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    if (/^https?:\/\//i.test(link)) {
      window.open(link, "_blank", "noopener,noreferrer");
      return;
    }

    window.location.assign(link);
  }, []);

  const onCardKeyDown = React.useCallback(
    (e: React.KeyboardEvent, link: string) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleCareerClick(link);
      }
    },
    [handleCareerClick]
  );

  const showSkeletons = loading;
  const skeletonCount = 1;

  return (
    <div className="relative min-h-screen">
      {/* Page heading */}
      <section className="mt-24 pt-24 pb-8 md:pb-12">
        <div className="container mx-auto px-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
              {t("career.title")}
            </h1>
            <p className="mt-2 text-muted-foreground leading-relaxed">
              {t("career.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Open positions */}
      <section id="applications" className="py-8 md:py-12">
        <div className="container mx-auto px-6">
          <motion.div
            variants={fadeUp}
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView={prefersReducedMotion ? undefined : "show"}
            viewport={{ once: false, amount: 0.25 }}
            className="mb-6 md:mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
              {t("career.openPositions")}
            </h2>

            {/* small helper line */}
            {showSkeletons ? (
              <p className="mt-2 text-sm text-muted-foreground">
                {t("loading")}
              </p>
            ) : null}
          </motion.div>

          <motion.div
            variants={containerStagger}
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView={prefersReducedMotion ? undefined : "show"}
            viewport={{ once: false, amount: 0.2 }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8 items-stretch"
          >
            {showSkeletons
              ? Array.from({ length: skeletonCount }).map((_, i) => (
                  <motion.div
                    key={`sk-${i}`}
                    variants={popUp}
                    className="h-full"
                  >
                    <SkeletonCard />
                  </motion.div>
                ))
              : null}

            {!showSkeletons && careers.length > 0
              ? careers.map((career) => (
                  <div key={career.id} className="h-full">
                    <Card
                      role="button"
                      tabIndex={0}
                      onClick={() => handleCareerClick(career.link)}
                      onKeyDown={(e) => onCardKeyDown(e, career.link)}
                      className={[
                        "p-8",
                        "h-full cursor-pointer",
                        "bg-card/70 backdrop-blur-sm",
                        "border border-border/60",
                        "transition-all duration-200",
                        "hover:bg-card/85",
                        "hover:-translate-y-1",
                        "hover:shadow-[0_0_40px_hsl(var(--ring)/0.18)]",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                      ].join(" ")}
                    >
                      <CardHeader>
                        <CardTitle className="text-xl font-semibold tracking-tight">
                          {t(career.title)}
                        </CardTitle>
                        <CardDescription className="mt-2 leading-relaxed">
                          {t(career.description)}
                        </CardDescription>
                      </CardHeader>

                      <CardFooter className="pt-0">
                        <CardDescription className="text-sm">
                          {t(career.type)}{" "}
                          <span className="text-muted-foreground/60">•</span>{" "}
                          {t(career.location)}
                        </CardDescription>
                      </CardFooter>
                    </Card>
                  </div>
                ))
              : null}

            {/* ✅ Empty state (still at least 1 card) */}
            {!showSkeletons && careers.length === 0 ? (
              <motion.div variants={popUp} className="h-full md:col-span-2">
                <Card className="p-8 h-full bg-card/70 backdrop-blur-sm border border-border/60">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold tracking-tight">
                      {t("career.empty.title")}
                    </CardTitle>
                    <CardDescription className="mt-2 leading-relaxed">
                      {t("career.empty.subtitle")}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ) : null}
          </motion.div>
        </div>
      </section>

      {/* Our Brand */}
      <section id="ourBrand" className="py-8 md:py-12">
        <div className="container mx-auto px-6">
          <motion.div
            variants={fadeUp}
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView={prefersReducedMotion ? undefined : "show"}
            viewport={{ once: false, amount: 0.25 }}
            className="mb-8 md:mb-10"
          >
            <div className="flex flex-wrap items-center gap-4">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight">
                {t("career.ourBrand.title")}
              </h2>
              <img
                src="favicon.ico"
                className="h-30 w-auto object-contain md:h-36"
                alt={t("career.ourBrand.logoAlt")}
              />
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight">
                ?
              </h2>
            </div>
          </motion.div>

          <motion.div
            variants={containerStagger}
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView={prefersReducedMotion ? undefined : "show"}
            viewport={{ once: false, amount: 0.2 }}
            className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8"
          >
            {[1, 2, 3].map((i) => (
              <motion.div key={i} variants={popUp}>
                <Card
                  className={[
                    "p-8",
                    "h-full",
                    "bg-card/70 backdrop-blur-sm",
                    "border border-border/60",
                    "transition-all duration-200",
                    "hover:bg-card/85",
                    "hover:-translate-y-1",
                    "hover:shadow-[0_0_40px_hsl(var(--ring)/0.12)]",
                  ].join(" ")}
                >
                  <CardHeader>
                    <CardTitle className="mb-3 font-semibold tracking-tight">
                      {t(`career.ourBrand.reason${i}.title`)}
                    </CardTitle>
                    <CardDescription className="leading-relaxed">
                      {t(`career.ourBrand.reason${i}.description`)}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 mb-12">
        <div className="container mx-auto px-6">
          <motion.div
            variants={popUp}
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView={prefersReducedMotion ? undefined : "show"}
            viewport={{ once: false, amount: 0.25 }}
          >
            <Card
              className={[
                "border border-border/60",
                "bg-card/70 backdrop-blur-sm",
                "shadow-[0_0_60px_hsl(var(--ring)/0.10)]",
                "p-8",
              ].join(" ")}
            >
              <CardHeader>
                <CardTitle className="text-2xl font-semibold tracking-tight">
                  {t("contact.form.title")}
                </CardTitle>
                <CardDescription className="leading-relaxed">
                  {t("contact.form.subtitle")}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
