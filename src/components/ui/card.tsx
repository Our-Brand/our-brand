import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Package } from "@/types/package";
import { motion, Variants } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { ComponentType, forwardRef, HTMLAttributes } from "react";

const cardVariants = cva(
  [
    "relative rounded-2xl",
    "bg-white/5 backdrop-blur-md",
    "ring-2",
    "transition-all duration-300 ease-out",
  ].join(" "),
  {
    variants: {
      variant: {
        core: "ring-white/15 shadow-[0_0_20px_rgba(255,255,255,0.08)]",
        pro: "ring-cyan-400/70 shadow-[0_0_30px_rgba(34,211,238,0.25)]",
        elite: "ring-fuchsia-500/60 shadow-[0_0_30px_rgba(217,70,239,0.18)]",
      },
      interactive: {
        true: "",
        false: "hover:translate-y-0 hover:scale-100",
      },
    },
    defaultVariants: {
      variant: "core",
      interactive: true,
    },
  },
);

export type CardProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof cardVariants> & {
    asChild?: boolean;
  };

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, interactive, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";

    return (
      <Comp
        ref={ref}
        className={cn(cardVariants({ variant, interactive }), className)}
        {...props}
      />
    );
  },
);

Card.displayName = "Card";

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col gap-1", className)}
      {...props}
    />
  ),
);
CardHeader.displayName = "CardHeader";

const CardTitle = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-base md:text-lg font-semibold tracking-[0.20em] text-white/80",
      className,
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardPrice = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "mt-3 text-4xl md:text-5xl font-semibold text-white",
      className,
    )}
    {...props}
  />
));
CardPrice.displayName = "CardPrice";

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("mt-8", className)} {...props} />
  ),
);
CardContent.displayName = "CardContent";

const CardDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("mt-10", className)} {...props} />
  ),
);
CardFooter.displayName = "CardFooter";

function SkeletonCard({ featured }: { featured?: boolean }) {
  return (
    <div
      className={[
        "animate-pulse rounded-2xl bg-white/5 p-10 md:p-12 ring-2 backdrop-blur-md",
        "min-h-[520px] md:min-h-[580px]",
        featured
          ? "ring-cyan-400/40 shadow-[0_0_20px_rgba(34,211,238,0.15)]"
          : "ring-white/10 shadow-[0_0_20px_rgba(255,255,255,0.06)]",
      ].join(" ")}
    >
      <div className="mx-auto h-5 w-28 rounded bg-white/10" />
      <div className="mx-auto mt-4 h-10 w-36 rounded bg-white/10" />

      <div className="mt-12 space-y-4">
        <div className="h-3 w-11/12 rounded bg-white/10" />
        <div className="h-3 w-10/12 rounded bg-white/10" />
        <div className="h-3 w-9/12 rounded bg-white/10" />
        <div className="h-3 w-8/12 rounded bg-white/10" />
      </div>

      <div className="mt-12 h-12 w-full rounded-xl bg-white/10" />
    </div>
  );
}

function renderFirstSentenceBold(text: string) {
  // Split on the first sentence end: ".", "!" or "?"
  // Keeps the punctuation with the first sentence.
  const match = text.match(/^(.+?[.!?])(\s+|$)([\s\S]*)$/);

  if (!match) {
    // No sentence punctuation found — just bold the whole thing lightly
    return <span className="font-semibold">{text}</span>;
  }

  const first = match[1];
  const rest = match[3];

  return (
    <>
      <span className="font-semibold">{first}</span>
      {rest ? <span> {rest}</span> : null}
    </>
  );
}

function parseDescription(desc: string) {
  // Supports:
  // - blank lines => spacer
  // - "• " bullet lines
  // - normal text lines
  return desc.split("\n").map((raw) => raw.trim());
}

