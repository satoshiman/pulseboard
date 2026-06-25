import { useNotifications, useUnreadCount } from '@/store/notification.store';
import { NotificationBadge } from './NotificationBadge';

export function NotificationCenter() {
  const notifications = useNotifications();
  const unreadCount = useUnreadCount();

  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold">Notifications</h3>
        <NotificationBadge count={unreadCount} />
      </div>
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {notifications.length === 0 ? (
          <p className="text-sm text-muted-foreground">No notifications</p>
        ) : (
          notifications.slice(0, 20).map((notification) => (
            <div
              key={notification.id}
              className={`p-2 rounded border text-sm ${
                notification.read ? 'bg-muted/50' : 'bg-white'
              }`}
            >
              <div className="font-medium">{notification.title}</div>
              <div className="text-xs text-muted-foreground">
                {notification.message}
              </div>
            </div>
          ))
        )}
      </div>
      {notifications.length > 20 && (
        <p className="text-xs text-muted-foreground mt-2">
          +{notifications.length - 20} more notifications
        </p>
      )}
    </div>
  );
}
