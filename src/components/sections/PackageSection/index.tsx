import { useEffect, useMemo, useState, useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

import { ViewportOptions } from "@/types/ui";
import { useLanguage } from "@/hooks/useLanguage";
import { SkeletonCard, PackageCard } from "@/components/ui/card";
import { Package } from "@/types/package";
import { packageService } from "@/services/endpoints/packageService";

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 36, // start lower
    scale: 0.98, // tiny scale-in
    filter: "blur(6px)",
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: EASE_OUT,
    },
  },
};

const titleVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE_OUT },
  },
};

const PackageSection = () => {
  const { t } = useLanguage();

  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let alive = true;

    packageService
      .list()
      .then((res) => {
        if (!alive) return;
        setPackages(res);
      })
      .finally(() => alive && setLoading(false));

    return () => {
      alive = false;
    };
  }, []);

  const spacing = useMemo(() => {
    return {
      outer: "px-6 py-16",
      title: "text-4xl",
      gap: "gap-8",
    };
  }, []);

  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, {
    once: false,
    margin: "-15% 0px -15% 0px",
  });

  return (
    <section
      id="packages"
      ref={ref}
      className={`relative overflow-hidden min-h-screen flex items-center ${spacing.outer}`}
    >
      <div className="mx-auto w-full max-w-6xl">
        <motion.h2
          variants={titleVariants}
          initial={false}
          animate={isInView ? "show" : "hidden"}
          className={`mb-10 font-semibold tracking-tight text-white/95 ${spacing.title}`}
        >
          {t("packages.page.title")}
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial={false}
          animate={isInView ? "show" : "hidden"}
          className={`grid grid-cols-1 items-stretch ${spacing.gap} md:grid-cols-3`}
        >
          {loading ? (
            <>
              <motion.div variants={cardVariants}>
                <SkeletonCard />
              </motion.div>
              <motion.div variants={cardVariants}>
                <SkeletonCard featured />
              </motion.div>
              <motion.div variants={cardVariants}>
                <SkeletonCard />
              </motion.div>
            </>
          ) : (
            packages.map((pkg) => (
              <motion.div key={pkg.id} variants={cardVariants}>
                <PackageCard pkg={pkg} t={t} />
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default PackageSection;
