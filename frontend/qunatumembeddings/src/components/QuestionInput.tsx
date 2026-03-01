import { useState } from "react";

type Props = {
  onSubmit: (question: string) => void;
};

export default function QuestionInput({ onSubmit }: Props) {
  const [question, setQuestion] = useState("");

  const handleClick = () => {
    if (!question.trim()) return;
    onSubmit(question);
  };

  return (
    <div className="flex gap-4">
      <input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask something about quantum physics..."
        className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-5 py-4 focus:outline-none focus:border-orange-500"
      />
      <button
        onClick={handleClick}
        className="bg-orange-500 hover:bg-orange-600 px-6 rounded-xl font-semibold text-black"
      >
        Ask
      </button>
    </div>
  );
}