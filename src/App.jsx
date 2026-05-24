import { useState } from "react";
import Stopwatch from "./components/Stopwatch.jsx";
import TimerApp from "./components/TimerApp.jsx";
import "./index.css";

function App() {
  const [clock, setClock] = useState("stopwatch");

  return (
    <div className="relative min-h-screen w-full bg-[#080809] flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Background elegant radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-white/[0.02] rounded-full blur-[100px] pointer-events-none select-none z-0" />

      {/* Pill-shaped Tab Switcher container */}
      <div className="relative z-10 flex p-1 bg-[#121214]/80 backdrop-blur-md border border-white/5 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.5)] mb-8 select-none">
        
        {/* Stopwatch Button */}
        <button 
          onClick={() => setClock("stopwatch")}
          className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wide uppercase transition-all duration-300 cursor-pointer ${
            clock === "stopwatch"
              ? "bg-[#1f1f23] text-white shadow-[0_2px_10px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.05)] border border-white/5"
              : "text-neutral-400 hover:text-neutral-200 border border-transparent"
          }`}
        >
          Stopwatch
        </button>

        {/* Timer Button */}
        <button 
          onClick={() => setClock("Timer")}
          className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wide uppercase transition-all duration-300 cursor-pointer ${
            clock === "Timer"
              ? "bg-[#1f1f23] text-white shadow-[0_2px_10px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.05)] border border-white/5"
              : "text-neutral-400 hover:text-neutral-200 border border-transparent"
          }`}
        >
          Timer
        </button>
      </div>

      {/* Component Display (smooth transition via wrapper) */}
      <div className="relative z-10 w-full flex justify-center items-center transition-all duration-500">
        {clock === "stopwatch" ? <Stopwatch /> : <TimerApp />}
      </div>
    </div>
  );
}

export default App;
