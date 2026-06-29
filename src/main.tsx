import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Profiler } from "react";
import { scan } from "react-scan";
import App from "./App";
import "./index.css";
import "@/mocks/simulateFlood";

// Initialize react-scan for performance monitoring
scan({
  enabled: true,
  log: true,
  showToolbar: true,
  animationSpeed: "fast",
});

// Profiler callback để debug timeline
function onRender(id: string, phase: string, actualDuration: number) {
  console.log(`🔍 Profiler [${id}] ${phase}: ${actualDuration}ms`);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Profiler id="App" onRender={onRender}>
      <App />
    </Profiler>
  </StrictMode>,
);
