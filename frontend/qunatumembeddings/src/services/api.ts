import axios from "axios";

// 🔥 AUTO SWITCH BASE URL
const API_BASE_URL =
  import.meta.env.MODE === "production"
    ? "https://qunatumentaglement-production.up.railway.app"
    : "http://127.0.0.1:8000";

const API = axios.create({
  baseURL: API_BASE_URL,
});

// 🔥 SENTIMENT API
export const analyzeSentiment = async (text: string) => {
  const response = await API.post("/sentiment/analyze", {
    text,
  });

  return response.data;
};