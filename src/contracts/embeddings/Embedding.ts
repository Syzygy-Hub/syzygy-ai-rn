export interface Embedding {
  values: number[];
  dimensions: number;
  metadata?: Record<string, string>;
}
