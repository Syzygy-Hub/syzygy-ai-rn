export interface TokenUsage {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}

export type FinishReason = 'stop' | 'length' | 'tool_call' | 'content_filter' | 'error';

export interface LLMResponse {
  content: string;
  tokenUsage?: TokenUsage;
  finishReason?: FinishReason;
  providerName?: string;
  modelName?: string;
}
