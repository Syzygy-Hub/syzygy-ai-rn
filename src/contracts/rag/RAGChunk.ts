export interface RAGChunk {
  content: string;
  score: number;
  metadata?: Record<string, string>;
}
