import type { SyzygyTimestamp } from 'syzygy-foundation-rn';

export interface MemoryEntry {
  id: string;
  content: string;
  metadata?: Record<string, string>;
  timestamp: SyzygyTimestamp;
  type: string;
}
