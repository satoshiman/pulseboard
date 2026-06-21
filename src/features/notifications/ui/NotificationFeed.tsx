import { useNotifications } from "@/store/notification.store";

export function NotificationFeed() {
  const notifications = useNotifications(); // ✅ chỉ re-render khi notifications đổi
  return (
    <div>
      {notifications.slice(0, 3).map((n) => (
        <p key={n.id} className="text-sm truncate">
          {n.title}
        </p>
      ))}
    </div>
  );
}
