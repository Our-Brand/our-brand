import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { ViewportOptions } from "@/types/ui";
import { teamService } from "@/services/endpoints/teamService";
import { useLanguage } from "@/hooks/useLanguage";
import { useIsMobile } from "@/hooks/useMobile";
import { Users, Sparkles } from "lucide-react";
import type { TeamMember } from "@/types/team";

type TeamSectionProps = {
  viewport: ViewportOptions;
};

const container: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.08, duration: 0.35 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.28 } },
};

const grid: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const cardIn: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.985 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.28, ease: "easeOut" as const },
  },
};

const TeamSection = ({ viewport }: TeamSectionProps) => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();

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
    <section id="team" className="w-full min-h-[100vh] flex">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6 md:py-16 flex-1 flex items-center">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="w-full space-y-10"
        >
          <motion.div variants={item} className="space-y-3 text-center">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              {t("team.title")}
            </h2>
          </motion.div>

          <motion.div variants={item}>
            <Separator />
          </motion.div>

          {loading ? (
            <motion.p
              variants={item}
              className="text-center text-sm text-muted-foreground"
            >
              {t("team.loading")}
            </motion.p>
          ) : (
            <motion.div
              variants={grid}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              className={`grid gap-4 ${
                isMobile ? "grid-cols-1" : "grid-cols-3"
              } items-stretch`}
            >
              {team.map((member) => (
                <motion.div
                  key={member.id}
                  variants={cardIn}
                  className="h-full"
                >
                  <TeamCard member={member} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );

  function TeamCard({ member }: { member: TeamMember }) {
    const hasAvatar = Boolean(member.avatarUrl);

    return (
      <motion.div
        whileHover={{ y: -4, scale: 1.01 }}
        transition={{ duration: 0.22, ease: "easeOut" as const }}
        className="h-full"
      >
        <Card className="group relative h-full overflow-hidden rounded-xl border shadow-sm">
          {/* hover overlay */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-muted/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            <div className="absolute inset-0 ring-1 ring-transparent group-hover:ring-primary/20 transition-[box-shadow,ring-color] duration-200" />
          </div>

          <CardHeader className="relative text-center">
            <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full border bg-background shadow-sm">
              {hasAvatar ? (
                <img
                  src={member.avatarUrl!}
                  alt={t(member.name)}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <Users className="h-10 w-10 text-muted-foreground" />
                </div>
              )}
            </div>

            <CardTitle className="text-base md:text-lg">
              {t(member.name)}
            </CardTitle>

            <CardDescription className="text-sm text-primary">
              {t(member.role)}
            </CardDescription>
          </CardHeader>

          <CardContent className="relative flex h-full flex-col">
            <p className="text-center text-sm text-muted-foreground line-clamp-4">
              {t(member.bio)}
            </p>

            <div className="mt-6 h-1 w-10 self-center rounded-full bg-muted transition-all duration-200 " />
          </CardContent>
        </Card>
      </motion.div>
    );
  }
};

export default TeamSection;
