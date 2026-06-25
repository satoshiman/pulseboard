import { useNotificationStore } from "@/store/notification.store";
import { generateFakeNotification } from "@/mocks/data/generators";

// Gọi function này để bắt đầu flood: 1 notification mỗi 10ms
export function startNotificationFlood(): () => void {
  console.log("🚀 Starting notification flood...");
  let count = 0;

  const interval = setInterval(() => {
    const notification = generateFakeNotification();
    count++;
    // ✅ Dùng enqueue: batching trong 100ms → 1 setState cho nhiều notifications
    useNotificationStore.getState().enqueue(notification);

    if (count % 10 === 0) {
      console.log(`📬 Enqueued ${count} notifications`);
    }
  }, 10);

  return () => {
    clearInterval(interval);
    console.log(`🛑 Stopped flood. Total: ${count} notifications`);
  };
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
