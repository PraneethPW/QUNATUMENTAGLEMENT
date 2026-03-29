import { useState } from "react";
import QuestionInput from "../components/QuestionInput";
import AnswerCard from "../components/AnswerCard";
import EntanglementVisualizer from "../components/EntanglementVisualizer";
import { askDual } from "../services/api";

export default function Dashboard() {

  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState<any[]>([]);
  const [aiAnswer, setAiAnswer] = useState("");

  const handleSubmit = async (input1: string, input2: string) => {
    setLoading(true);

    try {
      const res = await askDual(input1, input2);
      setAnswers(res.ranked_answers);
      setAiAnswer(res.ai_generated_answer);
    } catch (err) {
      console.error("Error:", err);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto mt-24 px-6 text-white">

      {/* 🔥 HEADER */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-orange-400">
          Dual Input Entanglement Engine
        </h1>
        <p className="text-gray-400 mt-2">
          Merge two concepts and generate intelligent insights using quantum-inspired reasoning.
        </p>
      </div>

      {/* INPUT */}
      <QuestionInput onSubmit={handleSubmit} />

      {/* LOADING TEXT */}
      {loading && (
        <p className="text-center text-orange-400 animate-pulse mt-4">
          ⚡ Entangling inputs... collapsing quantum state...
        </p>
      )}

      {/* 🔥 SECTION TITLE */}
      {(loading || aiAnswer) && (
        <h2 className="text-center text-sm text-gray-500 mt-6 mb-2 tracking-widest">
          ENTANGLEMENT VISUALIZATION
        </h2>
      )}

      {/* VISUAL */}
      <EntanglementVisualizer active={loading || aiAnswer !== ""} />

      {/* AI RESPONSE */}
      {aiAnswer && (
        <div className="bg-zinc-900 p-6 rounded-xl mb-6 border border-zinc-700 transition-all duration-500">
          <h2 className="text-orange-400 mb-2 text-lg font-semibold">
            AI Response
          </h2>
          <p className="text-gray-300 whitespace-pre-line leading-relaxed">
            {aiAnswer}
          </p>
        </div>
      )}

      {/* RANKED ANSWERS */}
      {answers.length > 0 && (
        <>
          <h2 className="text-sm text-gray-500 mb-2 tracking-widest">
            CONTEXTUAL MATCHES
          </h2>

          <div className="grid gap-4">
            {answers.map((ans) => (
              <AnswerCard
                key={ans.id}
                content={ans.content}
                confidence={ans.confidence}
              />
            ))}
          </div>
        </>
      )}

    </div>
  );
}