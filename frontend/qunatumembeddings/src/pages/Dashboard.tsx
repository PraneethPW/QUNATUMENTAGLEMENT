import { motion } from "framer-motion";
import { useState } from "react";
import QuestionInput from "../components/QuestionInput";
import { analyzeSentiment } from "../services/api";

export default function Dashboard() {

  const [sentiment, setSentiment] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (text: string) => {

    try {
      setLoading(true);
      setSentiment(null);
      setConfidence(null);

      const res = await analyzeSentiment(text);

      setSentiment(res.sentiment);
      setConfidence(res.confidence);

    } catch (err) {
      console.error(err);
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
          AI Sentiment Analyzer
        </motion.h1>


        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-6 text-gray-400 text-lg max-w-2xl"
        >
          Enter a sentence and our AI will detect whether the sentiment is
          positive, negative, or neutral.
        </motion.p>


        {/* INPUT */}

        <div className="mt-12 w-full max-w-3xl">
          <QuestionInput onSubmit={handleSubmit} />
        </div>


        {loading && (
          <p className="mt-8 text-orange-400 animate-pulse">
            Analyzing sentiment...
          </p>
        )}


        {/* RESULT */}

        {sentiment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-10 max-w-xl bg-zinc-900 border border-zinc-800 p-8 rounded-2xl text-center shadow-xl"
          >

            <h3 className="text-orange-400 text-lg mb-3">
              Sentiment Result
            </h3>


            <div
              className={`text-4xl font-bold ${
                sentiment === "Positive"
                  ? "text-green-400"
                  : sentiment === "Negative"
                  ? "text-red-400"
                  : "text-yellow-400"
              }`}
            >
              {sentiment}
            </div>


            {confidence && (
              <p className="text-gray-400 mt-3">
                Confidence: {(confidence * 100).toFixed(2)}%
              </p>
            )}

          </motion.div>
        )}

      </section>
    </div>
  );
}