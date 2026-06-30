import { useState, lazy, Suspense } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";

// Dynamic import for heavy components - load only when needed
const AnalyticsChart = lazy(() =>
  import("@/features/analytics/ui/AnalyticsChart").then((m) => ({
    default: m.AnalyticsChart,
  })),
);

const MarkdownRenderer = lazy(() =>
  import("@/features/markdown/ui/MarkdownRenderer").then((m) => ({
    default: m.MarkdownRenderer,
  })),
);

// Mock data for chart
const mockChartData = Array.from({ length: 24 }, (_, i) => ({
  timestamp: Date.now() - (23 - i) * 3600000,
  value: Math.floor(Math.random() * 100) + 50,
}));

const mockMarkdown = `
# AI Usage Report

## Overview
Your AI usage has been **increasing** over the past 24 hours.

### Key Metrics
- Total requests: 1,234
- Average response time: 450ms
- Success rate: 99.8%

\`\`\`javascript
const usage = {
  tokens: 50000,
  cost: 0.05
};
\`\`\`
`;

export function Dashboard() {
  return (
    <div>
      <Navigation />
      <div className="p-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">AI Usage</h3>
            <Suspense
              fallback={<div className="h-48 bg-muted animate-pulse rounded" />}
            >
              <AnalyticsChart data={mockChartData} />
            </Suspense>
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
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Usage Report</CardTitle>
            </CardHeader>
            <CardContent>
              <Suspense
                fallback={
                  <div className="h-32 bg-muted animate-pulse rounded" />
                }
              >
                <MarkdownRenderer content={mockMarkdown} />
              </Suspense>
            </CardContent>
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
