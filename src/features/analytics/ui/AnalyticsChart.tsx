import { memo, useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface AnalyticsDataPoint {
  timestamp: number;
  value: number;
}

interface AnalyticsChartProps {
  data: AnalyticsDataPoint[];
}

export const AnalyticsChart = memo(function AnalyticsChart({ data }: AnalyticsChartProps) {
  const chartData = useMemo(
    () => data.map(point => ({
      time: new Date(point.timestamp).toLocaleTimeString(),
      value: point.value,
    })),
    [data]
  );

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={chartData}>
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#6366f1"
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
});
