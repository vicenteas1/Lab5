export type HistoricalGraphProps<T = unknown> = {
  data: T;
  title?: string;
  height?: number;     // px
  yLabel?: string;     // eje Y
  className?: string;
};