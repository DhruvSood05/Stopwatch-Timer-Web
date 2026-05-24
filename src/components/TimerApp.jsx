import React, { useState, useRef } from "react";
import CircularProgress from "./CircularProgress";

const TimerApp = () => {
  const [time, setTime] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [inputMinutes, setInputMinutes] = useState("");
  const [editingField, setEditingField] = useState(null);
  const [editValue, setEditValue] = useState("");
  const editRef = useRef(null);

  const startTimer = () => {
    const totalSeconds = inputMinutes * 60;
    setTime(totalSeconds);

    const id = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    setIntervalId(id);
  };

  const pauseTimer = () => {
    clearInterval(intervalId);
    setIntervalId(null);
  };

  const resetTimer = () => {
    clearInterval(intervalId);
    setIntervalId(null);
    setTime(0);
  };

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const formatTime = () => {
    const hours = Math.floor(time / 360000);
    const minutes = Math.floor((time / 6000) % 60);
    const seconds = Math.floor((time / 100) % 60);
    const milliseconds = time % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}:${String(milliseconds).padStart(2, "0")} `;
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if(value < 0) {
      setTime(0);
      return;
    }
    setInputMinutes(value);
    setTime(value * 60);
  };

  // Inline digit editing handlers
  const handleDigitClick = (field) => {
    if (intervalId) return;
    setEditingField(field);
    setEditValue(field === "minutes" ? String(minutes) : String(seconds));
    setTimeout(() => editRef.current?.select(), 0);
  };

  const commitEdit = () => {
    const val = Math.max(0, parseInt(editValue) || 0);
    if (editingField === "minutes") {
      const newTime = val * 60 + seconds;
      setTime(newTime);
      setInputMinutes(String(Math.floor(newTime / 60)));
    } else if (editingField === "seconds") {
      const clampedSec = Math.min(val, 59);
      const newTime = minutes * 60 + clampedSec;
      setTime(newTime);
      setInputMinutes(String(Math.floor(newTime / 60)));
    }
    setEditingField(null);
  };

  const handleEditKeyDown = (e) => {
    if (e.key === "Enter") commitEdit();
    if (e.key === "Escape") setEditingField(null);
  };

  // Calculate progress for the CircularProgress component
  const totalSeconds = inputMinutes ? inputMinutes * 60 : 0;

  return (
    <div className="relative w-full max-w-[600px] bg-[#121214]/65 backdrop-blur-xl border border-white/5 shadow-[0_24px_80px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.05)] rounded-[24px] p-7 flex flex-col items-center select-none overflow-hidden transition-all duration-300">
      
      {/* Sleek Header Indicator */}
      <div className="flex items-center gap-2 mb-10">
        <span className={`w-1.5 h-1.5 rounded-full ${intervalId ? "bg-emerald-500 shadow-[0_0_8px_#10b981]" : "bg-neutral-600"} transition-all duration-300`}></span>
        <span className="text-[10px] font-semibold tracking-[0.25em] text-neutral-400 uppercase">TIMER</span>
      </div>

      {/* Clock Display Ring container */}
      <div className="timer-container relative w-[250px] h-[250px] flex items-center justify-center mb-8">
        {/* Glowing breathing glow while running */}
        <div className={`absolute w-[180px] h-[180px] bg-white/5 rounded-full filter blur-[35px] opacity-0 transition-opacity duration-700 pointer-events-none ${intervalId ? "opacity-100 ambient-glow" : ""}`} />

        {/* Dynamic circular progress ring */}
        <CircularProgress 
          time={time} 
          totalTime={totalSeconds} 
          size={250} 
          strokeWidth={3} 
          className="absolute inset-0"
        />

        {/* Center digit readouts — click to edit */}
        <div className="absolute inset-0 z-10 flex items-center justify-center select-none">
          {/* Minutes */}
          <div className="time-box flex flex-col items-center cursor-pointer" onClick={() => handleDigitClick("minutes")}>
            {editingField === "minutes" ? (
              <input
                ref={editRef}
                type="number"
                min="0"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onBlur={commitEdit}
                onKeyDown={handleEditKeyDown}
                className="tabular-numbers text-5xl font-extralight tracking-tight text-white bg-transparent border-b border-white/20 outline-none text-center w-[72px] appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                autoFocus
              />
            ) : (
              <h1 className="tabular-numbers text-5xl font-extralight tracking-tight text-white hover:text-neutral-300 transition-colors duration-150">{String(minutes).padStart(2, "0")}</h1>
            )}
            <p className="text-[8px] font-semibold tracking-[0.2em] text-neutral-500 uppercase mt-2">MIN</p>
          </div>

          <span className="tabular-numbers text-3xl font-light text-neutral-600 mx-2 select-none mb-4">:</span>

          {/* Seconds */}
          <div className="time-box flex flex-col items-center cursor-pointer" onClick={() => handleDigitClick("seconds")}>
            {editingField === "seconds" ? (
              <input
                ref={editRef}
                type="number"
                min="0"
                max="59"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onBlur={commitEdit}
                onKeyDown={handleEditKeyDown}
                className="tabular-numbers text-5xl font-extralight tracking-tight text-white bg-transparent border-b border-white/20 outline-none text-center w-[72px] appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                autoFocus
              />
            ) : (
              <h1 className="tabular-numbers text-5xl font-extralight tracking-tight text-white hover:text-neutral-300 transition-colors duration-150">{String(seconds).padStart(2, "0")}</h1>
            )}
            <p className="text-[8px] font-semibold tracking-[0.2em] text-neutral-500 uppercase mt-2">SEC</p>
          </div>
        </div>
      </div>

      {/* Hint text — tap digits to edit */}
      {!intervalId && (
        <p className="text-[9px] tracking-widest uppercase text-neutral-600 mb-6 transition-opacity duration-300">Click digits to set time</p>
      )}

      {/* Control Buttons Panel */}
      <div className="flex flex-col w-full gap-3 mt-2">
        {/* Row 1: Primary Controls */}
        <div className="flex w-full gap-3">
          {/* Start Button */}
          <button 
            onClick={startTimer}
            className={`btn-premium flex-1 py-3 px-5 rounded-xl text-xs font-semibold uppercase tracking-wider border select-none transition-all duration-200 cursor-pointer ${
              intervalId 
                ? "bg-neutral-900/40 border-neutral-800/80 text-neutral-500 cursor-default" 
                : "bg-white text-black border-white hover:bg-neutral-100 active:scale-[0.97]"
            }`}
          >
            Start
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
          {/* Reset Button */}
          <button 
            onClick={resetTimer}
            className="btn-premium flex-1 py-2.5 px-4 rounded-xl text-[10px] font-medium uppercase tracking-widest bg-neutral-950 border border-neutral-900 text-neutral-400 hover:text-red-400 hover:border-red-950 active:scale-[0.97] transition-all duration-200 cursor-pointer"
          >
            Reset
          </button>
        </div>
      </div>

    </div>
  );
};

export default TimerApp;
