import logo from "@/assets/images/logo.png";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Users, Target, Heart } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useMemo } from "react";

import { useLanguage } from "@/hooks/use-language";

import ContactForm from "@/components/ContactForm";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const hoverLift = {
  whileHover: { y: -8, transition: { duration: 0.2 } },
  whileTap: { scale: 0.98 },
};

const Home = () => {
  const { t } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  const viewport = useMemo(() => ({ once: true, amount: 0.2 }), []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  const team = Array.from({ length: 5 }, (_, index) => ({
    name: t(`team.member${index + 1}.name`),
    role: t(`team.member${index + 1}.role`),
    bio: t(`team.member${index + 1}.bio`),
  }));

  return (
    <div className="relative min-h-screen bg-background">
      {/* Navigation */}
      <Nav />

      {/* Hero Section */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      >
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-brand-subtle opacity-70" />

        <motion.div
          className="absolute top-0 left-0 h-[600px] w-[600px] rounded-full bg-primary/30 blur-[120px]"
          animate={prefersReducedMotion ? {} : { x: [0, 20, 0], y: [0, 10, 0] }}
          transition={
            prefersReducedMotion
              ? {}
              : { duration: 8, repeat: Infinity, ease: EASE_OUT }
          }
        />

        <motion.div
          className="absolute bottom-0 right-0 h-[600px] w-[600px] rounded-full bg-accent/30 blur-[120px]"
          animate={
            prefersReducedMotion ? {} : { x: [0, -20, 0], y: [0, -10, 0] }
          }
          transition={
            prefersReducedMotion
              ? {}
              : { duration: 9, repeat: Infinity, ease: EASE_OUT, delay: 0.6 }
          }
        />

        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            className="mb-12 inline-block"
            initial={
              prefersReducedMotion ? false : { opacity: 0, y: 18, scale: 0.98 }
            }
            animate={prefersReducedMotion ? {} : { opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
          >
            <motion.img
              src={logo}
              alt={t("hero.logoAlt")}
              width={400}
              height={400}
              className="object-contain drop-shadow-glow mx-auto"
              animate={prefersReducedMotion ? {} : { y: [0, -10, 0] }}
              transition={
                prefersReducedMotion
                  ? {}
                  : { duration: 4.5, repeat: Infinity, ease: EASE_OUT }
              }
            />
          </motion.div>

          <motion.h1
            className="mb-6 text-5xl md:text-7xl font-bold tracking-tight"
            initial="hidden"
            animate="show"
            variants={fadeUp}
          >
            <span className="bg-gradient-brand bg-clip-text text-transparent">
              {t("hero.title")}
            </span>
          </motion.h1>

          <motion.p
            className="mb-8 max-w-2xl mx-auto text-xl text-foreground/80 leading-relaxed"
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ delay: 0.08, ease: EASE_OUT }}
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ delay: 0.16, ease: EASE_OUT }}
          >
            <Button
              onClick={() => scrollToSection("contact")}
              className=" inline-flex items-center justify-center
              h-9 px-4
              rounded-md  font-medium
              bg-gradient-brand text-primary-foreground
              hover:opacity-90 transition-opacity shadow-lg text-lg px-8 py-6"
            >
              {t("hero.getStarted")}
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section id="mission" className="py-24 relative">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-brand bg-clip-text text-transparent"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
          >
            {t("mission.sectionTitle")}
          </motion.h2>

          <motion.div
            className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto items-stretch"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
          >
            <motion.div variants={fadeUp} {...hoverLift} className="h-full">
              <Card className="bg-card border-border shadow-[0_8px_30px_rgb(0,0,0,0.4)] hover:shadow-[0_8px_40px_hsl(190,90%,55%,0.3)] transition-shadow duration-300 h-full flex flex-col">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gradient-brand flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-2xl">
                    {t("mission.cardTitle")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-muted-foreground leading-relaxed">
                    {t("mission.text")}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeUp} {...hoverLift} className="h-full">
              <Card className="bg-card border-border shadow-[0_8px_30px_rgb(0,0,0,0.4)] hover:shadow-[0_8px_40px_hsl(270,80%,60%,0.3)] transition-shadow duration-300 h-full flex flex-col">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gradient-brand flex items-center justify-center mb-4">
                    <Heart className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-2xl">
                    {t("values.cardTitle")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
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
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-24 bg-muted/20">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-brand bg-clip-text text-transparent"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
          >
            {t("team.sectionTitle")}
          </motion.h2>

          <motion.div
            className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto items-stretch"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
          >
            {team.map((member, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                {...hoverLift}
                className="h-full"
              >
                <Card className="bg-card border-border shadow-[0_8px_30px_rgb(0,0,0,0.4)] hover:shadow-[0_8px_40px_hsl(220,90%,55%,0.3)] transition-all duration-300 hover:-translate-y-2 h-full flex flex-col">
                  <CardHeader className="text-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-brand mx-auto mb-4 flex items-center justify-center">
                      <Users className="w-12 h-12 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-xl">{member.name}</CardTitle>
                    <CardDescription className="text-primary">
                      {member.role}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-center text-muted-foreground">
                      {member.bio}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Join us */}
      <section id="careers" className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_OUT }}
              viewport={viewport}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-brand bg-clip-text text-transparent">
                {t("join.sectionTitle")}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("join.text")}
              </p>
            </motion.div>

            <motion.div
              className="flex md:justify-end justify-center"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.05 }}
              viewport={viewport}
            >
              <a
                href="/careers"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Button
                  className="w-80 bg-gradient-brand text-primary-foreground hover:opacity-90"
                  onClick={() => scrollToSection("contact")}
                >
                  {t("join.cta")}
                </Button>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-brand bg-clip-text text-transparent"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
          >
            {t("contact.sectionTitle")}
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto items-stretch">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, x: -24 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: EASE_OUT }}
              viewport={viewport}
              className="h-full"
            >
              <Card className="bg-card border-border shadow-[0_8px_30px_rgb(0,0,0,0.4)] h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="text-2xl">
                    {t("contact.form.title")}
                  </CardTitle>
                  <CardDescription>
                    {t("contact.form.subtitle")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ContactForm />
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, x: 24 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: EASE_OUT }}
              viewport={viewport}
              className="h-full"
            >
              <Card className="bg-card border-border shadow-[0_8px_30px_rgb(0,0,0,0.4)] h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="text-2xl">
                    {t("contact.info.title")}
                  </CardTitle>
                  <CardDescription>
                    {t("contact.info.subtitle")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 flex-1">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{t("contact.info.email")}</p>
                      <p className="text-muted-foreground">
                        geral@our-brand.pt
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <p className="font-medium">{t("contact.info.phone")}</p>
                      <p className="text-muted-foreground">(+351) XXXXXXXXX</p>
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
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
