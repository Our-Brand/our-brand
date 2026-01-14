import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { fadeUp, stagger } from "@/lib/motion";
import ClientsCarousel from "@/components/ClientsCarousel";
import { ViewportOptions } from "@/types/ui";
import { useMemo } from "react";
import { useIsMobile } from "@/hooks/useMobile";
import { useClients } from "@/hooks/useClients";

type ClientsSectionProps = {
  viewport: ViewportOptions;
};

const ClientsSection = ({ viewport }: ClientsSectionProps) => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const { clients, loading } = useClients();
  const hasClients = clients.length > 0;

  const headerSpacing = useMemo(
    () => (isMobile ? "space-y-3" : "space-y-4"),
    [isMobile]
  );

  if (!hasClients) return null;

  return (
    <section id="clients" className="w-full min-h-[100vh] flex">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6 md:py-16 flex-1 flex items-center">
        <motion.div
          className="w-full space-y-10"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <motion.div variants={fadeUp} className={headerSpacing}>
            <motion.h2
              className="text-2xl md:text-3xl font-bold text-center mb-16 bg-clip-text"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
            >
              {t("clients.sectionTitle")}
            </motion.h2>
          </motion.div>

          <motion.div variants={fadeUp} className="w-full">
            <div className="mx-auto w-full max-w-5xl rounded-xl  p-5 shadow-sm">
              <ClientsCarousel items={clients} />
            </div>

            {loading ? null : null}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ClientsSection;
