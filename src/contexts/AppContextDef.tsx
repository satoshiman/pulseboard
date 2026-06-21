import { createContext } from "react";
import type {
  Notification,
  Message,
  FileItem,
  AnalyticsDataPoint,
  ActivityEvent,
} from "@/shared/types";

export interface AppContextValue {
  notifications: Notification[];
  messages: Message[];
  files: FileItem[];
  analytics: AnalyticsDataPoint[];
  activities: ActivityEvent[];
  unreadCount: number;
  paused: boolean;
  togglePause: () => void;
}

export const AppContext = createContext<AppContextValue | null>(null);
