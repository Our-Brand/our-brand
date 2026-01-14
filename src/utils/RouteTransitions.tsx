import { AnimatePresence, motion } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";

const RouteTransitions = () => {
  const location = useLocation();

  return (
    <div className="relative">
      <AnimatePresence mode="sync" initial={false}>
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.35, ease: "easeInOut", delay: 0.05 }}
          style={{ position: "absolute", inset: 0, width: "100%" }}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>

      <div className="invisible">
        <Outlet />
      </div>
    </div>
  );
};

export default RouteTransitions;
