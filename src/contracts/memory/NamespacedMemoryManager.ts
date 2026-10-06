import type { MemoryEntry } from './MemoryEntry';
import type { MemoryManager } from './MemoryManager';

/**
 * Memory manager with namespace-scoped operations.
 *
 * Namespaced operations use distinct method names (aligned with the Flutter
 * contract) so they never collide with the base `MemoryManager` signatures.
 */
export interface NamespacedMemoryManager extends MemoryManager {
  addToNamespace(entry: MemoryEntry, namespace: string): Promise<void>;
  retrieveFromNamespace(query: string, namespace: string, limit?: number): Promise<MemoryEntry[]>;
  deleteEntry(id: string, namespace: string): Promise<void>;
  clearNamespace(namespace: string): Promise<void>;
}
