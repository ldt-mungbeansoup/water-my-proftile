export enum Category {
  RESUME = 'Resume',
  GDD = 'Game Design Doc',
  ANALYSIS = 'Game Analysis',
  SYSTEM = 'System Design',
  LEVEL = 'Level Design'
}

export interface Project {
  id: string;
  title: string;
  category: Category;
  description: string;
  content: string; // Markdown-like content or HTML string
  date: string;
  image?: string;
  tags: string[];
  color: string; // Tailwind color class for borders/accents
}

export interface Position {
  x: number;
  y: number;
}