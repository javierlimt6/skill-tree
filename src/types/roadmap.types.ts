export interface LearningNodeData {
  [key: string]: unknown;
  title: string;
  status: string;
  category: string[];
  priority: string | null;
  description: string;
  resources: string | null;
  startDate: string | null;
  endDate: string | null;
  relatedPostIds: string[];
  statusColor: string;
}

export interface RoadmapStats {
  total: number;
  completed: number;
  learning: number;
  notStarted: number;
  onHold: number;
  completionRate: number;
}
