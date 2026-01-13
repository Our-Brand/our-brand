import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Client } from "@/types/client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useLanguage } from "@/hooks/useLanguage";

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

type ClientsCarouselProps = {
  items: Client[];
  autoPlay?: boolean;
  autoPlayDelayMs?: number;
};

const ClientsCarousel = ({
  items,
  autoPlay = true,
  autoPlayDelayMs = 6500,
}: ClientsCarouselProps) => {
  const { t } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isHovering, setIsHovering] = useState(false);
  const timerRef = useRef<number | null>(null);

  const [open, setOpen] = useState(false);

  const safeItems = useMemo(() => (Array.isArray(items) ? items : []), [items]);
  const count = safeItems.length;

  const goTo = (next: number) => {
    if (!count) return;
    const normalized = (next + count) % count;
    setIndex(normalized);
  };

  const next = () => {
    setDirection(1);
    goTo(index + 1);
  };

  const prev = () => {
    setDirection(-1);
    goTo(index - 1);
  };

  useEffect(() => {
    if (!autoPlay || prefersReducedMotion || !count) return;
    if (isHovering) return;

    timerRef.current = window.setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % count);
    }, autoPlayDelayMs);

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [autoPlay, autoPlayDelayMs, prefersReducedMotion, count, isHovering]);

  const slideVariants = {
    enter: (dir: 1 | -1) => ({
      x: prefersReducedMotion ? 0 : dir > 0 ? 40 : -40,
      opacity: 0,
      scale: prefersReducedMotion ? 1 : 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.55, ease: EASE_OUT },
    },
    exit: (dir: 1 | -1) => ({
      x: prefersReducedMotion ? 0 : dir > 0 ? -40 : 40,
      opacity: 0,
      scale: prefersReducedMotion ? 1 : 0.98,
      transition: { duration: 0.35, ease: EASE_OUT },
    }),
  };

  if (!safeItems.length) {
    return (
      <Card className="bg-card border-border shadow-[0_8px_30px_rgb(0,0,0,0.4)]">
        <CardContent className="py-10 text-center ">
          {t("no_clients_yet")}
        </CardContent>
      </Card>
    );
  }

  const current = safeItems[index];
  const hasLogo = Boolean(current.companyImg);

  return (
    <>
      <div
        className="relative w-full"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Background blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-16 -left-16 h-64 w-64 rounded-full bg-primary/20 blur-[90px]" />
          <div className="absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-accent/20 blur-[90px]" />
        </div>

        <div className="relative flex items-center justify-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={prev}
            aria-label="Previous"
            className="hidden md:inline-flex border-border bg-card/50 backdrop-blur hover:bg-card"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          {/* Fixed frame */}
          <div className="w-full h-[400px] max-w-4xl flex justify-center">
            <AnimatePresence
              initial={false}
              mode="popLayout"
              custom={direction}
            >
              <motion.div
                key={index}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full h-full"
              >
                <Card className="group relative h-full bg-card border-border shadow-[0_8px_30px_rgb(0,0,0,0.4)] hover:shadow-[0_8px_40px_hsl(190,90%,55%,0.25)] transition-all duration-300 overflow-hidden">
                  {/* Hover Overlay */}
                  <div
                    className={[
                      "absolute inset-0 z-10",
                      "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100",
                      "transition-opacity duration-300",
                      "bg-gradient-to-b from-background/30 via-background/70 to-background/90",
                      "backdrop-blur-[2px]",
                    ].join(" ")}
                  >
                    <div className="absolute inset-0 flex flex-col items-center justify-end text-center px-10 pb-10">
                      <p
                        className="text-foreground/85 text-base md:text-lg max-w-2xl"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 4,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {current.description}
                      </p>

                      <div className="mt-5 flex items-center gap-3">
                        <Button
                          variant="outline"
                          onClick={() => setOpen(true)}
                          className="bg-card/70 backdrop-blur hover:bg-card"
                        >
                          {t("readmore")}
                        </Button>

                        <a
                          href={current.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
                        >
                          {t("visit_website")}{" "}
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Main content (stable layout) */}
                  <CardContent className="h-full flex flex-col px-10 py-10">
                    {/* Main centered block */}
                    <div className="flex flex-1 flex-col items-center justify-center text-center gap-5">
                      <div className="flex items-center justify-center min-h-14 md:min-h-16">
                        {hasLogo ? (
                          <img
                            src={current.companyImg}
                            alt={current.title}
                            className="h-12 md:h-14 w-auto object-contain"
                            loading="lazy"
                          />
                        ) : null}
                      </div>

                      <a
                        href={current.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex focus:outline-none focus:ring-2 focus:ring-primary/60 rounded-md"
                        aria-label={`Open ${current.title} website`}
                      >
                        <h3 className="text-3xl md:text-4xl font-bold tracking-tight hover:underline underline-offset-4">
                          {current.title}
                        </h3>
                      </a>

                      <p className="text-muted-foreground text-sm">
                        {t("hover_to_learn_more")}
                      </p>
                    </div>

                    {/* Footer pinned to bottom */}
                    <div className="pt-6 flex items-center justify-between w-full gap-4">
                      <div className="flex md:hidden gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={prev}
                          aria-label="Previous"
                          className="border-border bg-card/50 backdrop-blur hover:bg-card"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={next}
                          aria-label="Next"
                          className="border-border bg-card/50 backdrop-blur hover:bg-card"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </Button>
                      </div>

                      <div className="ml-auto flex items-center gap-2">
                        {safeItems.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              setDirection(i > index ? 1 : -1);
                              goTo(i);
                            }}
                            aria-label={`Go to item ${i + 1}`}
                            className={[
                              "h-2.5 w-2.5 rounded-full transition-all",
                              i === index
                                ? "bg-primary w-7"
                                : "bg-muted-foreground/30 hover:bg-muted-foreground/50",
                            ].join(" ")}
                          />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={next}
            aria-label="Next"
            className="hidden md:inline-flex border-border bg-card/50 backdrop-blur hover:bg-card"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Full Description Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>{current.title}</DialogTitle>
            <DialogDescription>{t("full_description")}</DialogDescription>
          </DialogHeader>

          <div className="text-muted-foreground leading-relaxed">
            {current.description}
          </div>

          <div className="pt-4 flex justify-end">
            <a
              href={current.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline underline-offset-4"
            >
              {t("visit_website")}
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ClientsCarousel;
