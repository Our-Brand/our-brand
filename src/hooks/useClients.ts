import { useEffect, useState } from "react";
import { clientService } from "@/services/endpoints/clientService";
import type { Client } from "@/types/client";

export const useClients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    clientService
      .list()
      .then((res) => {
        setClients(res);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { clients, loading };
};
