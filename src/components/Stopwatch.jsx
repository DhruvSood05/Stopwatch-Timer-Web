import React, { useState } from "react";

function Stopwatch() {
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [start, setStart] = useState("Start");

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
  };

  const formatTime = () => {
    const hours = Math.floor(timer / 360000);
    const minutes = Math.floor((timer / 6000) % 60);
    const seconds = Math.floor((timer / 100) % 60);
    const milliseconds = timer % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}:${String(milliseconds).padStart(2, "0")} `;
  };

  return (
    <div>
      <h1>Stopwatch</h1>
      <h2>{formatTime()}</h2>
      <button disabled={intervalId} onClick={startTimer}>
        {start}
      </button>
      <button onClick={pauseTimer}>Pause</button>
      <button onClick={resetTime}>Reset</button>
    </div>
  );
}

export default Stopwatch;
