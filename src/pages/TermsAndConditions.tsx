import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

import enTranslations from "@/assets/locales/translations.en.json";
import ptTranslations from "@/assets/locales/translations.pt.json";

type Lang = "en" | "pt";
type Messages = typeof enTranslations;
const translations: Record<Lang, Messages> = { en: enTranslations, pt: ptTranslations };

const TermsAndConditions = () => {
  const [language] = useState<Lang>("pt");
  const t = (key: string) => (translations[language] as Record<string, string>)[key] ?? key;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <Link to="/">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("terms.backToHome")}
          </Button>
        </Link>

        <Card className="bg-card border-border shadow-[0_8px_30px_rgb(0,0,0,0.4)] max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-4xl bg-gradient-brand bg-clip-text text-transparent">
              {t("terms.title")}
            </CardTitle>
            <p className="text-muted-foreground mt-2">{t("terms.lastUpdated")}</p>
          </CardHeader>

          <CardContent className="prose prose-invert max-w-none">
            <div className="space-y-6 text-foreground/80">
              {/* 1 */}
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-3">
                  {t("terms.section1.title")}
                </h2>
                <p>{t("terms.section1.p1")}</p>
              </section>

              {/* 2 */}
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-3">
                  {t("terms.section2.title")}
                </h2>
                <p>{t("terms.section2.p1")}</p>
                <ul className="list-disc pl-6 space-y-2 mt-3">
                  <li>{t("terms.section2.li1")}</li>
                  <li>{t("terms.section2.li2")}</li>
                  <li>{t("terms.section2.li3")}</li>
                  <li>{t("terms.section2.li4")}</li>
                  <li>{t("terms.section2.li5")}</li>
                </ul>
              </section>

              {/* 3 */}
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-3">
                  {t("terms.section3.title")}
                </h2>
                <p>{t("terms.section3.p1")}</p>
                <p className="mt-3">{t("terms.section3.p2")}</p>
              </section>

              {/* 4 */}
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-3">
                  {t("terms.section4.title")}
                </h2>
                <p>{t("terms.section4.p1")}</p>
              </section>

              {/* 5 */}
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-3">
                  {t("terms.section5.title")}
                </h2>
                <p>{t("terms.section5.p1")}</p>
                <ul className="list-disc pl-6 space-y-2 mt-3">
                  <li>{t("terms.section5.li1")}</li>
                  <li>{t("terms.section5.li2")}</li>
                  <li>{t("terms.section5.li3")}</li>
                  <li>{t("terms.section5.li4")}</li>
                  <li>{t("terms.section5.li5")}</li>
                  <li>{t("terms.section5.li6")}</li>
                </ul>
              </section>

              {/* 6 */}
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-3">
                  {t("terms.section6.title")}
                </h2>
                <p>{t("terms.section6.p1")}</p>
              </section>

              {/* 7 */}
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-3">
                  {t("terms.section7.title")}
                </h2>
                <p>{t("terms.section7.p1")}</p>
              </section>

              {/* 8 */}
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-3">
                  {t("terms.section8.title")}
                </h2>
                <p>{t("terms.section8.p1")}</p>
              </section>

              {/* 9 */}
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-3">
                  {t("terms.section9.title")}
                </h2>
                <p>{t("terms.section9.p1")}</p>
              </section>

              {/* 10 */}
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-3">
                  {t("terms.section10.title")}
                </h2>
                <p>
                  {t("terms.section10.p1")}
                  <br />
                  <span className="text-primary">{t("terms.section10.email")}</span>
                </p>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TermsAndConditions;
