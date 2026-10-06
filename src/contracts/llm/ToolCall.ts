import type { JSONObject } from '../../types/JSONValue';

/**
 * A tool invocation requested by the model, carried on
 * {@link LLMResponse.toolCalls} and {@link LLMMessage.toolCalls}.
 */
export interface ToolCall {
  /** Provider-assigned identifier, echoed back in `ToolCallResult.toolCallId`. */
  id: string;
  /** Name of the tool to invoke. */
  name: string;
  /** JSON arguments for the tool. */
  arguments: JSONObject;
}
