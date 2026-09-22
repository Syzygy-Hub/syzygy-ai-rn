export type MessageRole = 'user' | 'assistant' | 'system' | 'tool';

export interface LLMMessage {
  role: MessageRole;
  content: string;
}

export interface LLMRequest {
  messages: LLMMessage[];
  model: string;
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  stopSequences?: string[];
}
