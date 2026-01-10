import { Client } from "@/types/client";
import clients from "@/assets/clients/clients.json";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const data: Client[] = clients;

export const clientService = {
  list: async (): Promise<Client[]> => {
    await sleep(600);
    return data;
  },
};
