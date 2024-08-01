export interface BubbleData {
  name: string;
  value: number;
  color: string;
}

export const getColor = (d: BubbleData) => d.color;
export const getName = (d: BubbleData) => d.name;