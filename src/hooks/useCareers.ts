import { useEffect, useState } from "react";
import type { Career } from "@/types/career";
import { careerService } from "@/services/endpoints/careerService";

export const useCareers = () => {
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    careerService
      .list()
      .then((res) => {
        setCareers(res);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { careers, loading };
};
