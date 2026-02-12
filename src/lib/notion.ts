import 'server-only';
import { Client } from '@notionhq/client';

// Initialize Notion client — server-side only
export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

// Database IDs
export const ROADMAP_DB_ID = process.env.NOTION_ROADMAP_DB!;
export const BLOG_DB_ID = process.env.NOTION_BLOG_DB!;

/* ── Property extraction helpers ── */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getPlainText = (richText: any[] | undefined): string => {
  if (!richText || richText.length === 0) return '';
  return richText.map((t: { plain_text: string }) => t.plain_text).join('');
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getDate = (dateObj: any): string | null => {
  if (!dateObj?.start) return null;
  return dateObj.start; // ISO string
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getSelect = (select: any): string | null => {
  return select?.name || null;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getMultiSelect = (multiSelect: any[]): string[] => {
  if (!multiSelect) return [];
  return multiSelect.map((item: { name: string }) => item.name);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getRelationIds = (relation: any[]): string[] => {
  if (!relation) return [];
  return relation.map((item: { id: string }) => item.id);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getUrl = (url: any): string | null => {
  return url || null;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getFiles = (files: any[]): string[] => {
  if (!files || files.length === 0) return [];
  return files
    .map((file: { type: string; external?: { url: string }; file?: { url: string } }) => {
      if (file.type === 'external') return file.external?.url ?? '';
      if (file.type === 'file') return file.file?.url ?? '';
      return '';
    })
    .filter(Boolean);
};
