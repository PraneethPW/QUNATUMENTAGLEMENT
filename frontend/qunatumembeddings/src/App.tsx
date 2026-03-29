import { useState } from "react";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [started, setStarted] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      {started ? <Dashboard /> : <Landing onStart={() => setStarted(true)} />}
    </div>
  );
}