import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface LeakedItem {
  id: number;
  data: string;
  timestamp: string;
}

export function MemLeak() {
  const [memoryUsage, setMemoryUsage] = useState(0);
  const [isLeaking, setIsLeaking] = useState(false);
  const [leakedData, setLeakedData] = useState<LeakedItem[]>([]);
  const intervalsRef = useRef<number[]>([]);

  useEffect(() => {
    if (!isLeaking) return;

    // Memory leak: intervals that keep adding data without cleanup
    const intervals: number[] = [];

    intervals.push(
      setInterval(() => {
        setLeakedData((prev) => [
          ...prev,
          {
            id: Date.now(),
            data: new Array(10000).fill("memory leak data").join(","),
            timestamp: new Date().toISOString(),
          },
        ]);
      }, 100),
    );

    intervals.push(
      setInterval(() => {
        setLeakedData((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            data: new Array(10000).fill("more leak data").join(","),
            timestamp: new Date().toISOString(),
          },
        ]);
      }, 150),
    );

    intervals.push(
      setInterval(() => {
        setMemoryUsage((prev) => prev + 2);
      }, 1000),
    );

    intervalsRef.current = intervals;

    // Intentionally NOT clearing intervals - this is the memory leak
    // In a real app, you would do:
    // return () => {
    //   intervals.forEach(clearInterval);
    // };
  }, [isLeaking]);

  const startLeak = () => setIsLeaking(true);

  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Memory Leak Demo</CardTitle>
            <CardDescription>
              This component intentionally creates a memory leak using intervals
              that are never cleaned up
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <Button onClick={startLeak} disabled={isLeaking}>
                Start Memory Leak
              </Button>
              <Button onClick={reloadPage} variant="outline">
                Reload Page
              </Button>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Status:</p>
              <p className={isLeaking ? "text-red-500" : "text-green-500"}>
                {isLeaking ? "LEAKING MEMORY" : "Normal"}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Leaked Items Count:</p>
              <p className="text-2xl font-bold">{leakedData.length}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Estimated Memory Usage:</p>
              <p className="text-2xl font-bold">{memoryUsage.toFixed(2)} MB</p>
            </div>
            <div className="text-xs text-muted-foreground">
              <p>
                ⚠️ Warning: This intentionally creates a memory leak. The
                intervals keep adding data to state without cleanup, causing
                memory to grow indefinitely.
              </p>
              <p className="mt-2">
                The leak is caused by setInterval calls that are never cleared
                in the cleanup function of useEffect.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
