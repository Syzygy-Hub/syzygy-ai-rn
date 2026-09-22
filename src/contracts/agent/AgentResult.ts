import type { TokenUsage } from '../llm/LLMResponse';
import type { AgentStep } from './AgentStep';

export interface AgentResult {
  finalAnswer: string;
  steps: AgentStep[];
  tokenUsage?: TokenUsage;
}
