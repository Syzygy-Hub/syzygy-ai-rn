import type { AgentRequest } from './AgentRequest';
import type { AgentResult } from './AgentResult';

export interface AgentProtocol {
  run(request: AgentRequest): Promise<AgentResult>;
}
