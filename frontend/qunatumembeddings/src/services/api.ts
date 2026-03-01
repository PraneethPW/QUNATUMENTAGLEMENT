import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
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