import { useState, useTransition, Suspense } from "react";

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

const TABS = ["overview", "chat", "files", "notifications"] as const;
type Tab = (typeof TABS)[number];

export function Dashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (tab: Tab) => {
    // ✅ Tab button update ngay (urgent), content render sau (non-urgent)
    startTransition(() => setActiveTab(tab));
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Pulseboard</h1>
      </div>

      <nav className="flex gap-2 mb-6 border-b pb-2">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`px-4 py-2 rounded text-sm capitalize transition-colors ${
              activeTab === tab
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            }`}
            style={{ opacity: isPending ? 0.7 : 1 }}
          >
            {tab}
          </button>
        ))}
        {isPending && (
          <span className="text-xs text-muted-foreground self-center">
            loading...
          </span>
        )}
      </nav>

      {/* ✅ Suspense boundary: mỗi widget có fallback riêng, không block nhau */}
      <div className="grid grid-cols-3 gap-4">
        <Suspense fallback={<WidgetSkeleton />}>
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">AI Usage</h3>
            <p className="text-sm text-muted-foreground">— placeholder —</p>
          </div>
        </Suspense>

        <Suspense fallback={<WidgetSkeleton />}>
          <NotificationCenter />
        </Suspense>

        <Suspense fallback={<WidgetSkeleton />}>
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Recent Files</h3>
            <p className="text-sm text-muted-foreground">— placeholder —</p>
          </div>
        </Suspense>

        <Suspense fallback={<WidgetSkeleton />}>
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Activity</h3>
            <p className="text-sm text-muted-foreground">— placeholder —</p>
          </div>
        </Suspense>

        <Suspense fallback={<WidgetSkeleton />}>
          <NotificationWidget />
        </Suspense>

        <Suspense fallback={<WidgetSkeleton />}>
          <Card>
            <CardHeader>
              <CardTitle>Interactive</CardTitle>
              <CardDescription>
                Click the button to test React DevTools state inspection.
              </CardDescription>
            </CardHeader>
            <CardContentReactive />
          </Card>
        </Suspense>
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

function WidgetSkeleton() {
  return (
    <div className="border rounded-lg p-4 animate-pulse">
      <div className="h-4 bg-muted rounded w-24 mb-4" />
      <div className="h-32 bg-muted rounded" />
    </div>
  );
}
