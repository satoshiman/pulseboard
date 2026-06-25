import { useNotificationStore } from "@/store/notification.store";
import { generateFakeNotification } from "@/mocks/data/generators";

// Gọi function này để bắt đầu flood: 1 notification mỗi 10ms
export function startNotificationFlood(): () => void {
  const interval = setInterval(() => {
    // ❌ Mỗi notification = 1 setState = 1 re-render ngay lập tức
    useNotificationStore.getState().addNotification(generateFakeNotification());
  }, 10);

  return () => clearInterval(interval);
}

// Expose to window for console testing
declare global {
  interface Window {
    startNotificationFlood?: () => () => void;
  }
}

if (typeof window !== "undefined") {
  window.startNotificationFlood = startNotificationFlood;
}
