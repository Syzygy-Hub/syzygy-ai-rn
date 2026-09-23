import type { ToolCallRequest } from './ToolCallRequest';
import type { ToolCallResult } from './ToolCallResult';

export type MessageRole = 'user' | 'assistant' | 'system' | 'tool';

export interface LLMMessage {
  role: MessageRole;
  content: string;
  toolCalls?: ToolCallRequest[];
  toolCallResult?: ToolCallResult;
}

export interface LLMRequest {
  messages: LLMMessage[];
  model: string;
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  stopSequences?: string[];
  requestId?: string;
  correlationId?: string;
}
