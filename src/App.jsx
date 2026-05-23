import { useState } from "react";
import Stopwatch from "./components/Stopwatch.jsx";
import TimerApp from "./components/TimerApp.jsx";

function App() {
  const [clock, setClock] = useState("stopwatch");

  return (
    <>
      {clock === "stopwatch" ? <Stopwatch /> : <TimerApp />}
      <button onClick={() => setClock("stopwatch")}>Stopwatch</button>
      <button onClick={() => setClock("Timer")}>Timer</button>
    </>
  );
}

export default App;
