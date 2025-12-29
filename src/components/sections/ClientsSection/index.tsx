import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { fadeUp, stagger } from "@/lib/motion";
import ClientsCarousel from "@/components/ClientsCarousel";
import { ViewportOptions } from "@/types/ui";
import { useEffect, useState } from "react";
import { clientsService } from "@/services/endpoints/clientsService";
import type { Client } from "@/types/client";

type ClientsSectionProps = {
  viewport: ViewportOptions;
};

const ClientsSection = ({ viewport }: ClientsSectionProps) => {
  const { t } = useLanguage();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasClients, setHasClients] = useState(false);

  useEffect(() => {
    let alive = true;

    clientsService
      .list()
      .then((res) => {
        if (!alive) return;
        setClients(res);
        setHasClients(!!res.length);
      })
      .finally(() => alive && setLoading(false));

    return () => {
      alive = false;
    };
  }, []);

  if (!hasClients) return;

  return (
    <section id="clients" className="py-24 relative bg-muted/10">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-brand bg-clip-text text-transparent"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          {t("clients.sectionTitle")}
        </motion.h2>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="max-w-5xl mx-auto"
        >
          <motion.div variants={fadeUp}>
            <ClientsCarousel items={clients} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ClientsSection;
