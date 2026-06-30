import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";

export function Dashboard() {
  return (
    <div>
      <Navigation />
      <div className="p-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">AI Usage</h3>
            <p className="text-sm text-muted-foreground">— placeholder —</p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Notifications</h3>
            <p className="text-sm text-muted-foreground">— placeholder —</p>
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
