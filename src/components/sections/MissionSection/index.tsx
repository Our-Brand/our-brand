import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Target } from "lucide-react";
import { motion } from "framer-motion";

import { useLanguage } from "@/hooks/useLanguage";
import { fadeUp, stagger, hoverLift } from "@/lib/motion";
import { ViewportOptions } from "@/types/ui";

type MissionSectionProps = {
  viewport: ViewportOptions;
};

const MissionSection = ({ viewport }: MissionSectionProps) => {
  const { t } = useLanguage();

  return (
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
  );
};

export default MissionSection;
