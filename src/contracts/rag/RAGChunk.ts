export interface RAGChunk {
  id?: string;
  content: string;
  score: number;
  source?: string;
  documentId?: string;
  metadata?: Record<string, string>;
}
