import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Profiler } from "react";
import { Dashboard } from "@/features/dashboard/ui/Dashboard";
import "./index.css";

// Profiler callback để debug timeline
function onRender(id: string, phase: string, actualDuration: number) {
  console.log(`🔍 Profiler [${id}] ${phase}: ${actualDuration}ms`);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Profiler id="App" onRender={onRender}>
      <Dashboard />
    </Profiler>
  </StrictMode>,
);
