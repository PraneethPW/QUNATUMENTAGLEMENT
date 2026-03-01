import { motion } from "framer-motion";

interface Props {
  content: string;
  confidence: number;
}

export default function AnswerCard({ content, confidence }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border p-6 rounded-2xl shadow-lg"
    >
      <p className="text-gray-300 mb-4">{content}</p>

      <div className="text-sm text-primary font-semibold">
        Confidence: {confidence}
      </div>
    </motion.div>
  );
}