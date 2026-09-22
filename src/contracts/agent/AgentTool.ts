export type ToolSchema = Record<string, unknown>;
export type ToolInput = Record<string, unknown>;

export interface ToolResult {
  output: string;
  isError?: boolean;
  metadata?: Record<string, string>;
}

export interface AgentTool {
  name: string;
  description: string;
  inputSchema: ToolSchema;
  execute(input: ToolInput): Promise<ToolResult>;
}
