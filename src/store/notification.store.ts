import { create } from 'zustand';
import type { Notification } from '@/shared/types';

interface NotificationStore {
  notifications: Notification[];
  unreadCount: number;          // ✅ Pre-computed, update khi add/markRead
  pendingQueue: Notification[];
  enqueue: (n: Notification) => void;
  flushQueue: () => void;
  markAsRead: (id: string) => void;
  initialize: (notifications: Notification[]) => void;
}

export const useNotificationStore = create<NotificationStore>((set, get) => {
  let flushTimer: ReturnType<typeof setTimeout> | null = null;

  return {
    notifications: [],
    unreadCount: 0,
    pendingQueue: [],

    initialize: (notifications) =>
      set({
        notifications,
        unreadCount: notifications.filter(n => !n.read).length,
      }),

    enqueue: (n) => {
      set(state => ({ pendingQueue: [...state.pendingQueue, n] }));
      if (flushTimer) clearTimeout(flushTimer);
      flushTimer = setTimeout(() => get().flushQueue(), 100);
    },

    flushQueue: () =>
      set(state => {
        const newUnread = state.pendingQueue.filter(n => !n.read).length;
        return {
          notifications: [...state.pendingQueue, ...state.notifications],
          pendingQueue: [],
          unreadCount: state.unreadCount + newUnread, // ✅ Update đồng thời
        };
      }),

    markAsRead: (id) =>
      set(state => {
        const target = state.notifications.find(n => n.id === id);
        if (!target || target.read) return state;
        return {
          notifications: state.notifications.map(n =>
            n.id === id ? { ...n, read: true } : n
          ),
          unreadCount: Math.max(0, state.unreadCount - 1), // ✅ Update đồng thời
        };
      }),
  };
});

// ✅ Selector hooks — O(1), không cần filter mỗi lần
export const useNotifications = () => useNotificationStore(s => s.notifications);
export const useUnreadCount = () => useNotificationStore(s => s.unreadCount);
