import { memo } from 'react';
import { useNotifications } from '@/store/notification.store';

export const NotificationWidget = memo(function NotificationWidget() {
  const notifications = useNotifications();

  return (
    <div className="border rounded-lg p-4">
      <h3 className="font-semibold mb-2">Notification Widget</h3>
      <p className="text-sm text-muted-foreground mb-2">
        Total: {notifications.length}
      </p>
      <div className="space-y-1 max-h-48 overflow-y-auto">
        {notifications.slice(0, 10).map((notification) => (
          <div
            key={notification.id}
            className="p-1 rounded text-xs border bg-muted/30"
          >
            {notification.title}
          </div>
        ))}
      </div>
    </div>
  );
});
