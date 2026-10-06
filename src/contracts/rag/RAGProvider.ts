import type { RAGChunk } from './RAGChunk';

/** Default maximum number of chunks returned when `RAGOptions.maxResults` is not provided. */
export const DEFAULT_MAX_RESULTS = 10;

/**
 * Resolves the effective result limit for a retrieval call.
 *
 * - `undefined` or non-finite values (NaN, Infinity) yield {@link DEFAULT_MAX_RESULTS}.
 * - Fractional values are floored; values below 1 are clamped to 1.
 */
export function resolveMaxResults(maxResults?: number): number {
  if (maxResults === undefined || !Number.isFinite(maxResults)) {
    return DEFAULT_MAX_RESULTS;
  }
  return Math.max(1, Math.floor(maxResults));
}

export interface RAGOptions {
  /**
   * Maximum number of chunks to return.
   * Default: 10. Values < 1 are clamped to 1. See {@link resolveMaxResults}.
   */
  maxResults?: number;
  scoreThreshold?: number;
  metadata?: Record<string, string>;
}

export interface RAGProvider {
  retrieve(query: string, options?: RAGOptions): Promise<RAGChunk[]>;
}
