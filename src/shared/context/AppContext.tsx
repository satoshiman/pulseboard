import type { ReactNode } from "react";
import { initializeStores, mockAnalytics } from "../utils/mockData";
import { AppContext } from "./AppContext.types";

export function AppProvider({ children }: { children: ReactNode }) {
  // Initialize Zustand stores with mock data
  initializeStores();

  return (
    <AppContext.Provider
      value={{
        analytics: mockAnalytics,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
