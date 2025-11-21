import { useEffect, useState } from "react";
import careersData from "@/assets/careers/careers.json";

export type Career = {
  id: number;
  title: string;
  description: string;
  link: string;
  type?: string;
  location?: string;
  requirements?: string;
  extra?: string;
};

export const useCareers = () => {
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setCareers(careersData as Career[]);
    setLoading(false);
  }, []);

  return { careers, loading };
};
