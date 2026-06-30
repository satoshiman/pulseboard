import { createContext } from "react";
import type { AnalyticsDataPoint } from "../types";

export interface AppContextType {
  analytics: AnalyticsDataPoint[];
}

export const AppContext = createContext<AppContextType | undefined>(undefined);
