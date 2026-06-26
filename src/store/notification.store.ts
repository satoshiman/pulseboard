import { create } from "zustand";
import type { Notification } from "@/shared/types";

interface NotificationStore {
  notifications: Notification[];
  pendingQueue: Notification[];
  enqueue: (n: Notification) => void;
  flushQueue: () => void;
}

// ✅ Batching queue: gom notifications trong 300ms → 1 setState → 1 re-render
export const useNotificationStore = create<NotificationStore>((set, get) => {
  let flushTimer: ReturnType<typeof setTimeout> | null = null;

  return {
    notifications: [],
    pendingQueue: [],

    // ✅ Thêm vào queue — KHÔNG update UI ngay
    enqueue: (n) => {
      console.log(
        `➕ Enqueue called, queue size before: ${get().pendingQueue.length}`,
      );
      set((state) => {
        const newQueue = [...state.pendingQueue, n];
        console.log(`➕ Setting pendingQueue to size: ${newQueue.length}`);
        return { pendingQueue: newQueue };
      });

      // ✅ Chỉ set timer nếu chưa có (không reset mỗi lần)
      if (!flushTimer) {
        flushTimer = setTimeout(() => {
          get().flushQueue();
          flushTimer = null;
        }, 300); // ✅ Gom notifications trong 300ms
      }
    },

    // ✅ Flush → 1 setState → 1 re-render (dù có 10+ notifications)
    flushQueue: () => {
      const currentState = get();
      if (currentState.pendingQueue.length === 0) {
        return; // ✅ Không render nếu queue rỗng
      }
      console.log(
        `🔄 Flushing ${currentState.pendingQueue.length} notifications to store`,
      );
      set(() => ({
        notifications: [
          ...currentState.pendingQueue,
          ...currentState.notifications,
        ],
        pendingQueue: [],
      }));
    },
  };
});

export const useNotifications = () =>
  useNotificationStore((s) => {
    console.log(
      `📡 Selector called, notifications count: ${s.notifications.length}`,
    );
    return s.notifications;
  });
export const useUnreadCount = () =>
  useNotificationStore((s) => s.notifications.filter((n) => !n.read).length);
