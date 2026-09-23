/**
 * StreamContract — documents the stream lifecycle for LLMProvider implementations.
 *
 * Lifecycle:
 *   1. OPEN    — The provider accepts the request and begins emitting LLMChunk values.
 *   2. CHUNK   — Zero or more LLMChunk objects arrive; each may carry content,
 *                toolCallDelta, or both.  finishReason is absent on intermediate chunks.
 *   3. FINAL   — Exactly one chunk arrives with a non-null finishReason, signalling the
 *                end of the stream.  No further chunks are emitted after this point.
 *   4. CLOSED  — The AsyncIterable/Observable completes normally (no error thrown).
 *
 * Error semantics:
 *   - Recoverable errors (rate-limit, transient network) SHOULD be surfaced as AIError
 *     thrown from the iterator so callers can apply back-off logic.
 *   - The stream MUST NOT silently swallow errors; any thrown value ends the iteration.
 *
 * Cancellation:
 *   - Callers signal cancellation by breaking out of the for-await loop or by calling
 *     return() on the iterator.  Providers SHOULD honour this by releasing resources.
 *
 * Ordering guarantee:
 *   - Chunks MUST be delivered in the order they were emitted by the underlying model.
 *   - Providers MUST NOT reorder or buffer-then-reorder chunks.
 */
export namespace StreamContract {
  /** Marker type: a value emitted during the CHUNK phase. */
  export type ChunkPhase = 'chunk';

  /** Marker type: a value emitted during the FINAL phase. */
  export type FinalPhase = 'final';

  /** Union of valid stream phases after OPEN. */
  export type Phase = ChunkPhase | FinalPhase;
}
