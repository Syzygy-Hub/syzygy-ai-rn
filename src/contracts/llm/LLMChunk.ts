import type { FinishReason } from './LLMResponse';

export interface LLMChunk {
  content?: string;
  toolCallDelta?: string;
  finishReason?: FinishReason;
  metadata?: Record<string, string>;
}
