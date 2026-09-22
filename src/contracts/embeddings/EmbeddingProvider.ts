import type { Embedding } from './Embedding';

export interface EmbeddingProvider {
  embed(text: string): Promise<Embedding>;
}
