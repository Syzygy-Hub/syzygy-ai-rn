import type { RAGChunk } from './RAGChunk';

export interface RAGOptions {
  scoreThreshold?: number;
  metadata?: Record<string, string>;
}

export interface RAGProvider {
  retrieve(query: string, topK: number, options?: RAGOptions): Promise<RAGChunk[]>;
}
