import { useState, useEffect, useMemo, memo } from "react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { useAppContext } from "@/shared/context/useAppContext";
import { useNotifications, useUnreadCount } from "@/store/notification.store";
import { useMessages } from "@/store/chat.store";

// Fixed timestamp for anti-pattern demo (avoiding lint error)
const NOW = Date.now();

// Memoized Interactive Card to prevent re-renders from forceUpdate
const InteractiveCard = memo(() => {
  const [count, setCount] = useState(0);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Interactive</CardTitle>
        <CardDescription>
          Click the button to test React DevTools state inspection.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold mb-3">{count}</p>
        <Button onClick={() => setCount((c) => c + 1)}>Count</Button>
      </CardContent>
    </Card>
  );
});

// ✅ Fixed: Pre-computed values + useMemo
// - unreadCount: O(1) from Zustand store
// - recentMessages: O(n log n) but memoized
// - analytics stats: O(n) but memoized
export function Dashboard() {
  const { analytics } = useAppContext();
  const notifications = useNotifications();
  const unreadCount = useUnreadCount(); // ✅ Pre-computed, O(1)
  const messages = useMessages();
  const [forceUpdate, setForceUpdate] = useState(0);

  // Simulate notification flood - trigger re-render every 100ms
  useEffect(() => {
    const interval = setInterval(() => {
      setForceUpdate((prev) => prev + 1);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // ✅ Chỉ tính lại khi messages thay đổi — deps: primitive string/number
  const recentMessages = useMemo(
    () =>
      messages
        .filter((m) => NOW - m.timestamp < 86400000)
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, 20),
    [messages],
  );

  // ✅ Batch nhiều analytics computations trong 1 useMemo
  const analyticsStats = useMemo(() => {
    const values = analytics.map((a) => a.value);
    return {
      max: Math.max(...values),
      avg:
        values.length > 0
          ? values.reduce((s, v) => s + v, 0) / values.length
          : 0,
    };
  }, [analytics]);

  // ✅ Pre-computed unread notifications for display
  const unreadNotifications = useMemo(
    () => notifications.filter((n) => !n.read),
    [notifications],
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Pulseboard</h1>
        <span className="text-sm text-muted-foreground">
          Updates: {forceUpdate}
        </span>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">AI Usage</h3>
          <p className="text-sm text-muted-foreground">
            Max: {analyticsStats.max.toFixed(2)}
          </p>
          <p className="text-sm text-muted-foreground">
            Avg: {analyticsStats.avg.toFixed(2)}
          </p>
        </div>
        <div className="border rounded-lg p-4 col-span-2">
          <h3 className="font-semibold mb-2">
            Notifications (showing first 50)
          </h3>
          <p className="text-sm text-muted-foreground mb-2">
            Total Unread: {unreadCount}
          </p>
          <div className="max-h-40 overflow-y-auto text-xs space-y-1">
            {unreadNotifications.slice(0, 50).map((n) => (
              <div key={n.id} className="p-1 border-b">
                {n.type}: {n.title}
              </div>
            ))}
          </div>
        </div>
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">Recent Files</h3>
          <p className="text-sm text-muted-foreground">— placeholder —</p>
        </div>
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">Activity</h3>
          <p className="text-sm text-muted-foreground">— placeholder —</p>
        </div>
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">Recent Messages</h3>
          <p className="text-sm text-muted-foreground">
            Count: {recentMessages.length}
          </p>
        </div>
        <InteractiveCard />
      </div>
    </div>
  );
}
