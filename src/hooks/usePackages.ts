import { useEffect, useState } from "react";
import type { Package } from "@/types/package";
import { packageService } from "@/services/endpoints/packageService";

export const usePackages = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    setLoading(true);

    packageService
      .list()
      .then((res) => {
        if (!alive) return;
        setPackages(res);
      })
      .finally(() => {
        if (!alive) return;
        setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, []);

  return { packages, loading };
};
