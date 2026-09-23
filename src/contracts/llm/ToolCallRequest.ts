import type { JSONObject } from '../../types/JSONValue';

export interface ToolCallRequest {
  id: string;
  name: string;
  arguments: JSONObject;
}
