import careers from "@/assets/careers/careers.json";
import { Career } from "@/types/career";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const data: Career[] = careers;

export const careerService = {
  list: async (): Promise<Career[]> => {
    await sleep(600);
    return data;
  },
};
