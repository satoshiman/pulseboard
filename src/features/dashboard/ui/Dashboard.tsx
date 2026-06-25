import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NotificationCenter } from "@/features/notifications/ui/NotificationCenter";
import { NotificationWidget } from "@/features/notifications/ui/NotificationWidget";

export function Dashboard() {
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
        <NotificationCenter />
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">Recent Files</h3>
          <p className="text-sm text-muted-foreground">— placeholder —</p>
        </div>
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">Activity</h3>
          <p className="text-sm text-muted-foreground">— placeholder —</p>
        </div>
        <NotificationWidget />
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
