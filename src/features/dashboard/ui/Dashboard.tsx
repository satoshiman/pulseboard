import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAppContext } from "@/shared/context/AppContext";

// Fixed timestamp for anti-pattern demo (avoiding lint error)
const NOW = Date.now();

// ❌ Anti-pattern: Computed values TRONG render loop
// Mỗi render đều chạy lại những phép tính này:
// - filter notifications O(100k) = ~30ms
// - groupByDate O(100k log 100k) = ~80ms
// - filter + sort messages O(20k log 20k) = ~25ms
// - Math.max analytics O(10k) = ~5ms
// - reduce analytics O(10k) = ~5ms
// Tổng: ~145ms mỗi render
export function Dashboard() {
  const { notifications, messages, analytics } = useAppContext();
  const [forceUpdate, setForceUpdate] = useState(0);

  // Simulate notification flood - trigger re-render every 100ms
  useEffect(() => {
    const interval = setInterval(() => {
      setForceUpdate((prev) => prev + 1);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Mỗi render đều chạy lại những phép tính này:
  const unreadNotifications = notifications.filter((n) => !n.read); // O(n)
  const totalUnread = unreadNotifications.length; // O(n)

  const recentMessages = messages
    .filter((m) => NOW - m.timestamp < 86400000) // O(n)
    .sort((a, b) => b.timestamp - a.timestamp) // O(n log n)
    .slice(0, 20); // O(1)

  const analyticsMax = Math.max(...analytics.map((a) => a.value)); // O(n)
  const analyticsAvg =
    analytics.reduce((s, a) => s + a.value, 0) / analytics.length; // O(n)

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
            Max: {analyticsMax.toFixed(2)}
          </p>
          <p className="text-sm text-muted-foreground">
            Avg: {analyticsAvg.toFixed(2)}
          </p>
        </div>
        <div className="border rounded-lg p-4 col-span-2">
          <h3 className="font-semibold mb-2">
            Notifications (showing first 50)
          </h3>
          <p className="text-sm text-muted-foreground mb-2">
            Total Unread: {totalUnread}
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
        <Card>
          <CardHeader>
            <CardTitle>Interactive</CardTitle>
            <CardDescription>
              Click the button to test React DevTools state inspection.
            </CardDescription>
          </CardHeader>
          <CardContentReactive />
        </Card>
      </div>
    </div>
  );
}

const CardContentReactive = () => {
  const [count, setCount] = useState(0);
  return (
    <CardContent>
      <p className="text-2xl font-bold mb-3">{count}</p>
      <Button onClick={() => setCount((c) => c + 1)}>Count</Button>
    </CardContent>
  );
};
