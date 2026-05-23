import { useState } from "react";
import Stopwatch from "./components/Stopwatch.jsx";
import TimerApp from "./components/TimerApp.jsx";
import "./index.css";

function App() {
  const [clock, setClock] = useState("stopwatch");

  return (
    <>
      <button onClick={() => setClock("stopwatch")}>Stopwatch</button>
      <button onClick={() => setClock("Timer")}>Timer</button>
      {clock === "stopwatch" ? <Stopwatch /> : <TimerApp />}
    </>
  );
}

export default App;
