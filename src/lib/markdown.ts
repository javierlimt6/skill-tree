import 'server-only';
import { NotionToMarkdown } from 'notion-to-md';
import { notion } from './notion';

const n2m = new NotionToMarkdown({ notionClient: notion });

/**
 * Convert a Notion page's blocks to a Markdown string
 */
export async function pageToMarkdown(pageId: string): Promise<string> {
  const mdBlocks = await n2m.pageToMarkdown(pageId);
  const mdString = n2m.toMarkdownString(mdBlocks);
  return mdString.parent;
}
