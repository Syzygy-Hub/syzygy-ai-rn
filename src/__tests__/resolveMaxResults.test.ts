import { DEFAULT_MAX_RESULTS, resolveMaxResults } from '../contracts/rag/RAGProvider';
import type { RAGChunk } from '../contracts/rag/RAGChunk';
import type { RAGOptions, RAGProvider } from '../contracts/rag/RAGProvider';

describe('resolveMaxResults', () => {
  it('DEFAULT_MAX_RESULTS is 10', () => {
    expect(DEFAULT_MAX_RESULTS).toBe(10);
  });

  it('returns default when undefined', () => {
    expect(resolveMaxResults()).toBe(10);
    expect(resolveMaxResults(undefined)).toBe(10);
  });

  it('clamps 0 and negatives to 1', () => {
    expect(resolveMaxResults(0)).toBe(1);
    expect(resolveMaxResults(-3)).toBe(1);
  });

  it('floors fractional values', () => {
    expect(resolveMaxResults(3.9)).toBe(3);
  });

  it('passes through valid values', () => {
    expect(resolveMaxResults(25)).toBe(25);
  });

  it('returns default for NaN and Infinity', () => {
    expect(resolveMaxResults(NaN)).toBe(10);
    expect(resolveMaxResults(Infinity)).toBe(10);
  });
});

describe('RAGProvider maxResults resolution', () => {
  const corpus: RAGChunk[] = Array.from({ length: 20 }, (_, i) => ({
    id: `c${i}`,
    content: `chunk ${i}`,
    score: 1 - i / 100,
  }));

  const provider: RAGProvider = {
    retrieve: async (_query: string, options?: RAGOptions) =>
      corpus
        .filter((c) => c.score >= (options?.scoreThreshold ?? 0))
        .slice(0, resolveMaxResults(options?.maxResults)),
  };

  it('uses the default limit when options are omitted', async () => {
    expect(await provider.retrieve('q')).toHaveLength(10);
  });

  it('honours maxResults', async () => {
    expect(await provider.retrieve('q', { maxResults: 3 })).toHaveLength(3);
  });

  it('combines maxResults with scoreThreshold', async () => {
    const out = await provider.retrieve('q', { maxResults: 5, scoreThreshold: 0.97 });
    expect(out.map((c) => c.id)).toEqual(['c0', 'c1', 'c2', 'c3']);
  });
});
