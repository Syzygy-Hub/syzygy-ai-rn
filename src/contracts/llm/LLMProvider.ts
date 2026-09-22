import type { LLMRequest } from './LLMRequest';
import type { LLMResponse } from './LLMResponse';
import type { LLMChunk } from './LLMChunk';

export interface LLMProvider {
  complete(request: LLMRequest): Promise<LLMResponse>;
  stream(request: LLMRequest): AsyncIterable<LLMChunk>;
}
