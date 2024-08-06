export interface BubbleData {
  name: string;
  value: number;
  color: string;
  icon?: string;
}

export const getColor = (d: BubbleData) => d.color;
export const getName = (d: BubbleData) => d.name;

export interface TitleOptions {
  text?: string,
  fontSize?: string;
  fontWeight?: string;
  fill?: string;
  padding?: { top?: number; right?: number; bottom?: number; left?: number };
  [key: string]: any;
}

export function toKebabCase(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}