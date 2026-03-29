import { useState } from "react";

interface Props {
  onSubmit: (input1: string, input2: string) => void;
}

export default function QuestionInput({ onSubmit }: Props) {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");

  const handleSubmit = () => {
    if (!input1.trim() || !input2.trim()) return;
    onSubmit(input1, input2);
  };

  return (
    <div className="flex flex-col gap-4">

      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Enter first concept..."
          value={input1}
          onChange={(e) => setInput1(e.target.value)}
          className="flex-1 px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white"
        />

        <input
          type="text"
          placeholder="Enter second concept..."
          value={input2}
          onChange={(e) => setInput2(e.target.value)}
          className="flex-1 px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg font-semibold text-black"
      >
        ⚡ Entangle & Generate
      </button>

    </div>
  );
}