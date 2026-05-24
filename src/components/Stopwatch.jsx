import React, { useState } from "react";
import CircularProgress from "./CircularProgress";

// Bug Fix helper: formats stored laps in monospace digital layout
const formatTime = (time) => {
  const hours = Math.floor(time / 360000);
  const minutes = Math.floor((time / 6000) % 60);
  const seconds = Math.floor((time / 100) % 60);
  const milliseconds = time % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(milliseconds).padStart(2, "0")}`;
};

function Stopwatch() {
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [start, setStart] = useState("Start");
  const [laps, setLaps] = useState([]);

  const addLap = () => {
    setLaps((prev) => [...prev, timer]);
  };

  const startTimer = () => {
    if (intervalId) return;

    const id = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 10);
    setStart("Running");

    setIntervalId(id);
  };

  const pauseTimer = () => {
    setStart("start");
    clearInterval(intervalId);
    setIntervalId(null);
  };

  const resetTime = () => {
    setStart("start");
    clearInterval(intervalId);
    setIntervalId(null);
    setTimer(0);
    setLaps([]);
  };

  const hours = Math.floor(timer / 360000);
  const minutes = Math.floor((timer / 6000) % 60);
  const seconds = Math.floor((timer / 100) % 60);
  const milliseconds = timer % 60;

  return (
    <div className="relative w-full max-w-[600px] bg-[#121214]/65 backdrop-blur-xl border border-white/5 shadow-[0_24px_80px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.05)] rounded-[24px] p-7 flex flex-col items-center select-none overflow-hidden transition-all duration-300">
      
      {/* Sleek Header Indicator */}
      <div className="flex items-center gap-2 mb-6">
        <span className={`w-1.5 h-1.5 rounded-full ${intervalId ? "bg-emerald-500 shadow-[0_0_8px_#10b981]" : "bg-neutral-600"} transition-all duration-300`}></span>
        <span className="text-[10px] font-semibold tracking-[0.25em] text-neutral-400 uppercase">STOPWATCH</span>
      </div>

      {/* Clock Display Ring container */}
      <div className="timer-container relative w-[250px] h-[250px] flex items-center justify-center mb-10">
        {/* Glowing breathing glow while running */}
        <div className={`absolute w-[180px] h-[180px] bg-white/5 rounded-full filter blur-[35px] opacity-0 transition-opacity duration-700 pointer-events-none ${intervalId ? "opacity-100 ambient-glow" : ""}`} />

        {/* Dynamic circular progress ring */}
        <CircularProgress 
          time={timer % 6000} 
          totalTime={6000} 
          size={250} 
          strokeWidth={3} 
          className="absolute inset-0"
        />

        {/* Center digit readouts */}
        <div className="absolute inset-0 z-10 flex items-center justify-center select-all">
          <div className="time-box flex flex-col items-center">
            <h1 className="tabular-numbers text-3xl font-extralight tracking-tight text-white">{String(hours).padStart(2, "0")}</h1>
            <p className="text-[8px] font-semibold tracking-[0.2em] text-neutral-500 uppercase mt-2">HR</p>
          </div>
          
          <span className="tabular-numbers text-xl font-light text-neutral-600 mx-1 select-none mb-4">:</span>

          <div className="time-box flex flex-col items-center">
            <h1 className="tabular-numbers text-3xl font-extralight tracking-tight text-white">{String(minutes).padStart(2, "0")}</h1>
            <p className="text-[8px] font-semibold tracking-[0.2em] text-neutral-500 uppercase mt-2">MIN</p>
          </div>

          <span className="tabular-numbers text-xl font-light text-neutral-600 mx-1 select-none mb-4">:</span>

          <div className="time-box flex flex-col items-center">
            <h1 className="tabular-numbers text-3xl font-extralight tracking-tight text-white">{String(seconds).padStart(2, "0")}</h1>
            <p className="text-[8px] font-semibold tracking-[0.2em] text-neutral-500 uppercase mt-2">SEC</p>
          </div>

          <span className="tabular-numbers text-xl font-light text-neutral-600 mx-0.5 select-none mb-4">.</span>

          <div className="time-box flex flex-col items-center">
            <h1 className="tabular-numbers text-2xl font-light text-neutral-400">{String(milliseconds).padStart(2, "0")}</h1>
            <p className="text-[8px] font-semibold tracking-[0.2em] text-neutral-500 uppercase mt-2">MS</p>
          </div>
        </div>
      </div>

      {/* Control Buttons Panel */}
      <div className="flex flex-col w-full gap-3 mt-2">
        {/* Row 1: Primary Controls */}
        <div className="flex w-full gap-3">
          {/* Start/Running Button */}
          <button 
            disabled={intervalId} 
            onClick={startTimer}
            className={`btn-premium flex-1 py-3 px-5 rounded-xl text-xs font-semibold uppercase tracking-wider border select-none transition-all duration-200 cursor-pointer ${
              intervalId 
                ? "bg-neutral-900/40 border-neutral-800/80 text-neutral-500 cursor-default" 
                : "bg-white text-black border-white hover:bg-neutral-100 active:scale-[0.97]"
            }`}
          >
            {start}
          </button>

          {/* Pause Button */}
          <button 
            onClick={pauseTimer}
            className="btn-premium flex-1 py-3 px-5 rounded-xl text-xs font-semibold uppercase tracking-wider bg-neutral-900 border border-neutral-800 text-neutral-200 hover:bg-neutral-800/80 active:scale-[0.97] transition-all duration-200 cursor-pointer"
          >
            Pause
          </button>
        </div>

        {/* Row 2: Secondary Actions */}
        <div className="flex w-full gap-3">
          {/* Store Lap Button */}
          <button 
            onClick={addLap}
            className="btn-premium flex-1 py-2.5 px-4 rounded-xl text-[10px] font-medium uppercase tracking-widest bg-neutral-950 border border-neutral-900 text-neutral-400 hover:text-white hover:border-neutral-800 active:scale-[0.97] transition-all duration-200 cursor-pointer"
          >
            store lap
          </button>

          {/* Reset Button */}
          <button 
            onClick={resetTime}
            className="btn-premium flex-1 py-2.5 px-4 rounded-xl text-[10px] font-medium uppercase tracking-widest bg-neutral-950 border border-neutral-900 text-neutral-400 hover:text-red-400 hover:border-red-950 active:scale-[0.97] transition-all duration-200 cursor-pointer"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Laps Section */}
      {laps.length > 0 && (
        <div className="w-full mt-5 border-t border-white/5 pt-4">
          <h2 className="text-[9px] font-semibold tracking-widest text-neutral-500 uppercase mb-2.5 px-1">Laps Record</h2>
          <div className="custom-scrollbar max-h-36 overflow-y-auto w-full flex flex-col pr-0.5 gap-1.5">
            {laps.map((lap, index) => (
              <div 
                key={index} 
                className="flex justify-between items-center py-2 px-3 bg-neutral-950/40 border border-white/[0.02] rounded-lg text-xs hover:bg-neutral-950/80 transition-all duration-150"
              >
                <span className="font-mono text-neutral-500">
                  Lap {String(index + 1).padStart(2, "0")}
                </span>
                <span className="tabular-numbers font-medium text-neutral-200">
                  {formatTime(lap)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

export default Stopwatch;
