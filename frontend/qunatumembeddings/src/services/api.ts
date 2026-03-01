import axios from "axios";

// Automatically switch between local and production
const API_BASE_URL =
  import.meta.env.MODE === "production"
    ? "https://qunatumentaglement-production.up.railway.app"
    : "http://127.0.0.1:8000";

const API = axios.create({
  baseURL: API_BASE_URL,
});

export const askQuestion = async (
  question: string,
  mode: "cosine" | "quantum"
) => {
  const response = await API.post("/qa/ask", {
    question,
    top_k: 3,
    mode,
  });

  return response.data;
};