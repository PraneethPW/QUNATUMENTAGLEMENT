import { motion } from "framer-motion";
import EntanglementVisualizer from "../components/EntanglementVisualizer";

export default function Landing({ onStart }: { onStart: () => void }) {
  return (
    <div>

      {/* HERO */}
      <section className="h-screen flex flex-col justify-center items-center text-center px-6">

        <h1 className="text-5xl font-bold text-orange-400 mb-4">
          AI That Understands Context
        </h1>

        <p className="text-gray-400 max-w-xl mb-6">
          Analyze sentiment with aspect-level intelligence powered by Gemini AI.
        </p>

        <button
          onClick={onStart}
          className="bg-orange-500 hover:bg-orange-600 px-8 py-3 rounded-lg font-semibold text-black"
        >
          🚀 Try Now
        </button>

        <div className="w-full max-w-4xl mt-10">
          <EntanglementVisualizer active={true} />
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 px-6 max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

        {[
          "Aspect-based sentiment",
          "Context-aware reasoning",
          "Real-time AI explanation"
        ].map((f, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="bg-zinc-900 p-6 rounded-xl border border-zinc-800"
          >
            <h3 className="text-orange-400 text-lg font-semibold mb-2">{f}</h3>
            <p className="text-gray-400 text-sm">
              Built using advanced LLMs for deep understanding.
            </p>
          </motion.div>
        ))}
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 px-6 border-t border-zinc-800">
        <h2 className="text-center text-3xl font-bold text-orange-400 mb-10">
          What Users Say
        </h2>

        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            "Insanely accurate sentiment detection.",
            "Finally something that understands context.",
            "This feels like next-gen AI tools."
          ].map((t, i) => (
            <div key={i} className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
              <p className="text-gray-300 text-sm mb-4">“{t}”</p>
              <span className="text-orange-400 text-xs">User #{i + 1}</span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}