import { TeamMember } from "@/types/team";
import team from "@/assets/team/team.json";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const data: TeamMember[] = team;

export const teamService = {
  list: async (): Promise<TeamMember[]> => {
    await sleep(600);
    return data;
  },
};
