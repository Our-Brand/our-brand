import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";
import { motion, useReducedMotion, Variants } from "framer-motion";

import { useLanguage } from "@/hooks/useLanguage";
import ContactForm from "@/components/ContactForm";
import { EASE_OUT, fadeUp } from "@/lib/motion";
import { ViewportOptions } from "@/types/ui";
import { Separator } from "@/components/ui/separator";

type ContactSectionProps = {
  viewport: ViewportOptions;
};

const item: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.28 } },
};

const ContactSection = ({ viewport }: ContactSectionProps) => {
  const { t } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="contact" className="py-20 md:py-24">
      {/* Fix: remove px-36, use responsive padding + max width */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <motion.div variants={fadeUp}>
            <motion.h2
              className="text-2xl md:text-3xl font-bold text-center mb-10 bg-clip-text"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
            >
              {t("contact.sectionTitle")}
            </motion.h2>
          </motion.div>

          <motion.div
            variants={item}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
          >
            <Separator />
          </motion.div>

          {/* Fix: better responsive gaps; keep stretch */}
          <div className="grid gap-6 md:gap-8 md:grid-cols-2 mt-10 items-stretch">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, x: -24 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: EASE_OUT }}
              viewport={viewport}
              className="h-full"
            >
              {/* Fix: remove p-8 from Card to avoid double padding */}
              <Card className="bg-card border-border shadow-[0_8px_30px_rgb(0,0,0,0.4)] h-full flex flex-col">
                <CardHeader className="px-6 pt-6">
                  <CardTitle className="text-2xl">
                    {t("contact.form.title")}
                  </CardTitle>
                  <CardDescription>
                    {t("contact.form.subtitle")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-6 pb-6 flex-1">
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
                <CardHeader className="px-6 pt-6">
                  <CardTitle className="text-2xl">
                    {t("contact.info.title")}
                  </CardTitle>
                  <CardDescription>
                    {t("contact.info.subtitle")}
                  </CardDescription>
                </CardHeader>

                <CardContent className="px-6 pb-6 space-y-6 flex-1">
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
                      <p className="text-muted-foreground">(+351) 928360804</p>
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
                              {i < 1 ? <br /> : null}
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
      </div>
    </section>
  );
};

export default ContactSection;
