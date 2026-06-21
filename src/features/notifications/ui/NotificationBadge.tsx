export function NotificationBadge({ count = 0 }: { count?: number }) {
  return (
    <span className="bg-red-500 text-white rounded-full px-2 py-0.5 text-xs font-semibold">
      {count}
    </span>
  );
}
