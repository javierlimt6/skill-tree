export interface BlogPostCard {
  id: string;
  title: string;
  slug: string;
  summary: string;
  coverImage: string | null;
  date: string | null;
  formattedDate: string;
  tags: string[];
  category: string | null;
  readTime: number;
  difficulty: string | null;
}

export interface BlogPostFull extends BlogPostCard {
  relatedRoadmapIds: string[];
  markdown: string;
}
