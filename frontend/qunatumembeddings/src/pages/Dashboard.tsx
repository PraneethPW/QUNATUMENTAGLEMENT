import { motion } from "framer-motion";
import { useState } from "react";
import QuestionInput from "../components/QuestionInput";
import { askQuestion } from "../services/api";

interface RankedAnswer {
  id: number;
  content: string;
  confidence: number;
}

export default function Dashboard() {
  const [answer, setAnswer] = useState<string | null>(null);
  const [rankedAnswers, setRankedAnswers] = useState<RankedAnswer[]>([]);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"cosine" | "quantum">("cosine");

  const handleSubmit = async (question: string) => {
    try {
      setLoading(true);
      setAnswer(null);
      setRankedAnswers([]);

      const res = await askQuestion(question, mode);

      setAnswer(res.ai_generated_answer);
      setRankedAnswers(res.ranked_answers || []);
    } catch (err) {
      console.error(err);
      setAnswer("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <section className="flex flex-col items-center justify-center text-center pt-32 pb-20 px-6">

        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent"
        >
          Quantum Intelligence
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-6 text-gray-400 text-lg max-w-2xl"
        >
          Hybrid semantic ranking powered by embeddings and generative AI.
        </motion.p>

        {/* MODE TOGGLE */}
        <div className="mt-10 flex items-center bg-zinc-900 rounded-full p-1 border border-zinc-800">
          {["cosine", "quantum"].map((m) => (
            <button
              key={m}
              onClick={() => setMode(m as "cosine" | "quantum")}
              className={`px-6 py-2 rounded-full text-sm transition-all duration-300 ${
                mode === m
                  ? "bg-orange-500 text-black font-semibold"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {m.charAt(0).toUpperCase() + m.slice(1)}
            </button>
          ))}
        </div>

        {/* INPUT */}
        <div className="mt-12 w-full max-w-3xl">
          <QuestionInput onSubmit={handleSubmit} />
        </div>

        {loading && (
          <p className="mt-8 text-orange-400 animate-pulse">
            Generating response...
          </p>
        )}

        {/* AI ANSWER */}
        {answer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-10 max-w-3xl bg-zinc-900 border border-zinc-800 p-6 rounded-2xl text-left shadow-xl"
          >
            <h3 className="text-orange-400 font-semibold mb-3">
              AI Generated Answer
            </h3>
            {answer}
          </motion.div>
        )}

        {/* RANKED ANSWERS WITH CONFIDENCE */}
        {rankedAnswers.length > 0 && (
          <div className="mt-12 max-w-3xl w-full text-left">
            <h3 className="text-gray-400 mb-4">
              Top Ranked Context Chunks
            </h3>

            {rankedAnswers.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-4 p-5 rounded-xl bg-zinc-900 border border-zinc-800"
              >
                <p className="text-gray-200">{item.content}</p>

                <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
                  <span>ID: {item.id}</span>
                  <span className="text-orange-400 font-medium">
                    Confidence: {(item.confidence * 100).toFixed(2)}%
                  </span>
                </div>

                {/* Confidence Bar */}
                <div className="mt-2 w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-2 bg-gradient-to-r from-orange-500 to-yellow-400"
                    style={{ width: `${item.confidence * 100}%` }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}