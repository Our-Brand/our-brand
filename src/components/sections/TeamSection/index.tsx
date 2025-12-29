import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { fadeUp, stagger, hoverLift } from "@/lib/motion";
import type { ViewportOptions } from "@/types/ui";
import { teamService } from "@/services/endpoints/teamService";
import { useLanguage } from "@/hooks/useLanguage";
import { Users } from "lucide-react";
import type { TeamMember } from "@/types/team";

type TeamSectionProps = {
  viewport: ViewportOptions;
};

const TeamSection = ({ viewport }: TeamSectionProps) => {
  const { t } = useLanguage();
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    teamService
      .getTeam()
      .then((res) => {
        if (!alive) return;
        setTeam(res);
      })
      .finally(() => alive && setLoading(false));

    return () => {
      alive = false;
    };
  }, []);

  return (
    <section id="team" className="py-24 bg-muted/20">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-brand bg-clip-text text-transparent"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          Meet Our Team
        </motion.h2>

        {loading ? (
          <p className="text-center text-muted-foreground">Loading...</p>
        ) : (
          <motion.div
            className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
          >
            {team.map((member) => (
              <motion.div
                key={member.id}
                variants={fadeUp}
                {...hoverLift}
                className="h-full"
              >
                <Card className="bg-card border-border shadow-[0_8px_30px_rgb(0,0,0,0.4)] hover:shadow-[0_8px_40px_hsl(220,90%,55%,0.3)] transition-all duration-300 hover:-translate-y-2 h-full flex flex-col">
                  <CardHeader className="text-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border border-border shadow-md">
                      {member.avatarUrl ? (
                        <img
                          src={member.avatarUrl}
                          alt={t(member.name)}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-full bg-gradient-brand mx-auto mb-4 flex items-center justify-center">
                          <Users className="w-12 h-12 text-primary-foreground" />
                        </div>
                      )}
                    </div>

                    <CardTitle className="text-xl">{t(member.name)}</CardTitle>

                    <CardDescription className="text-primary">
                      {t(member.role)}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex-1">
                    <p className="text-center text-muted-foreground">
                      {t(member.bio)}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default TeamSection;
