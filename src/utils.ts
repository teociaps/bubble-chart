import { BubbleData } from "./chart";

// Utility functions for color, formatting, etc.

interface DataNode {
  data: BubbleData;
}

export function getColor(d: DataNode): string {
  return d.data.color;
}

export function getName(d: DataNode): string {
  return d.data.name;
}