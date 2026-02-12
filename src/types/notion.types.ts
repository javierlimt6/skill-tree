/**
 * Raw Notion roadmap node data
 */
export interface RoadmapNodeRaw {
  id: string;
  nodeId: string;
  title: string;
  parentIds: string[];
  status: 'Not Started' | 'Learning' | 'Completed' | 'On Hold';
  category: string[];
  priority: 'High' | 'Medium' | 'Low' | null;
  description: string;
  resources: string | null;
  startDate: string | null;
  endDate: string | null;
  relatedPostIds: string[];
  positionX: number;
  positionY: number;
  order: number;
}

/**
 * Raw Notion blog post data
 */
export interface BlogPostRaw {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  date: string | null;
  tags: string[];
  category: string | null;
  summary: string;
  coverImage: string | null;
  relatedRoadmapIds: string[];
  readTime: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | null;
}
