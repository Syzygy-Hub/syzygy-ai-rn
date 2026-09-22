export interface AgentStep {
  action: string;
  input: Record<string, unknown>;
  output: string;
  metadata?: Record<string, string>;
}
