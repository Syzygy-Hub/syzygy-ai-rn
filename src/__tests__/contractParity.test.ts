/**
 * contractParity.test.ts
 *
 * Compile-time shape checks for all v1.1.0 contracts.
 * These tests use type-assignment patterns so that TypeScript itself
 * is the assertion engine — a type error here means a contract is broken.
 */

import type { JSONValue, JSONObject, JSONArray } from '../types/JSONValue';
import type { ToolCallRequest } from '../contracts/llm/ToolCallRequest';
import type { ToolCallResult } from '../contracts/llm/ToolCallResult';
import type { LLMMessage, LLMRequest, MessageRole } from '../contracts/llm/LLMRequest';
import type { LLMResponse, TokenUsage, FinishReason } from '../contracts/llm/LLMResponse';
import type { LLMChunk } from '../contracts/llm/LLMChunk';
import type { AIErrorCode } from '../contracts/AIError';
import { AIError } from '../contracts/AIError';
import type { RAGChunk } from '../contracts/rag/RAGChunk';
import type { RAGOptions } from '../contracts/rag/RAGProvider';
import type { MemoryEntry } from '../contracts/memory/MemoryEntry';
import type { ConversationTurn } from '../contracts/memory/ConversationTurn';
import type { NamespacedMemoryManager } from '../contracts/memory/NamespacedMemoryManager';

// ── JSONValue ──────────────────────────────────────────────────────────────

const _jsonNull: JSONValue = null;
const _jsonBool: JSONValue = true;
const _jsonNum: JSONValue = 42;
const _jsonStr: JSONValue = 'hello';
const _jsonArr: JSONValue = [1, 'two', null];
const _jsonObj: JSONValue = { a: 1, b: 'x' };
const _jsonObject: JSONObject = { key: 'value' };
const _jsonArray: JSONArray = [1, 2, 3];

// ── ToolCallRequest ────────────────────────────────────────────────────────

const _toolCallReq: ToolCallRequest = {
  id: 'tc-1',
  name: 'search',
  arguments: { query: 'hello' },
};

// ── ToolCallResult ─────────────────────────────────────────────────────────

const _toolCallRes: ToolCallResult = {
  toolCallId: 'tc-1',
  content: 'result text',
  isError: false,
};

// ── LLMRequest / LLMMessage ────────────────────────────────────────────────

const _role: MessageRole = 'tool';
const _msg: LLMMessage = {
  role: 'assistant',
  content: 'hi',
  toolCalls: [_toolCallReq],
  toolCallResult: _toolCallRes,
};
const _req: LLMRequest = {
  messages: [_msg],
  model: 'gpt-4',
  requestId: 'req-1',
  correlationId: 'corr-1',
};

// ── LLMResponse ────────────────────────────────────────────────────────────

const _usage: TokenUsage = { promptTokens: 10, completionTokens: 20, totalTokens: 30 };
const _finish: FinishReason = 'stop';
const _res: LLMResponse = {
  content: 'answer',
  tokenUsage: _usage,
  finishReason: _finish,
  providerName: 'openai',
  modelName: 'gpt-4',
};

// ── LLMChunk ───────────────────────────────────────────────────────────────

const _chunk: LLMChunk = {
  content: 'tok',
  providerName: 'openai',
  modelName: 'gpt-4',
};

// ── AIError ────────────────────────────────────────────────────────────────

const _errCode: AIErrorCode = 'rate_limited';
const _err = new AIError(_errCode, 'Too many requests', 5000);
const _errNoRetry = new AIError('network_error', 'Timeout');

// ── RAGChunk ───────────────────────────────────────────────────────────────

const _ragChunk: RAGChunk = {
  id: 'chunk-1',
  content: 'relevant text',
  score: 0.92,
  source: 'doc.pdf',
  documentId: 'doc-1',
};

// ── RAGOptions ─────────────────────────────────────────────────────────────

const _ragOpts: RAGOptions = {
  scoreThreshold: 0.7,
};

// ── MemoryEntry ────────────────────────────────────────────────────────────

const _entry: MemoryEntry = {
  id: 'mem-1',
  content: 'user said hello',
  timestamp: Date.now(),
  timestampMs: Date.now(),
  type: 'conversation',
};

// ── ConversationTurn ───────────────────────────────────────────────────────

const _turn: ConversationTurn = {
  role: 'user',
  content: 'hello',
  timestamp: Date.now(),
  timestampMs: Date.now(),
};

// ── MemoryManager (structural check) ──────────────────────────────────────

type _MemoryManagerShape = Pick<NamespacedMemoryManager, 'delete' | 'clear'>;
const _mmShape: _MemoryManagerShape = {
  delete: async (_id: string, _ns: string) => {},
  clear: async (_ns?: string) => {},
};

// ── Runtime smoke test ─────────────────────────────────────────────────────

describe('contractParity', () => {
  it('AIError carries code and message', () => {
    expect(_err.code).toBe('rate_limited');
    expect(_err.message).toBe('Too many requests');
    expect(_err.retryAfterMs).toBe(5000);
    expect(_err.name).toBe('AIError');
  });

  it('AIError without retryAfterMs is undefined', () => {
    expect(_errNoRetry.retryAfterMs).toBeUndefined();
  });

  it('JSONValue accepts all scalar types', () => {
    expect(_jsonNull).toBeNull();
    expect(_jsonBool).toBe(true);
    expect(_jsonNum).toBe(42);
    expect(_jsonStr).toBe('hello');
  });

  it('RAGChunk has id field', () => {
    expect(_ragChunk.id).toBe('chunk-1');
    expect(_ragChunk.source).toBe('doc.pdf');
    expect(_ragChunk.documentId).toBe('doc-1');
  });

  it('MemoryEntry has timestampMs bridge field', () => {
    expect(_entry.timestampMs).toBeDefined();
  });

  it('ConversationTurn has timestampMs bridge field', () => {
    expect(_turn.timestampMs).toBeDefined();
  });

  it('LLMRequest has requestId and correlationId', () => {
    expect(_req.requestId).toBe('req-1');
    expect(_req.correlationId).toBe('corr-1');
  });

  it('LLMResponse has providerName and modelName', () => {
    expect(_res.providerName).toBe('openai');
    expect(_res.modelName).toBe('gpt-4');
  });

  it('LLMChunk has providerName and modelName', () => {
    expect(_chunk.providerName).toBe('openai');
    expect(_chunk.modelName).toBe('gpt-4');
  });

  it('MemoryManager shape has delete and clear', () => {
    expect(typeof _mmShape.delete).toBe('function');
    expect(typeof _mmShape.clear).toBe('function');
  });
});
