import { motion } from "framer-motion";

interface Props {
  mode: "cosine" | "quantum";
  setMode: (mode: "cosine" | "quantum") => void;
}

export default function ModeToggle({ mode, setMode }: Props) {
  return (
    <div className="flex items-center bg-card border border-border rounded-full p-1 w-64 relative">

      <motion.div
        layout
        className="absolute top-1 bottom-1 w-1/2 bg-primary rounded-full"
        initial={false}
        animate={{ x: mode === "quantum" ? "100%" : "0%" }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />

      <button
        onClick={() => setMode("cosine")}
        className={`w-1/2 z-10 py-2 text-sm font-semibold transition ${
          mode === "cosine" ? "text-black" : "text-gray-400"
        }`}
      >
        Cosine
      </button>

      <button
        onClick={() => setMode("quantum")}
        className={`w-1/2 z-10 py-2 text-sm font-semibold transition ${
          mode === "quantum" ? "text-black" : "text-gray-400"
        }`}
      >
        Quantum
      </button>
    </div>
  );
}