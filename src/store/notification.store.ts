import { create } from 'zustand';
import type { Notification } from '@/shared/types';

interface NotificationStore {
  notifications: Notification[];
  addNotification: (n: Notification) => void;
}

// ❌ Mỗi addNotification → setState → re-render ngay
export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  addNotification: (n) =>
    set(state => ({ notifications: [n, ...state.notifications] })),
}));

export const useNotifications = () => useNotificationStore(s => s.notifications);
export const useUnreadCount = () =>
  useNotificationStore(s => s.notifications.filter(n => !n.read).length);
