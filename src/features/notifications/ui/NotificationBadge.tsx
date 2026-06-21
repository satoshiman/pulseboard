import { useUnreadCount } from "@/store/notification.store";

export function NotificationBadge() {
  const unreadCount = useUnreadCount(); // ✅ chỉ re-render khi unreadCount đổi
  return (
    <span className="bg-red-500 text-white rounded-full px-2 py-0.5 text-xs font-semibold">
      {unreadCount}
    </span>
  );
}
