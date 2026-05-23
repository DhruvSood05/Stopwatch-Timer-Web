import React, { useState } from "react";
import CircularProgress from "./CircularProgress";

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
    <div className=" border-amber-200 border-4 justify-center flex items-center flex-col h-screen">
      <h1 className=" font-bold text-5xl mb-2">Stopwatch</h1>
      <div className="timer-container flex border-4 p-5 gap-3 items-center">
        <div className="time-box border-4">
          <h1>{String(hours).padStart(2, "0")}</h1>
          <p>HR</p>
        </div>

        <div className="time-box">
          <h1>{String(minutes).padStart(2, "0")}</h1>
          <p>MIN</p>
        </div>

        <div className="time-box">
          <h1>{String(seconds).padStart(2, "0")}</h1>
          <p>SEC</p>
        </div>

        <div className="time-box">
          <h1>{String(milliseconds).padStart(2, "0")}</h1>
          <p>MS</p>
        </div>
      </div>

      {laps.map((lap, index) => (
        <p key={index}>
          Lap {index + 1} : {formatTime(lap)}
        </p>
      ))}

      <button onClick={addLap}>store lap</button>
      <button disabled={intervalId} onClick={startTimer}>
        {start}
      </button>
      <button onClick={pauseTimer}>Pause</button>
      <button onClick={resetTime}>Reset</button>
    </div>
  );
}

export default Stopwatch;
