import { useEffect, useState } from "react";
import { teamService } from "@/services/endpoints/teamService";
import type { TeamMember } from "@/types/team";

export const useTeam = () => {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    setLoading(true);

    teamService
      .list()
      .then((res) => {
        if (!alive) return;
        setTeam(res);
      })
      .finally(() => {
        if (!alive) return;
        setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, []);

  return { team, loading };
};
