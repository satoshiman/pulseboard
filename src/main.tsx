import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { scan } from "react-scan";
import App from "./App";
import "./index.css";

// Enable react-scan in development only
if (import.meta.env.DEV) {
  scan({
    enabled: true,
    // Show toolbar for visual inspection
    showToolbar: true,
    // Log to console
    log: true,
  });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
