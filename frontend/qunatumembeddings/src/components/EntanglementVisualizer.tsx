import { motion, useReducedMotion } from "framer-motion";

type Props = {
  active?: boolean;
  className?: string;
};

export default function EntanglementVisualizer({ active = true, className }: Props) {
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = active && !prefersReducedMotion;

  return (
    <div
      className={[
        "relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/60",
        "min-h-[220px]",
        className ?? "",
      ].join(" ")}
      aria-hidden="true"
    >
      <div className="absolute inset-0 opacity-70 [mask-image:radial-gradient(closest-side,white,transparent)]">
        <div className="absolute -inset-24 bg-[conic-gradient(from_180deg_at_50%_50%,#fb923c,#f59e0b,#f97316,#fb923c)] blur-2xl" />
      </div>

      <div className="absolute inset-0">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.span
            key={i}
            className="absolute block h-2 w-2 rounded-full bg-orange-400 shadow-[0_0_20px_rgba(251,146,60,0.8)]"
            initial={{ x: `${10 + i * 18}%`, y: `${30 + (i % 2) * 18}%`, opacity: 0.9 }}
            animate={
              shouldAnimate
                ? {
                    x: [`${10 + i * 18}%`, `${18 + i * 14}%`, `${10 + i * 18}%`],
                    y: [`${30 + (i % 2) * 18}%`, `${18 + ((i + 1) % 2) * 30}%`, `${30 + (i % 2) * 18}%`],
                    opacity: [0.6, 1, 0.6],
                  }
                : { opacity: 0.85 }
            }
            transition={
              shouldAnimate
                ? { duration: 3.6 + i * 0.4, repeat: Infinity, ease: "easeInOut" }
                : undefined
            }
          />
        ))}

        <motion.div
          className="absolute inset-0"
          animate={shouldAnimate ? { opacity: [0.25, 0.45, 0.25] } : { opacity: 0.35 }}
          transition={shouldAnimate ? { duration: 2.8, repeat: Infinity, ease: "easeInOut" } : undefined}
        >
          <svg className="h-full w-full" viewBox="0 0 100 60" preserveAspectRatio="none">
            <path
              d="M5,35 C25,10 35,55 55,28 C70,8 82,50 95,22"
              fill="none"
              stroke="rgba(251,146,60,0.55)"
              strokeWidth="0.8"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d="M5,22 C22,46 35,6 52,30 C70,55 82,10 95,38"
              fill="none"
              stroke="rgba(245,158,11,0.35)"
              strokeWidth="0.8"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </motion.div>
      </div>

      <div className="relative p-5">
        <div className="text-sm font-semibold text-orange-300">Entanglement Field</div>
        <div className="mt-1 text-xs text-zinc-400">
          {active ? "Synchronizing context vectors…" : "Paused"}
        </div>
      </div>
    </div>
  );
}