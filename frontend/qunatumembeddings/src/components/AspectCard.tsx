interface Props {
    aspect: string;
    sentiment: string;
    confidence: number;
  }
  
  export default function AspectCard({ aspect, sentiment, confidence }: Props) {
  
    return (
      <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
  
        <h3 className="text-lg text-orange-400 mb-2">
          {aspect}
        </h3>
  
        <div
          className={`text-xl font-bold ${
            sentiment === "Positive"
              ? "text-green-400"
              : sentiment === "Negative"
              ? "text-red-400"
              : "text-yellow-400"
          }`}
        >
          {sentiment}
        </div>
  
        <p className="text-gray-400 mt-2">
          Confidence: {(confidence * 100).toFixed(2)}%
        </p>
  
      </div>
    );
  }