import type { LLMRequest, LLMMessage } from '../contracts/llm/LLMRequest';
import type { Embedding } from '../contracts/embeddings/Embedding';
import type { RAGChunk } from '../contracts/rag/RAGChunk';
import type { AgentResult } from '../contracts/agent/AgentResult';
import type { MemoryEntry } from '../contracts/memory/MemoryEntry';

describe('SyzygyAI Contract Smoke Tests', () => {
  it('LLMRequest is constructible', () => {
    const msg: LLMMessage = { role: 'user', content: 'hi' };
    const req: LLMRequest = { messages: [msg], model: 'test' };
    expect(req.model).toBe('test');
  });

  it('Embedding has dimensions', () => {
    const emb: Embedding = { values: [0.1, 0.2], dimensions: 2 };
    expect(emb.dimensions).toBe(2);
  });

  it('RAGChunk has score', () => {
    const chunk: RAGChunk = { id: 'c1', content: 'test', score: 0.9 };
    expect(chunk.score).toBe(0.9);
  });

  it('AgentResult has finalAnswer', () => {
    const result: AgentResult = { finalAnswer: '42', steps: [] };
    expect(result.finalAnswer).toBe('42');
  });

  it('MemoryEntry has type', () => {
    const entry: MemoryEntry = {
      id: '1',
      content: 'fact',
      timestamp: Date.now(),
      type: 'fact',
    };
    expect(entry.type).toBe('fact');
  });
});
