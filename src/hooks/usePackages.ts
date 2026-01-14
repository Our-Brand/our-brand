import { useEffect, useState } from "react";
import type { Package } from "@/types/package";
import { packageService } from "@/services/endpoints/packageService";

export const usePackages = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    packageService
      .list()
      .then((res) => {
        setPackages(res);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { packages, loading };
};
