import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import type { Notification, Message, AnalyticsDataPoint } from "../types";

interface AppContextType {
  notifications: Notification[];
  messages: Message[];
  analytics: AnalyticsDataPoint[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Generate large mock datasets
const generateNotifications = (count: number): Notification[] => {
  const types: Notification["type"][] = ["info", "warning", "error", "success"];
  const now = Date.now();

  return Array.from({ length: count }, (_, i) => ({
    id: `notif-${i}`,
    type: types[i % 4],
    title: `Notification ${i}`,
    message: `This is notification message ${i}`,
    timestamp: now - i * 1000,
    read: i % 10 !== 0, // 10% unread
  }));
};

const generateMessages = (count: number): Message[] => {
  const now = Date.now();

  return Array.from({ length: count }, (_, i) => ({
    id: `msg-${i}`,
    chatId: `chat-${i % 100}`,
    sender: `user-${i % 50}`,
    content: `Message content ${i}`,
    timestamp: now - i * 5000,
    isStreaming: false,
    reactions: {},
  }));
};

const generateAnalytics = (count: number): AnalyticsDataPoint[] => {
  const metrics: AnalyticsDataPoint["metric"][] = [
    "usage",
    "activity",
    "latency",
    "cost",
  ];
  const now = Date.now();

  return Array.from({ length: count }, (_, i) => ({
    timestamp: now - i * 60000,
    metric: metrics[i % 4],
    value: Math.random() * 100,
  }));
};

// Generate large datasets
const mockNotifications = generateNotifications(100000);
const mockMessages = generateMessages(20000);
const mockAnalytics = generateAnalytics(10000);

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <AppContext.Provider
      value={{
        notifications: mockNotifications,
        messages: mockMessages,
        analytics: mockAnalytics,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
}
