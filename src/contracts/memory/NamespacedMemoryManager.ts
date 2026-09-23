import { MemoryEntry } from './MemoryEntry';
import { MemoryManager } from './MemoryManager';

export interface NamespacedMemoryManager extends MemoryManager {
  add(entry: MemoryEntry): Promise<void>;
  add(entry: MemoryEntry, namespace: string): Promise<void>;
  retrieve(query: string, limit: number): Promise<MemoryEntry[]>;
  retrieve(query: string, namespace: string, limit?: number): Promise<MemoryEntry[]>;
  delete(id: string, namespace: string): Promise<void>;
  clear(): Promise<void>;
  clear(namespace: string): Promise<void>;
}
