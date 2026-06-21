import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// React Performance tracks được enable tự động trong dev build.
// Nếu muốn dùng profiling build (production), set REACT_PROFILING=true
// để alias react-dom/client -> react-dom/profiling.
const isProfilingEnabled = process.env.REACT_PROFILING === "true";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      ...(isProfilingEnabled && {
        "react-dom/client": "react-dom/profiling",
      }),
    },
  },
});
