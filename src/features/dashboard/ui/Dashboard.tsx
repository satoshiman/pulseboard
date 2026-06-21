import { useAppContext } from "@/contexts/useAppContext";
import { NotificationBadge } from "@/features/notifications/ui/NotificationBadge";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function Dashboard() {
  const {
    notifications,
    messages,
    files,
    analytics,
    activities,
    paused,
    togglePause,
  } = useAppContext();
  const [count, setCount] = useState(0);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Pulseboard</h1>
        <button
          onClick={togglePause}
          className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${paused ? "bg-green-500 hover:bg-green-600 text-white" : "bg-red-500 hover:bg-red-600 text-white"}`}
        >
          {paused ? "▶ Resume Noti" : "⏸ Stop Noti"}
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">AI Usage</h3>
          <p className="text-sm text-muted-foreground">
            {analytics.length} data points
          </p>
        </div>

        <div className="border rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Notifications</h3>
            <NotificationBadge />
          </div>
          {notifications.slice(0, 3).map((n) => (
            <p key={n.id} className="text-sm truncate">
              {n.title}
            </p>
          ))}
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">Recent Files</h3>
          {files.slice(0, 3).map((f) => (
            <p key={f.id} className="text-sm truncate">
              {f.name}
            </p>
          ))}
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">Activity</h3>
          {activities.slice(0, 3).map((a) => (
            <p key={a.id} className="text-sm">
              {a.action}
            </p>
          ))}
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">Recent Messages</h3>
          {messages.slice(0, 3).map((m) => (
            <p key={m.id} className="text-sm truncate">
              {m.content}
            </p>
          ))}
        </div>

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
      </div>
    </div>
  );
}
