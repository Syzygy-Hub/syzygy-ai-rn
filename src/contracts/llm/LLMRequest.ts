import type { AgentTool } from '../agent/AgentTool';
import type { ToolCall } from './ToolCall';
import type { ToolCallResult } from './ToolCallResult';

export type MessageRole = 'user' | 'assistant' | 'system' | 'tool';

export interface LLMMessage {
  role: MessageRole;
  content: string;
  toolCalls?: ToolCall[];
  toolCallResult?: ToolCallResult;
}

export interface LLMRequest {
  messages: LLMMessage[];
  model: string;
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  stopSequences?: string[];
  /** Tools the model may call. When omitted, no tools are offered. */
  tools?: AgentTool[];
  requestId?: string;
  correlationId?: string;
}
