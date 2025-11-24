import { useLanguage } from "@/hooks/use-language";
import logo from "@/assets/images/logo.png";

const ComingSoon = () => {
  const { t } = useLanguage();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-brand-subtle opacity-70" />
      <div className="absolute top-0 left-0 h-[600px] w-[600px] rounded-full bg-primary/30 blur-[120px] animate-pulse-glow" />
      <div
        className="absolute bottom-0 right-0 h-[600px] w-[600px] rounded-full bg-accent/30 blur-[120px] animate-pulse-glow"
        style={{ animationDelay: "1s" }}
      />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="mb-12 animate-float inline-block">
          <img
            src={logo}
            alt={t("hero.logoAlt")}
            width={400}
            height={400}
            className="object-contain drop-shadow-glow mx-auto"
          />
        </div>

        <h1 className="mb-6 text-5xl md:text-7xl font-bold tracking-tight">
          <span className="bg-gradient-brand bg-clip-text text-transparent">
            {t("comingSoon.title")}
          </span>
        </h1>

        <p className="mb-8 max-w-2xl mx-auto text-xl text-foreground/80 leading-relaxed">
          {t("comingSoon.description")}
        </p>
      </div>
    </section>
  );
};

export default ComingSoon;
