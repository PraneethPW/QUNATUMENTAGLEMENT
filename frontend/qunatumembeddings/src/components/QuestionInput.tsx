import { useState } from "react";

interface Props {
  onSubmit: (text: string) => void;
}

export default function QuestionInput({ onSubmit }: Props) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (!text.trim()) return;

    onSubmit(text);
    setText("");
  };

  return (
    <div className="flex gap-3">

      <input
        type="text"
        placeholder="Enter text to analyze sentiment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white"
      />

      <button
        onClick={handleSubmit}
        className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg font-semibold text-black"
      >
        Analyze
      </button>

    </div>
  );
}