import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Profiler } from "react";
import { Dashboard } from "@/features/dashboard/ui/Dashboard";
import { useNotificationStore } from "@/store/notification.store";
import { generateFakeNotification } from "@/mocks/data/generators";
import "./index.css";

// ✅ Không còn AppProvider
// Simulate realtime: push notification mỗi 500ms thông qua Zustand
setInterval(() => {
  useNotificationStore.getState().addNotification(generateFakeNotification());
}, 500);

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
