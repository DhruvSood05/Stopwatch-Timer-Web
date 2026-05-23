import React, { useState } from "react";
import CircularProgress from "./CircularProgress";

const TimerApp = () => {
  const [time, setTime] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [inputMinutes, setInputMinutes] = useState("");

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
    setInputMinutes(value);
    setTime(value * 60);
  };

  return (
    <div className=" flex justify-center items-center ">
      <h1>TimerApp</h1>

      <h1>
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </h1>
      <input
        type="number"
        placeholder="Enter minutes"
        value={inputMinutes}
        onChange={handleChange}
      />

      <div>
        <button onClick={startTimer}>Start</button>
        <button onClick={pauseTimer}>Pause</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
};

export default TimerApp;
