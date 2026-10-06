import { DEFAULT_MAX_STEPS, resolveMaxSteps } from '../contracts/agent/AgentRequest';

describe('resolveMaxSteps', () => {
  it('DEFAULT_MAX_STEPS is 10', () => {
    expect(DEFAULT_MAX_STEPS).toBe(10);
  });

  it('returns default when undefined', () => {
    expect(resolveMaxSteps()).toBe(10);
    expect(resolveMaxSteps(undefined)).toBe(10);
  });

  it('clamps 0 to 1', () => {
    expect(resolveMaxSteps(0)).toBe(1);
  });

  it('clamps negative values to 1', () => {
    expect(resolveMaxSteps(-5)).toBe(1);
  });

  it('passes through valid values', () => {
    expect(resolveMaxSteps(25)).toBe(25);
  });

  it('returns default for NaN', () => {
    expect(resolveMaxSteps(NaN)).toBe(10);
  });
});
