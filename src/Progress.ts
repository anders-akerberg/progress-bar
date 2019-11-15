export interface ProgressProps {
  /**
   * Current value of progress
   */
  now?: number;

  /**
   * Minimum value progress can begin from
   */
  min?: number;

  /**
   * Maximum value progress can reach
   */
  max?: number;

  /**
   * Hex color code, can be used if the variant is not enough
   */
  color?: string;

  className?: string;

  size?: "big" | "small";

  /**
   * Show label that represents visual percentage.
   * EG. 60%
   */
  label?: any;

  /**
   * Override the list of colors for stacked progress
   */
  colors?: string[];
}

const ROUND_PRECISION = 1000;

export function getPercentage(now: number, min: number, max: number) {
  const percentage = ((now - min) / (max - min)) * 100;
  return Math.round(percentage * ROUND_PRECISION) / ROUND_PRECISION;
}

export const COLORS = [
  "#ec2362",
  "#009487",
  "#9c28aa",
  "#ffc033",
  "#4250b0",
  "#79564b",
  "#5f7c89",
  "#cbdc4d",
  "#00bccd"
];

export function getColor(index: number, colors: string[]) {
  return colors[index % colors.length];
}
