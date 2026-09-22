import type { AgentTool } from './AgentTool';

export interface AgentRequest {
  input: string;
  tools?: AgentTool[];
  maxSteps?: number; // v1.0.0 policy default: 10 (consumers should pass explicitly)
  metadata?: Record<string, string>;
}