export function PackageCard({
  pkg,
  t,
}: {
  pkg: Package;
  t: (key: string) => string;
}) {
  const { user } = useAuth();
  const variant = pkg.isFeatured ? "pro" : pkg.id === "3" ? "elite" : "core";

  const lines = parseDescription(t(pkg.description));

  // Build blocks: paragraphs + bullet groups
  const blocks: Array<
    | { type: "spacer" }
    | { type: "p"; text: string }
    | { type: "ul"; items: string[] }
  > = [];

  let currentBullets: string[] = [];

  const flushBullets = () => {
    if (currentBullets.length) {
      blocks.push({ type: "ul", items: currentBullets });
      currentBullets = [];
    }
  };

  for (const line of lines) {
    if (!line) {
      flushBullets();
      blocks.push({ type: "spacer" });
      continue;
    }

    const isBullet = line.startsWith("•");
    const text = isBullet ? line.replace(/^•\s?/, "") : line;

    if (isBullet) {
      currentBullets.push(text);
    } else {
      flushBullets();
      blocks.push({ type: "p", text });
    }
  }
  flushBullets();

  const subscription = Number(user?.subscription ?? 0);
  const isSubscribedForThisVariant =
    (subscription === 1 && variant === "core") ||
    (subscription === 2 && variant === "pro") ||
    (subscription === 3 && variant === "elite");

  return (
    <Card
      variant={variant}
      className={[
        "cursor-pointer",
        "p-10 md:p-12",
        "min-h-[520px] md:min-h-[580px]",
        variant === "pro"
          ? "hover:shadow-[0_0_60px_rgba(34,211,238,0.35)] hover:ring-cyan-300/90 md:scale-[1.03]"
          : variant === "elite"
            ? "hover:shadow-[0_0_60px_rgba(217,70,239,0.30)] hover:ring-fuchsia-400/90"
            : "hover:shadow-[0_0_45px_rgba(255,255,255,0.16)] hover:ring-white/25",
      ].join(" ")}
      onClick={() => undefined}
    >
      {/* Existing featured badge */}
      {pkg.isFeatured && (
        <div className="absolute right-5 top-5 rounded-full border border-cyan-300/40 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-200">
          {t("packages.items.pro.badge")}
        </div>
      )}

      {/* Subscribed badge (only if matches user.subscription and card variant) */}
      {subscription !== 0 && isSubscribedForThisVariant && (
        <div
          className={[
            "absolute left-5 top-5 rounded-full px-3 py-1 text-xs font-medium",
            variant === "pro"
              ? "border border-cyan-300/40 bg-cyan-500/10 text-cyan-200"
              : variant === "elite"
                ? "border border-fuchsia-400/40 bg-fuchsia-500/10 text-fuchsia-200"
                : "border border-white/20 bg-white/5 text-white/80",
          ].join(" ")}
        >
          {t("packages.badges.subscribed")}
        </div>
      )}

      <div className="flex flex-col items-center text-center">
        <CardHeader>
          <CardTitle>{t(pkg.title)}</CardTitle>
          <CardPrice>{pkg.price} €</CardPrice>
        </CardHeader>

        <CardContent
          className={[
            "w-full space-y-4",
            "text-start",
            "font-medium",
            "text-white/80",
          ].join(" ")}
        >
          {blocks.map((b, idx) => {
            if (b.type === "spacer") return <div key={idx} className="h-2" />;

            if (b.type === "p") {
              return (
                <p key={idx} className="text-sm leading-relaxed">
                  {renderFirstSentenceBold(b.text)}
                </p>
              );
            }

            return (
              <ul key={idx} className="mt-1 space-y-2 list-none pl-0">
                {b.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/50"
                      aria-hidden="true"
                    />
                    <span className="text-sm leading-relaxed">
                      {renderFirstSentenceBold(item)}
                    </span>
                  </li>
                ))}
              </ul>
            );
          })}
        </CardContent>
      </div>
    </Card>
  );
}

const cardIn: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.28, ease: "easeOut" as const },
  },
};

function StepCard({
  index,
  title,
  description,
  Icon,
}: {
  index: number;
  title: string;
  description: string;
  Icon: ComponentType<{ className?: string }>;
}) {
  return (
    <motion.div
      variants={cardIn}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.22, ease: "easeOut" as const }}
      className="group relative rounded-xl border p-5 shadow-sm h-full overflow-hidden bg-card/80"
    >
      {/* always-present (subtle) hover style + stronger on hover */}
      <div className="pointer-events-none absolute inset-0 opacity-100 transition-opacity duration-200">
        <div className="absolute inset-0 bg-muted/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        <div className="absolute inset-0 ring-1 ring-transparent group-hover:ring-primary/20 transition-[box-shadow,ring-color] duration-200" />
      </div>

      <div className="relative flex h-full items-start gap-3">
        <motion.div
          initial={false}
          whileHover={{ scale: 1.06, rotate: -2 }}
          transition={{ duration: 0.2, ease: "easeOut" as const }}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border bg-background"
        >
          <Icon className="h-5 w-5 text-muted-foreground" />
        </motion.div>

        <div className="min-w-0 flex h-full flex-col">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground">
              {index.toString().padStart(2, "0")}
            </span>
            <h4 className="truncate text-base font-semibold">{title}</h4>
          </div>

          <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-3 flex-1">
            {description}
          </p>

          {/* underline accent that animates on hover */}
          <div className="mt-4 h-1 w-10 rounded-full bg-muted transition-all duration-200 group-hover:w-16 group-hover:bg-primary/60" />
        </div>
      </div>
    </motion.div>
  );
}

export {
  Card,
  CardHeader,
  CardTitle,
  CardPrice,
  CardContent,
  CardDescription,
  CardFooter,
  SkeletonCard,
  StepCard,
};
