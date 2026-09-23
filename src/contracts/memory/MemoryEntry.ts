export interface MemoryEntry {
  id: string;
  content: string;
  metadata?: Record<string, string>;
  /**
   * @deprecated Use `timestampMs` now. Migration to `SyzygyTimestamp` from
   * `syzygy-foundation-rn` is planned for v2.0, at which point this field
   * will be removed.
   */
  timestamp: number;
  /**
   * v1.1.0 deprecation bridge — same value as `timestamp` (milliseconds since epoch).
   * Prefer this over `timestamp`; both will be replaced by `SyzygyTimestamp` in v2.0.
   */
  timestampMs?: number;
  type: string;
}
