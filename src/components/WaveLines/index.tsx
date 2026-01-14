import { useEffect, useMemo, useRef } from "react";

type WaveLinesProps = {
  width?: number;
  height?: number;
  lines?: number;
  amplitude?: number;
  frequency?: number; // NOTE: should be ~0.6..2.5 for this formula, not 90
  speed?: number;
  background?: string;
  stroke?: string;

  groupSpread?: number;

  startYFrac?: number;
  endYFrac?: number;

  sBend?: number;
  mirroredS?: boolean;

  /** Keep bottom visible (disable fade mask) */
  fade?: boolean; // default true
};

const TAU = Math.PI * 2;

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function bezier1D(t: number, p0: number, p1: number, p2: number, p3: number) {
  const u = 1 - t;
  return (
    u * u * u * p0 + 3 * u * u * t * p1 + 3 * u * t * t * p2 + t * t * t * p3
  );
}

// Faster than toFixed() inside tight loops
const r2 = (n: number) => Math.round(n * 100) / 100;

// Nonlinear distribution: groups lines near the center band
function groupedOffset(norm01: number, h: number, spread: number) {
  const u = norm01 * 2 - 1; // -1..1
  const k = 3.2;
  const squashed = Math.tanh(u * k) / Math.tanh(k);
  return squashed * h * spread;
}

export default function WaveLines({
  width = 1200,
  height = 650,
  lines = 10,
  amplitude = 50,
  frequency = 1.15,
  speed = 0.22,
  background = "#ffffff00",
  stroke = "#ffffff40",
  groupSpread = 0.075,
  startYFrac = 0.45,
  endYFrac = 0.6,
  sBend = 0.5,
  mirroredS = false,
  fade = false,
}: WaveLinesProps) {
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const raf = useRef<number | null>(null);
  const start = useRef<number>(0);

  // Baseline endpoints
  const y0 = height * startYFrac;
  const y3 = height * endYFrac;

  // Precompute geometry for Bezier segments (x positions + control x's)
  const segments = 6; // keep low for performance
  const geom = useMemo(() => {
    const dx = width / segments;
    const g = Array.from({ length: segments }, (_, i) => {
      const x0 = i * dx;
      const x1 = (i + 1) * dx;
      return {
        x0,
        x1,
        c1x: x0 + dx * 0.4,
        c2x: x0 + dx * 0.6,
        t0: x0 / width,
        t1: x1 / width,
      };
    });
    return g;
  }, [width]);

  // Per-line constants (offsets + slight phase variation)
  const perLine = useMemo(() => {
    const arr: Array<{
      key: string;
      offset: number;
      phaseOffset: number;
      strokeWidth: number;
      opacity: number;
    }> = [];

    // Band emphasis (thicker around center of group)
    const focusStrength = 0.9;

    for (let i = 0; i < lines; i++) {
      const norm = lines <= 1 ? 0 : i / (lines - 1);
      const offset = groupedOffset(norm, height, groupSpread);
      const phaseOffset = i * 0.18;

      // Compute bandFactor just from offset (cheap)
      const dist = Math.abs(offset);
      const bandFactor =
        Math.exp(-Math.pow(dist / (height * 0.055), 2)) * focusStrength;

      const strokeWidth = 0.9 + bandFactor * 2.2;
      const opacity = clamp(0.2 + bandFactor * 0.85, 0.18, 0.95);

      arr.push({
        key: `wave-${i}`,
        offset,
        phaseOffset,
        strokeWidth,
        opacity,
      });
    }
    return arr;
  }, [lines, height, groupSpread]);

  // Baseline S curve control points
  const baseline = useMemo(() => {
    const dip = height * sBend;

    // These y1/y2 choices create an S; mirrored flips its direction
    const y1 = y0 + (mirroredS ? +dip * 0.05 : -dip * 0.05);
    const y2 = y3 + (mirroredS ? -dip : +dip);

    const baseYAtT = (tt: number) => bezier1D(tt, y0, y1, y2, y3);

    return { baseYAtT };
  }, [height, sBend, y0, y3, mirroredS]);

  // Build one path string (fast) from precomputed geom
  const buildPath = (tSec: number, offset: number, phaseOffset: number) => {
    // Keep the waves from exceeding the viewBox too much:
    // if you push startYFrac/endYFrac too low + high amplitude, it can clip.
    const A = amplitude;
    const F = frequency;

    const phase = tSec * 1.1 + phaseOffset;

    // Start point
    const yStart =
      baseline.baseYAtT(0) + offset + Math.sin(0 * TAU * F + phase) * A;

    let d = `M 0 ${r2(yStart)}`;

    for (let i = 0; i < geom.length; i++) {
      const g = geom[i];

      // baseline at endpoints
      const b0 = baseline.baseYAtT(g.t0);
      const b1 = baseline.baseYAtT(g.t1);

      // oscillation at endpoints
      const s0 = Math.sin(g.t0 * TAU * F + phase);
      const s1 = Math.sin(g.t1 * TAU * F + phase);

      // envelope keeps more energy mid-span without extra trig
      const env0 = 0.55; // constant envelope for speed (optional)
      const env1 = 0.55;

      const y0p = b0 + offset + s0 * A * env0;
      const y1p = b1 + offset + s1 * A * env1;

      d += ` C ${r2(g.c1x)} ${r2(y0p)}, ${r2(g.c2x)} ${r2(y1p)}, ${r2(
        g.x1
      )} ${r2(y1p)}`;
    }

    return d;
  };

  useEffect(() => {
    const loop = (now: number) => {
      if (!start.current) start.current = now;
      const tt = ((now - start.current) / 1000) * speed;

      for (let i = 0; i < perLine.length; i++) {
        const el = pathRefs.current[i];
        if (!el) continue;

        const p = perLine[i];
        el.setAttribute("d", buildPath(tt, p.offset, p.phaseOffset));
      }

      raf.current = requestAnimationFrame(loop);
    };

    raf.current = requestAnimationFrame(loop);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speed, perLine, geom, baseline, amplitude, frequency]);

  return (
    <svg
      width="100%"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      style={{ display: "block", background }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="fadeOut" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="1" />
        </linearGradient>

        {fade && (
          <>
            <linearGradient id="fadeMask" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="white" stopOpacity="1" />
              <stop offset="85%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <mask id="topMask">
              <rect
                x="0"
                y="0"
                width={width}
                height={height}
                fill="url(#fadeMask)"
              />
            </mask>
          </>
        )}
      </defs>

      <g mask={fade ? "url(#topMask)" : undefined}>
        {perLine.map((p, i) => (
          <path
            key={p.key}
            ref={(node) => {
              pathRefs.current[i] = node;
            }}
            // starter path
            d={`M 0 ${y0} C ${width * 0.33} ${y0}, ${
              width * 0.66
            } ${y3}, ${width} ${y3}`}
            fill="none"
            stroke={stroke}
            strokeOpacity={p.opacity}
            strokeWidth={p.strokeWidth}
            strokeLinecap="round"
          />
        ))}
      </g>
    </svg>
  );
}
