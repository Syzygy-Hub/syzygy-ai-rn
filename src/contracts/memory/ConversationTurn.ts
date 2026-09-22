export type TurnRole = 'user' | 'assistant' | 'system' | 'tool';

export interface ConversationTurn {
  role: TurnRole;
  content: string;
  timestamp: number; // number (Unix ms) — intentional for RN v1.0.0; no SyzygyTimestamp equivalent in TypeScript
  metadata?: Record<string, string>;
}
