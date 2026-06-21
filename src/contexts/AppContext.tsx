// ❌ INTENTIONALLY BAD — Anti-pattern Giant Context for baseline measurement
import { useState, useEffect } from "react";
import {
  generateFakeFiles,
  generateFakeNotification,
} from "@/mocks/data/generators";
import type {
  Notification,
  Message,
  FileItem,
  AnalyticsDataPoint,
  ActivityEvent,
} from "@/shared/types";
import { AppContext } from "./AppContextDef";

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [paused, setPaused] = useState(false);
  const [messages] = useState<Message[]>([]);
  const [files] = useState<FileItem[]>(() => generateFakeFiles(50_000));
  const [analytics] = useState<AnalyticsDataPoint[]>([]);
  const [activities] = useState<ActivityEvent[]>([]);

  // Simulate realtime: push notification mỗi 500ms
  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setNotifications((prev) => [generateFakeNotification(), ...prev]);
    }, 500);
    return () => clearInterval(interval);
  }, [paused]);

  // ❌ Object mới mỗi render → tất cả consumer re-render
  const value = {
    notifications,
    messages,
    files,
    analytics,
    activities,
    unreadCount: notifications.filter((n) => !n.read).length,
    paused,
    togglePause: () => setPaused((p) => !p),
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
