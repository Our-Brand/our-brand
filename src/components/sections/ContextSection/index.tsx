import { motion, type Variants } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Brain, Cloud, MessageCircle } from "lucide-react";
import { useIsMobile } from "@/hooks/useMobile";
import { useLanguage } from "@/hooks/useLanguage";
import { StepCard } from "@/components/ui/card";

const container: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.08, duration: 0.35 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.28 } },
};

const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

const li: Variants = {
  hidden: { opacity: 0, x: -8 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.22, ease: "easeOut" as const },
  },
};

const panelIn: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.985 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.28, ease: "easeOut" as const },
  },
};

const panelHover = {
  y: -3,
  scale: 1.01,
};

const ContextSection = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  return (
    <section id="context" className="w-full min-h-[100vh] flex">
      <div className="mx-auto w-full max-w-6xl px-2 py-12 md:px-4 md:py-16 flex-1 flex items-center">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="w-full space-y-10"
        >
          {/* Header */}
          <motion.div variants={item} className="space-y-3">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              {t("context.title")}
            </h2>

            <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
              {t("context.subtitle")}
            </p>
          </motion.div>

          {/* Why / Focus */}
          <motion.div
            variants={item}
            className={`grid gap-8 ${
              isMobile ? "grid-cols-1" : "grid-cols-2"
            } items-stretch`}
          >
            {/* WHY */}
            <motion.div
              variants={panelIn}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.35 }}
              whileHover={panelHover}
              transition={{ duration: 0.22, ease: "easeOut" as const }}
              className="group relative rounded-xl border p-5 shadow-sm h-full overflow-hidden bg-card/80"
            >
              {/* hover overlay (subtle always, stronger on hover) */}
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-muted/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                <div className="absolute inset-0 ring-1 ring-transparent group-hover:ring-primary/20 transition-[box-shadow,ring-color] duration-200" />
              </div>

              <div className="relative">
                <h3 className="text-lg font-semibold md:text-xl">
                  {t("context.why.title")}
                </h3>

                <motion.ul
                  variants={list}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.35 }}
                  className="mt-4 space-y-3 text-sm md:text-base"
                >
                  {["one", "two", "three", "four"].map((k) => (
                    <motion.li
                      key={k}
                      variants={li}
                      whileHover={{ x: 2 }}
                      transition={{ duration: 0.18, ease: "easeOut" as const }}
                      className="flex items-start gap-3"
                    >
                      <motion.span
                        aria-hidden
                        initial={false}
                        whileHover={{ scale: 1.06, rotate: -2 }}
                        transition={{
                          duration: 0.18,
                          ease: "easeOut" as const,
                        }}
                        className="mt-0.5"
                      >
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-muted-foreground" />
                      </motion.span>
                      <span className="leading-relaxed">
                        {t(`context.why.items.${k}`)}
                      </span>
                    </motion.li>
                  ))}
                </motion.ul>

                <div className="mt-6 h-1 w-10 rounded-full bg-muted transition-all duration-200 group-hover:w-16 group-hover:bg-primary/60" />
              </div>
            </motion.div>

            {/* FOCUS */}
            <motion.div
              variants={panelIn}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.35 }}
              whileHover={panelHover}
              transition={{ duration: 0.22, ease: "easeOut" as const }}
              className="group relative rounded-xl border p-5 shadow-sm h-full overflow-hidden bg-card/80"
            >
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-muted/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                <div className="absolute inset-0 ring-1 ring-transparent group-hover:ring-primary/20 transition-[box-shadow,ring-color] duration-200" />
              </div>

              <div className="relative">
                <h3 className="text-lg font-semibold md:text-xl">
                  {t("context.focus.title")}
                </h3>

                <motion.ul
                  variants={list}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.35 }}
                  className="mt-4 space-y-3 text-sm md:text-base"
                >
                  {["one", "two", "three"].map((k) => (
                    <motion.li
                      key={k}
                      variants={li}
                      whileHover={{ x: 2 }}
                      transition={{ duration: 0.18, ease: "easeOut" as const }}
                      className="flex items-start gap-3"
                    >
                      <motion.span
                        aria-hidden
                        initial={false}
                        whileHover={{ scale: 1.06, rotate: -2 }}
                        transition={{
                          duration: 0.18,
                          ease: "easeOut" as const,
                        }}
                        className="mt-0.5"
                      >
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-muted-foreground" />
                      </motion.span>
                      <span className="leading-relaxed">
                        {t(`context.focus.items.${k}`)}
                      </span>
                    </motion.li>
                  ))}
                </motion.ul>

                <div className="mt-6 h-1 w-10 rounded-full bg-muted transition-all duration-200 group-hover:w-16 group-hover:bg-primary/60" />
              </div>
            </motion.div>
          </motion.div>

          <motion.div variants={item}>
            <Separator />
          </motion.div>

          {/* How it works */}
          <motion.div variants={item} className="space-y-5">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold md:text-xl">
                {t("context.how.title")}
              </h3>
              <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
                {t("context.how.subtitle")}
              </p>
            </div>

            <motion.div
              variants={list}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              className={`grid gap-4 ${
                isMobile ? "grid-cols-1" : "grid-cols-3"
              } items-stretch`}
            >
              <motion.div variants={li} className="h-full">
                <StepCard
                  index={1}
                  title={t("context.how.steps.1.title")}
                  description={t("context.how.steps.1.description")}
                  Icon={MessageCircle}
                />
              </motion.div>

              <motion.div variants={li} className="h-full">
                <StepCard
                  index={2}
                  title={t("context.how.steps.2.title")}
                  description={t("context.how.steps.2.description")}
                  Icon={Brain}
                />
              </motion.div>

              <motion.div variants={li} className="h-full">
                <StepCard
                  index={3}
                  title={t("context.how.steps.3.title")}
                  description={t("context.how.steps.3.description")}
                  Icon={Cloud}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContextSection;
