import { useState, useEffect, useCallback, useRef } from 'react';
import analyticsService, {
  type AnalyticsOverview,
  type VisitorPoint,
  type ProjectsStats,
  type MessagesStats,
  type TopService,
  type DailyVisitor,
  type DeviceStat,
  type BrowserStat,
  type TopPage,
  type ActivityItem,
  type HourlyVisitor,
} from '@services/analytics.service';

export interface AnalyticsData {
  overview: AnalyticsOverview | null;
  visitors: VisitorPoint[];
  projectsStats: ProjectsStats | null;
  messagesStats: MessagesStats | null;
  topServices: TopService[];
  visitorChart: DailyVisitor[];
  deviceStats: DeviceStat[];
  browserStats: BrowserStat[];
  topPages: TopPage[];
  activityFeed: ActivityItem[];
  hourlyVisitors: HourlyVisitor[];
}

const emptyData: AnalyticsData = {
  overview: null,
  visitors: [],
  projectsStats: null,
  messagesStats: null,
  topServices: [],
  visitorChart: [],
  deviceStats: [],
  browserStats: [],
  topPages: [],
  activityFeed: [],
  hourlyVisitors: [],
};

export function useRealtimeAnalytics(refreshInterval = 30_000) {
  const [data, setData] = useState<AnalyticsData>(emptyData);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchAll = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    else setRefreshing(true);
    setError(null);

    try {
      const [
        overview,
        visitors,
        projectsStats,
        messagesStats,
        topServices,
        visitorChart,
        deviceStats,
        browserStats,
        topPages,
        activityFeed,
        hourlyVisitors,
      ] = await Promise.allSettled([
        analyticsService.getOverview(),
        analyticsService.getVisitors(30),
        analyticsService.getProjectsStats(),
        analyticsService.getMessagesStats(),
        analyticsService.getTopServices(),
        analyticsService.getVisitorChart(7),
        analyticsService.getDeviceStats(),
        analyticsService.getBrowserStats(),
        analyticsService.getTopPages(10),
        analyticsService.getActivityFeed(15),
        analyticsService.getHourlyVisitors(),
      ]);

      setData({
        overview: overview.status === 'fulfilled' ? overview.value : null,
        visitors: visitors.status === 'fulfilled' ? visitors.value : [],
        projectsStats: projectsStats.status === 'fulfilled' ? projectsStats.value : null,
        messagesStats: messagesStats.status === 'fulfilled' ? messagesStats.value : null,
        topServices: topServices.status === 'fulfilled' ? topServices.value : [],
        visitorChart: visitorChart.status === 'fulfilled' ? visitorChart.value : [],
        deviceStats: deviceStats.status === 'fulfilled' ? deviceStats.value : [],
        browserStats: browserStats.status === 'fulfilled' ? browserStats.value : [],
        topPages: topPages.status === 'fulfilled' ? topPages.value : [],
        activityFeed: activityFeed.status === 'fulfilled' ? activityFeed.value : [],
        hourlyVisitors: hourlyVisitors.status === 'fulfilled' ? hourlyVisitors.value : [],
      });
      setLastUpdated(new Date());
    } catch (e: any) {
      setError(e?.message ?? 'Failed to load analytics');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchAll(false);
  }, [fetchAll]);

  // Real-time polling
  useEffect(() => {
    intervalRef.current = setInterval(() => fetchAll(true), refreshInterval);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [fetchAll, refreshInterval]);

  const refresh = useCallback(() => fetchAll(true), [fetchAll]);

  return { data, loading, refreshing, lastUpdated, error, refresh };
}
