import { create } from 'zustand';
import type { Notification } from '@/shared/types';

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  filter: 'all' | 'unread';
}

interface NotificationActions {
  addNotification: (n: Notification) => void;
  markAsRead: (id: string) => void;
  setFilter: (f: 'all' | 'unread') => void;
}

export const useNotificationStore = create<
  NotificationState & NotificationActions
>((set) => ({
  notifications: [],
  unreadCount: 0,
  filter: 'all',

  addNotification: (n) =>
    set((state) => ({
      notifications: [n, ...state.notifications],
      unreadCount: state.unreadCount + (n.read ? 0 : 1),
    })),

  markAsRead: (id) =>
    set((state) => {
      const target = state.notifications.find((n) => n.id === id);
      if (!target || target.read) return state;
      return {
        notifications: state.notifications.map((n) =>
          n.id === id ? { ...n, read: true } : n,
        ),
        unreadCount: Math.max(0, state.unreadCount - 1),
      };
    }),

  setFilter: (filter) => set({ filter }),
}));

// ✅ Selector hooks — component chỉ re-render khi phần nó dùng thay đổi
export const useNotifications = () => useNotificationStore((s) => s.notifications);
export const useUnreadCount = () => useNotificationStore((s) => s.unreadCount);
export const useNotificationFilter = () => useNotificationStore((s) => s.filter);
