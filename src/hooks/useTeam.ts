import { useEffect, useState } from "react";
import { teamService } from "@/services/endpoints/teamService";
import type { TeamMember } from "@/types/team";

export const useTeam = () => {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    teamService
      .list()
      .then((res) => {
        setTeam(res);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { team, loading };
};
