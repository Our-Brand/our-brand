import type { Variants } from "framer-motion";

export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
};

export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

export const hoverLift = {
  whileHover: { y: -8, transition: { duration: 0.2 } },
  whileTap: { scale: 0.98 },
};
