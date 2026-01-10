import { Package } from "@/types/package";
import packages from "@/assets/packages/packages.json";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const data: Package[] = packages;

export const packageService = {
  list: async (): Promise<Package[]> => {
    await sleep(600);
    return data;
  },
};
