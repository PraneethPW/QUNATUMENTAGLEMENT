import { useState } from "react";
import AspectCard from "../components/AspectCard";
import EntanglementVisualizer from "../components/EntanglementVisualizer";

export default function Dashboard() {

  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!text.trim()) return;

    setLoading(true);

    try {
      const res = await fetch("https://qunatumentaglement-production.up.railway.app/sentiment/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();
      setResult(data);

    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto mt-24 px-6">

      {/* HEADER */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-orange-400">
          Aspect-Based Sentiment Engine
        </h1>
        <p className="text-gray-400 mt-2">
          Understand meaning, sentiment, and context instantly.
        </p>
      </div>

      {/* INPUT */}
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your sentence..."
        className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white"
      />

      <button
        onClick={handleAnalyze}
        className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg mt-4 font-semibold text-black w-full"
      >
        Analyze
      </button>

      {/* LOADING */}
      {loading && (
        <p className="text-center text-orange-400 mt-4 animate-pulse">
          ⚡ Analyzing context...
        </p>
      )}

      {/* VISUAL */}
      {(loading || result) && (
        <EntanglementVisualizer active={true} />
      )}

      {/* RESULTS */}
      {result && (
        <>
          {/* Explanation */}
          <div className="bg-zinc-900 p-6 rounded-xl mt-6 border border-zinc-700">
            <h2 className="text-orange-400 mb-2 text-lg font-semibold">
              Explanation
            </h2>
            <p className="text-gray-300">{result.explanation}</p>
          </div>

          {/* Aspects */}
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            {result.aspects.map((a: any, i: number) => (
              <AspectCard key={i} {...a} />
            ))}
          </div>
        </>
      )}

    </div>
  );
}