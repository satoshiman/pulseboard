import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Profiler } from "react";
import { Router } from "./router";
import "./wdyr";
import "./index.css";

// Profiler callback để debug timeline
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function onRender(_id: string, _phase: string, _actualDuration: number) {
  // Removed console.log
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Profiler id="App" onRender={onRender}>
      <Router />
    </Profiler>
  </StrictMode>,
);
