import { useAppContext } from '@/contexts/AppContext';

export function NotificationBadge() {
  const { unreadCount } = useAppContext();
  return (
    <span className="bg-red-500 text-white rounded-full px-2 py-0.5 text-xs font-semibold">
      {unreadCount}
    </span>
  );
}
