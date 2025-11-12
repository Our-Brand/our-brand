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

const PrivacyPolicy = () => {
  const [language] = useState<Lang>("pt");
  const t = (key: keyof Messages | string) =>
    (translations[language] as Record<string, string>)[key as string] ?? (key as string);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <Link to="/">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("privacy.backToHome")}
          </Button>
        </Link>

        <Card className="bg-card border-border shadow-[0_8px_30px_rgb(0,0,0,0.4)] max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-4xl bg-gradient-brand bg-clip-text text-transparent">
              {t("privacy.title")}
            </CardTitle>
            <p className="text-muted-foreground mt-2">{t("privacy.lastUpdated")}</p>
          </CardHeader>

          <CardContent className="prose prose-invert max-w-none">
            <div className="space-y-6 text-foreground/80">
              {/* Section 1 */}
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-3">
                  {t("privacy.section1.title")}
                </h2>
                <p>{t("privacy.section1.p1")}</p>
                <ul className="list-disc pl-6 space-y-2 mt-3">
                  <li>{t("privacy.section1.li1")}</li>
                  <li>{t("privacy.section1.li2")}</li>
                  <li>{t("privacy.section1.li3")}</li>
                  <li>{t("privacy.section1.li4")}</li>
                </ul>
              </section>

              {/* Section 2 */}
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-3">
                  {t("privacy.section2.title")}
                </h2>
                <p>{t("privacy.section2.intro")}</p>
                <ul className="list-disc pl-6 space-y-2 mt-3">
                  <li>{t("privacy.section2.li1")}</li>
                  <li>{t("privacy.section2.li2")}</li>
                  <li>{t("privacy.section2.li3")}</li>
                  <li>{t("privacy.section2.li4")}</li>
                  <li>{t("privacy.section2.li5")}</li>
                </ul>
              </section>

              {/* Section 3 */}
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-3">
                  {t("privacy.section3.title")}
                </h2>
                <p>{t("privacy.section3.p1")}</p>
                <ul className="list-disc pl-6 space-y-2 mt-3">
                  <li>{t("privacy.section3.li1")}</li>
                  <li>{t("privacy.section3.li2")}</li>
                  <li>{t("privacy.section3.li3")}</li>
                  <li>{t("privacy.section3.li4")}</li>
                </ul>
              </section>

              {/* Section 4 */}
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-3">
                  {t("privacy.section4.title")}
                </h2>
                <p>{t("privacy.section4.p1")}</p>
              </section>

              {/* Section 5 */}
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-3">
                  {t("privacy.section5.title")}
                </h2>
                <p>{t("privacy.section5.p1")}</p>
                <ul className="list-disc pl-6 space-y-2 mt-3">
                  <li>{t("privacy.section5.li1")}</li>
                  <li>{t("privacy.section5.li2")}</li>
                  <li>{t("privacy.section5.li3")}</li>
                  <li>{t("privacy.section5.li4")}</li>
                  <li>{t("privacy.section5.li5")}</li>
                </ul>
              </section>

              {/* Section 6 */}
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-3">
                  {t("privacy.section6.title")}
                </h2>
                <p>
                  {t("privacy.section6.p1")}
                  <br />
                  <span className="text-primary">{t("privacy.section6.email")}</span>
                </p>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
