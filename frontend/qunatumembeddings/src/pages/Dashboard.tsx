import { motion } from "framer-motion";
import { useState } from "react";
import QuestionInput from "../components/QuestionInput";
import AspectCard from "../components/AspectCard";
import { analyzeSentiment } from "../services/api";

export default function Dashboard() {

  const [aspects, setAspects] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (text: string) => {

    try {

      setLoading(true);
      setAspects([]);

      const res = await analyzeSentiment(text);

      setAspects(res.aspects);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">

      <section className="flex flex-col items-center justify-center text-center pt-32 pb-20 px-6">

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-6xl font-extrabold text-orange-500"
        >
          Aspect Sentiment Analyzer
        </motion.h1>

        <div className="mt-12 w-full max-w-3xl">
          <QuestionInput onSubmit={handleSubmit} />
        </div>

        {loading && (
          <p className="mt-8 text-orange-400">
            Analyzing aspects...
          </p>
        )}

        {aspects.length > 0 && (

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 max-w-3xl">

            {aspects.map((a, index) => (
              <AspectCard
                key={index}
                aspect={a.aspect}
                sentiment={a.sentiment}
                confidence={a.confidence}
              />
            ))}

          </div>

        )}

      </section>
    </div>
  );
}