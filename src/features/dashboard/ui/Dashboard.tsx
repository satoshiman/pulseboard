import { NotificationBadge } from "@/features/notifications/ui/NotificationBadge";
import { NotificationFeed } from "@/features/notifications/ui/NotificationFeed";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function InteractiveCard() {
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
}

export function Dashboard() {
  // ✅ Không lấy dữ liệu từ context — mỗi widget tự subscribe
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Pulseboard</h1>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">AI Usage</h3>
          <p className="text-sm text-muted-foreground">— placeholder —</p>
        </div>

        <div className="border rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Notifications</h3>
            <NotificationBadge />
          </div>
          <NotificationFeed />
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
          <p className="text-sm text-muted-foreground">— placeholder —</p>
        </div>

        <InteractiveCard />
      </div>
    </div>
  );
}
