import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCareers } from "@/hooks/use-careers";
import { useLanguage } from "@/hooks/use-language";

const Careers = () => {
  const { t } = useLanguage();
  const { careers } = useCareers();

  const handleCareerClick = (link: string) => {
    if (!link) return;

    if (link.startsWith("#")) {
      const el = document.querySelector(link);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      return;
    }

    window.location.href = link;
  };

  return (
    <div className="relative min-h-screen bg-background">
      <Nav
        shouldHideHome={true}
        shouldHideMission={true}
        shouldHideTeam={true}
        shouldHideCareers={true}
        shouldHideContact={true}
      />

      {/* Page heading section (title + subtitle) */}
      <section className="pt-24 md:pt-24 pb-8 md:pb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            {t("career.title")}
          </h1>
          <p className="mt-2 text-muted-foreground">{t("career.subtitle")}</p>
        </div>
      </section>

      {/* Open positions / applications section */}
      <section id="applications" className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
              {t("career.openPositions")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {careers.map((career) => (
              <Card
                key={career.id}
                className="h-full border-border/60 bg-card/80 backdrop-blur-sm cursor-pointer hover:bg-accent/30 transition-colors"
                onClick={() => handleCareerClick(career.link)}
              >
                <CardHeader>
                  <CardTitle className="text-xl">{t(career.title)}</CardTitle>
                  <CardDescription className="mt-2">
                    {t(career.description)}
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <CardDescription>
                    {t(career.type)} | {t(career.location)}
                  </CardDescription>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Brand section */}
      <section id="ourBrand" className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 md:mb-10 ">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight flex items-center gap-4">
              {t("career.ourBrand.title")}
              <img
                src="favicon.ico"
                className="w-40 lg:w-50 object-contain"
                alt="brand"
              />
              ?
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[1, 2, 3].map((i) => (
              <Card
                key={i}
                className="h-full border-border/60 bg-card/80 backdrop-blur-sm hover:bg-accent/30 transition-colors"
              >
                <CardHeader>
                  <CardTitle className="mb-4">
                    {t(`career.ourBrand.reason${i}.title`)}
                  </CardTitle>
                  <CardDescription>
                    {t(`career.ourBrand.reason${i}.description`)}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact section */}
      <section id="contact" className="py-24">
        <div className="container mx-auto px-4">
          <Card className="bg-card border-border shadow-[0_8px_30px_rgb(0,0,0,0.4)]">
            <CardHeader>
              <CardTitle className="text-2xl">
                {t("contact.form.title")}
              </CardTitle>
              <CardDescription>{t("contact.form.subtitle")}</CardDescription>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Careers;
