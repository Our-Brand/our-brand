import { useEffect, useState } from "react";
import { clientService } from "@/services/endpoints/clientService";
import type { Client } from "@/types/client";

export const useClients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    setLoading(true);

    clientService
      .list()
      .then((res) => {
        if (!alive) return;
        setClients(res);
      })
      .finally(() => {
        if (!alive) return;
        setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, []);

  return { clients, loading };
};
