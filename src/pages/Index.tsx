import logo from "@/assets/images/logo.png";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Users, Target, Heart, Globe, Linkedin } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useLanguage } from "@/state/LanguageProvider";


const Index = () => {
  const { setLanguage, t } = useLanguage();

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          {/* Left: logo */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <img src={logo} alt={t("hero.logoAlt")} className="h-16 w-16 object-contain" />
          </div>

          {/* Center: nav links */}
          <div className="hidden md:flex gap-8 items-center flex-none">
            <button onClick={() => scrollToSection("hero")} className="text-foreground/80 hover:text-primary transition-colors">
              {t("nav.home")}
            </button>
            <button onClick={() => scrollToSection("mission")} className="text-foreground/80 hover:text-primary transition-colors">
              {t("nav.mission")}
            </button>
            <button onClick={() => scrollToSection("team")} className="text-foreground/80 hover:text-primary transition-colors">
              {t("nav.team")}
            </button>
            <button onClick={() => scrollToSection("contact")} className="text-foreground/80 hover:text-primary transition-colors">
              {t("nav.contact")}
            </button>
          </div>

          {/* Right: controls */}
          <div className="flex items-center gap-4 justify-end flex-1 min-w-0">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Globe className="h-4 w-4" />
                  <span className="hidden sm:inline">{t("lang.current")}</span>
                  <span className="sm:hidden">{t("lang.short")}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-popover border-border">
                <DropdownMenuItem onClick={() => setLanguage("en")} className="cursor-pointer hover:bg-accent">
                  {t("lang.en")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("pt")} className="cursor-pointer hover:bg-accent">
                  {t("lang.pt")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <a
              href="https://calendly.com/your-link"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-brand text-primary-foreground px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity shadow-lg"
            >
              {t("cta.bookCall")}
            </a>
          </div>
        </div>
      </nav>


      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-brand-subtle opacity-70" />
        <div className="absolute top-0 left-0 h-[600px] w-[600px] rounded-full bg-primary/30 blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-0 right-0 h-[600px] w-[600px] rounded-full bg-accent/30 blur-[120px] animate-pulse-glow" style={{ animationDelay: "1s" }} />

        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="mb-12 animate-float inline-block">
            <img src={logo} alt={t("hero.logoAlt")} width={400} height={400} className="object-contain drop-shadow-glow mx-auto" />
          </div>

          <h1 className="mb-6 text-5xl md:text-7xl font-bold tracking-tight">
            <span className="bg-gradient-brand bg-clip-text text-transparent">{t("hero.title")}</span>
          </h1>

          <p className="mb-8 max-w-2xl mx-auto text-xl text-foreground/80 leading-relaxed">{t("hero.subtitle")}</p>

          <Button onClick={() => scrollToSection("contact")} className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6">
            {t("hero.getStarted")}
          </Button>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section id="mission" className="py-24 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-brand bg-clip-text text-transparent">{t("mission.sectionTitle")}</h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="bg-card border-border shadow-[0_8px_30px_rgb(0,0,0,0.4)] hover:shadow-[0_8px_40px_hsl(190,90%,55%,0.3)] transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-brand flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl">{t("mission.cardTitle")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{t("mission.text")}</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border shadow-[0_8px_30px_rgb(0,0,0,0.4)] hover:shadow-[0_8px_40px_hsl(270,80%,60%,0.3)] transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-brand flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl">{t("values.cardTitle")}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>{t("values.item1")}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary mr-2">•</span>
                    <span>{t("values.item2")}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span>{t("values.item3")}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>{t("values.item4")}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-24 bg-muted/20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-brand bg-clip-text text-transparent">{t("team.sectionTitle")}</h2>

          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: t("team.member1.name"),
                role: t("team.member1.role"),
                bio: t("team.member1.bio")
              },
              {
                name: t("team.member2.name"),
                role: t("team.member2.role"),
                bio: t("team.member2.bio")
              },
              {
                name: t("team.member3.name"),
                role: t("team.member3.role"),
                bio: t("team.member3.bio")
              },
              {
                name: t("team.member4.name"),
                role: t("team.member4.role"),
                bio: t("team.member4.bio")
              }
            ].map((member, index) => (
              <Card
                key={index}
                className="bg-card border-border shadow-[0_8px_30px_rgb(0,0,0,0.4)] hover:shadow-[0_8px_40px_hsl(220,90%,55%,0.3)] transition-all duration-300 hover:-translate-y-2"
              >
                <CardHeader className="text-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-brand mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-12 h-12 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription className="text-primary">{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">{member.bio}</p>
                  <div className="flex justify-center mt-4">
                    <a href="#" className="text-primary hover:text-primary/80 transition-colors" aria-label="LinkedIn">
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-brand bg-clip-text text-transparent">{t("contact.sectionTitle")}</h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="bg-card border-border shadow-[0_8px_30px_rgb(0,0,0,0.4)]">
              <CardHeader>
                <CardTitle className="text-2xl">{t("contact.form.title")}</CardTitle>
                <CardDescription>{t("contact.form.subtitle")}</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="name">{t("contact.form.nameLabel")}</Label>
                    <Input id="name" placeholder={t("contact.form.namePlaceholder")} className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="email">{t("contact.form.emailLabel")}</Label>
                    <Input id="email" type="email" placeholder={t("contact.form.emailPlaceholder")} className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="message">{t("contact.form.messageLabel")}</Label>
                    <Textarea id="message" placeholder={t("contact.form.messagePlaceholder")} className="mt-1 min-h-[120px]" />
                  </div>
                  <Button className="w-full bg-gradient-brand text-primary-foreground hover:opacity-90">{t("contact.form.submit")}</Button>
                </form>
              </CardContent>
            </Card>

            <Card className="bg-card border-border shadow-[0_8px_30px_rgb(0,0,0,0.4)]">
              <CardHeader>
                <CardTitle className="text-2xl">{t("contact.info.title")}</CardTitle>
                <CardDescription>{t("contact.info.subtitle")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{t("contact.info.email")}</p>
                    <p className="text-muted-foreground">geral@our-brand.pt</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="font-medium">{t("contact.info.phone")}</p>
                    <p className="text-muted-foreground">(+351) 918220241</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium">{t("contact.info.address")}</p>
                    <p className="text-muted-foreground">
                      {t("contact.info.addressValue")
                        .split("\n")
                        .map((line, i) => (
                          <span key={i}>
                            {line}
                            {i === 0 ? <br /> : null}
                          </span>
                        ))}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/20 border-t border-border py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground">
              &copy; {new Date().getUTCFullYear()} Our Brand. {t("footer.rights")}
            </p>
            <div className="flex gap-6">
              <a href="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors">
                {t("footer.privacy")}
              </a>
              <a href="/terms-and-conditions" className="text-muted-foreground hover:text-primary transition-colors">
                {t("footer.terms")}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
