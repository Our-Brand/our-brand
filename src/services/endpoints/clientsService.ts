import { Client } from "@/types/client";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const data: Client[] = [
  {
    id: "1",
    title: "Stripe",
    companyImg: "https://stripe.com/favicon.ico",
    companyUrl: "https://stripe.com",
    description:
      "Payment infrastructure for the internet — enabling businesses to accept and manage online payments.",
  },
  {
    id: "2",
    title: "Shopify",
    companyImg: "https://www.shopify.com/favicon.ico",
    companyUrl: "https://www.shopify.com",
    description:
      "An e-commerce platform that lets businesses create online stores, manage products, and sell globally.",
  },
  {
    id: "3",
    title: "Notion",
    companyImg: "https://www.notion.so/favicon.ico",
    companyUrl: "https://www.notion.so",
    description:
      "A workspace for notes, docs, wikis, and project management — all-in-one collaboration platform.",
  },
  {
    id: "4",
    title: "GitHub",
    companyImg: "https://github.com/favicon.ico",
    companyUrl: "https://github.com",
    description:
      "A platform for hosting code, collaborating with teams, and managing software development workflows.",
  },
  {
    id: "5",
    title: "Airbnb",
    companyImg: "https://www.airbnb.com/favicon.ico",
    companyUrl: "https://www.airbnb.com",
    description:
      "A marketplace for booking unique stays and experiences hosted by people around the world.",
  },
];

export const clientsService = {
  list: async (): Promise<Client[]> => {
    await sleep(600);
    return data;
  },
};
