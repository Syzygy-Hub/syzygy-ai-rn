import type { AgentTool } from './AgentTool';

/** Default maximum number of agent steps when `AgentRequest.maxSteps` is not provided. */
export const DEFAULT_MAX_STEPS = 10;

/**
 * Resolves the effective step limit for an agent run.
 *
 * - `undefined` or non-finite values (NaN, Infinity) yield {@link DEFAULT_MAX_STEPS}.
 * - Fractional values are floored; values below 1 are clamped to 1.
 */
export function resolveMaxSteps(maxSteps?: number): number {
  if (maxSteps === undefined || !Number.isFinite(maxSteps)) {
    return DEFAULT_MAX_STEPS;
  }
  return Math.max(1, Math.floor(maxSteps));
}

export interface AgentRequest {
  input: string;
  tools?: AgentTool[];
  /**
   * Maximum number of agent steps before the run is terminated.
   * Default: 10. Exceeding the limit yields a truncated response.
   * Values < 1 are clamped to 1. See {@link resolveMaxSteps}.
   */
  maxSteps?: number;
  metadata?: Record<string, string>;
}
