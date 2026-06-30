import type { Notification, Message, AnalyticsDataPoint } from "../types";
import { useNotificationStore } from "@/store/notification.store";
import { useChatStore } from "@/store/chat.store";

// Initialize stores
export const initializeStores = () => {
  const mockNotifications = generateNotifications(100000);
  const mockMessages = generateMessages(20000);

  useNotificationStore.getState().initialize(mockNotifications);
  useChatStore.getState().initialize(mockMessages);
};

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
export const mockAnalytics = generateAnalytics(10000);
