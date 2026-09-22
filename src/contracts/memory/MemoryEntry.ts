export interface MemoryEntry {
  id: string;
  content: string;
  metadata?: Record<string, string>;
  timestamp: number; // number (Unix ms) — intentional for RN v1.0.0; no SyzygyTimestamp equivalent in TypeScript
  type: string;
}
