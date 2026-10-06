import type { SyzygyTimestamp } from 'syzygy-foundation-rn';

export type TurnRole = 'user' | 'assistant' | 'system' | 'tool';

export interface ConversationTurn {
  role: TurnRole;
  content: string;
  timestamp: SyzygyTimestamp;
  metadata?: Record<string, string>;
}
