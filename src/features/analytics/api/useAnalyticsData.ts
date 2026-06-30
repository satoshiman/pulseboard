import { useQuery } from '@tanstack/react-query';
import type { AnalyticsDataPoint } from '@/shared/types';

export function useAnalyticsData() {
  return useQuery({
    queryKey: ['analytics'],
    queryFn: async (): Promise<{ points: AnalyticsDataPoint[] }> => {
      // Mock data hoặc fetch thật
      return {
        points: Array.from({ length: 1000 }, (_, i) => ({
          timestamp: Date.now() - (1000 - i) * 60000,
          metric: 'usage' as const,
          value: Math.random() * 100,
        })),
      };
    },
    staleTime: 30_000,

    // ✅ select: transform + memoize. Component chỉ re-render khi OUTPUT thay đổi
    select: (data) => {
      const values = data.points.map(p => p.value);
      return {
        chartData: data.points.slice(-200),  // Chỉ 200 points gần nhất cho chart
        stats: {
          max: Math.max(...values),
          min: Math.min(...values),
          avg: values.reduce((s, v) => s + v, 0) / values.length,
        },
      };
    },
  });
}
