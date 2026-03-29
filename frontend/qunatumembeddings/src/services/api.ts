import axios from "axios";

const API_BASE_URL =
  import.meta.env.MODE === "production"
    ? "https://qunatumentaglement-production.up.railway.app"
    : "http://127.0.0.1:8000";

const API = axios.create({
  baseURL: API_BASE_URL,
});

// 🔥 NEW: Dual input API
export const askDual = async (input1: string, input2: string) => {
  const response = await API.post("/qa/ask-dual", {
    input1,
    input2,
    top_k: 3,
  });

  return response.data;
};