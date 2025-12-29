import { TeamMember } from "@/types/team";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const data: TeamMember[] = [
  {
    id: "1",
    name: "team.member1.name",
    role: "team.member1.role",
    bio: "team.member1.bio",
  },
  {
    id: "2",
    name: "team.member2.name",
    role: "team.member2.role",
    bio: "team.member2.bio",
  },
  {
    id: "3",
    name: "team.member3.name",
    role: "team.member3.role",
    bio: "team.member3.bio",
  },
  {
    id: "4",
    name: "team.member4.name",
    role: "team.member4.role",
    bio: "team.member4.bio",
  },
];

export const teamService = {
  getTeam: async (): Promise<TeamMember[]> => {
    await sleep(600);
    return data;
  },
};
