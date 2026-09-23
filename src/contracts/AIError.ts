export type AIErrorCode =
  | 'authentication_failure'
  | 'rate_limited'
  | 'network_error'
  | 'invalid_request'
  | 'provider_failure'
  | 'cancelled';

export class AIError extends Error {
  constructor(
    public readonly code: AIErrorCode,
    message: string,
    public readonly retryAfterMs?: number, // retry-after in milliseconds
  ) {
    super(message);
    this.name = 'AIError';
  }
}
