import type { MemoryEntry } from './MemoryEntry';

export interface MemoryManager {
  add(entry: MemoryEntry): Promise<void>;
  retrieve(query: string, limit: number): Promise<MemoryEntry[]>;
  clear(): Promise<void>;
}
