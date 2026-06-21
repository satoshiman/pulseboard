export interface Notification {
  id: string;
  type: "info" | "warning" | "error" | "success";
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
}

export interface Message {
  id: string;
  chatId: string;
  sender: string;
  content: string;
  timestamp: number;
  isStreaming: boolean;
  reactions: Record<string, number>;
}

export interface FileItem {
  id: string;
  name: string;
  path: string;
  size: number;
  type: "file" | "folder";
  lastModified: number;
  starred: boolean;
  tags: string[];
}

export interface AnalyticsDataPoint {
  timestamp: number;
  metric: "usage" | "activity" | "latency" | "cost";
  value: number;
}

export interface ActivityEvent {
  id: string;
  type: string;
  actor: string;
  action: string;
  timestamp: number;
}
