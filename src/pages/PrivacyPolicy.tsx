import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useLanguage } from "@/state/LanguageProvider";


const PrivacyPolicy = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <Card className="bg-card border-border shadow-[0_8px_30px_rgb(0,0,0,0.4)] max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-4xl bg-gradient-brand bg-clip-text text-transparent">
              {t("privacy.title")}
            </CardTitle>
            <p className="text-muted-foreground mt-2">{t("privacy.lastUpdated")} {new Date().getUTCFullYear()}</p>
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
