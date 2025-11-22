import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { useLanguage } from "@/hooks/use-language";
import { Card, CardContent } from "@/components/ui/card";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          navigate("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <>
      <Nav
        shouldHideHome={true}
        shouldHideMission={true}
        shouldHideTeam={true}
        shouldHideCareers={true}
        shouldHideContact={true}
      />

      <div className="relative flex flex-col min-h-[92vh] justify-center items-center bg-background text-foreground overflow-hidden">
        <div className="absolute inset-0 bg-gradient-brand-subtle opacity-70 pointer-events-none" />

        <div className="absolute top-10 left-0 h-[450px] w-[450px] rounded-full bg-primary/30 blur-[120px] animate-pulse-glow pointer-events-none" />

        <div
          className="absolute bottom-10 right-0 h-[450px] w-[450px] rounded-full bg-accent/30 blur-[120px] animate-pulse-glow pointer-events-none"
          style={{ animationDelay: "1s" }}
        />

        <main className="relative z-10 flex items-center justify-center px-4 w-full">
          <Card className="bg-card/80 border-border/60 backdrop-blur-sm shadow-[0_8px_30px_rgb(0,0,0,0.4)] max-w-md w-full">
            <CardContent className="py-10 flex flex-col items-center text-center gap-6">
              <div className="relative inline-flex items-center justify-center">
                <span className="text-7xl md:text-8xl font-semibold tracking-tight text-muted-foreground/40 select-none">
                  404
                </span>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-full bg-card/80 border border-border/60 p-5 shadow-[0_8px_30px_rgb(0,0,0,0.45)] backdrop-blur-sm">
                    <img
                      src="/favicon.ico"
                      className="w-14 h-14 md:w-16 md:h-16 object-contain"
                      alt="Brand symbol"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
                  {t("notFound.title")}
                </h1>
                <p className="text-muted-foreground">
                  {t("notFound.description")}
                </p>
                <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                  <span>{t("notFound.redirecting")}</span>
                  <span className="text-base font-semibold animate-pulse">
                    {countdown}
                  </span>
                  <span>
                    {t("notFound.second")}
                    {countdown === 1 ? "" : "s"}…
                  </span>
                </p>
              </div>

              <a
                href="/"
                className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
              >
                {t("notFound.backToHome")}
              </a>
            </CardContent>
          </Card>
        </main>
      </div>

      <Footer />
    </>
  );
};

export default NotFound;
