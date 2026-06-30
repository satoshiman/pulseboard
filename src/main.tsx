import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Profiler } from "react";
import App from "./App";
import "./index.css";
import "@/mocks/simulateFlood";

// Profiler callback để debug timeline
function onRender(id: string, phase: string, actualDuration: number) {
  const logProfile = false;
  if (logProfile) {
    console.log(`🔍 Profiler [${id}] ${phase}: ${actualDuration}ms`);
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Profiler id="App" onRender={onRender}>
      <App />
    </Profiler>
  </StrictMode>,
);
