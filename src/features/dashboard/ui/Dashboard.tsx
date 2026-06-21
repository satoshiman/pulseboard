import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileExplorer } from "@/features/files/ui/FileExplorer";

type Tab = "dashboard" | "files";

export function Dashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top nav */}
      <header className="border-b bg-background px-6 py-3 flex items-center gap-6">
        <h1 className="text-lg font-bold mr-4">Pulseboard</h1>
        <nav className="flex gap-1">
          <button
            type="button"
            onClick={() => setActiveTab("dashboard")}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
              activeTab === "dashboard"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            Dashboard
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("files")}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
              activeTab === "files"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            File Explorer
          </button>
        </nav>
      </header>

      {/* Tab content */}
      <main className="flex-1 p-6">
        {activeTab === "dashboard" && (
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
        )}

        {/* FileExplorer chỉ mount khi tab 'files' active */}
        {activeTab === "files" && <FileExplorer />}
      </main>
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
