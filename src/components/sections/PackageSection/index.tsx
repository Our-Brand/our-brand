import { useEffect, useMemo, useState } from "react";
import { ViewportOptions } from "@/types/ui";
import { useLanguage } from "@/hooks/useLanguage";
import { SkeletonCard, PackageCard } from "@/components/ui/card";
import { Package } from "@/types/package";
import { packageService } from "@/services/endpoints/packageService";

type PackageSectionProps = {
  viewport: ViewportOptions;
};

const PackageSection = ({ viewport }: PackageSectionProps) => {
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

  return (
    <section className={`relative overflow-hidden ${spacing.outer}`}>
      {/* Decorative glow */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
      <div className="pointer-events-none absolute top-10 right-10 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-1/3 h-96 w-96 rounded-full bg-indigo-400/10 blur-3xl" />

      <div className="mx-auto w-full max-w-6xl">
        <h2
          className={`mb-10 font-semibold tracking-tight text-white/95 ${spacing.title}`}
        >
          {t("packages.page.title")}
        </h2>

        <div
          className={`grid grid-cols-1 items-stretch ${spacing.gap} md:grid-cols-3`}
        >
          {loading ? (
            <>
              <SkeletonCard />
              <SkeletonCard featured />
              <SkeletonCard />
            </>
          ) : (
            packages.map((pkg) => <PackageCard key={pkg.id} pkg={pkg} t={t} />)
          )}
        </div>
      </div>
    </section>
  );
};

export default PackageSection;
