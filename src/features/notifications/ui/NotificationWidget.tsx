import { useMemo, memo, useRef, useDeferredValue } from "react";
import { useNotifications } from "@/store/notification.store";

export const NotificationWidget = memo(function NotificationWidget() {
  const notifications = useNotifications();

  // Debug: count re-renders (development only)
  const renderCount = useRef(0);
  renderCount.current += 1;

  console.log(
    `🎨 NotificationWidget render #${renderCount.current}, notifications length: ${notifications.length}`,
  );

  if (import.meta.env.DEV) {
    console.log(`NotificationWidget renders: ${renderCount.current}`);
  }

  // ✅ Defer: khi user đang interact, list này không block UI
  const deferred = useDeferredValue(notifications);
  const isStale = deferred !== notifications;

  // ✅ useMemo: chỉ slice khi deferred list thay đổi
  const recentNotifications = useMemo(() => deferred.slice(0, 50), [deferred]);

  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">Thông báo</h3>
        {isStale && (
          <span className="text-xs text-muted-foreground animate-pulse">
            cập nhật...
          </span>
        )}
      </div>

      <div style={{ opacity: isStale ? 0.7 : 1, transition: "opacity 0.2s" }}>
        <p className="text-sm text-muted-foreground mb-2">
          Total: {notifications.length}
        </p>
        <div className="space-y-1 max-h-48 overflow-y-auto">
          {recentNotifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
            />
          ))}
        </div>
      </div>
    </div>
  );
});

const NotificationItem = memo(function NotificationItem({
  notification,
}: {
  notification: { id: string; title: string; message: string; type: string };
}) {
  const colors = {
    info: "bg-blue-500",
    warning: "bg-yellow-500",
    error: "bg-red-500",
    success: "bg-green-500",
  };

  return (
    <div className="py-2 border-b last:border-0 flex gap-2 items-start">
      <span
        className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${colors[notification.type as keyof typeof colors]}`}
      />
      <div>
        <p className="text-sm font-medium leading-tight">
          {notification.title}
        </p>
        <p className="text-xs text-muted-foreground">{notification.message}</p>
      </div>
    </div>
  );
});
