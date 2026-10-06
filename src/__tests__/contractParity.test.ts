/**
 * contractParity.test.ts
 *
 * Compile-time shape checks for all contracts.
 * These tests use type-assignment patterns so that TypeScript itself
 * is the assertion engine — a type error here means a contract is broken.
 */

import type { JSONValue, JSONObject, JSONArray } from '../types/JSONValue';
import { SyzygyTimestamp, createSyzygyTimestamp } from 'syzygy-foundation-rn';
import type { AgentTool } from '../contracts/agent/AgentTool';
import type { ToolCall } from '../contracts/llm/ToolCall';
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

// ── ToolCall ───────────────────────────────────────────────────────────────

const _toolCallReq: ToolCall = {
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
  timestamp: createSyzygyTimestamp(1_700_000_000_000),
  type: 'conversation',
};

// ── ConversationTurn ───────────────────────────────────────────────────────

const _turn: ConversationTurn = {
  role: 'user',
  content: 'hello',
  timestamp: SyzygyTimestamp.now(),
};

// ── MemoryManager (structural check) ──────────────────────────────────────

type _MemoryManagerShape = Pick<
  NamespacedMemoryManager,
  | 'addToNamespace'
  | 'retrieveFromNamespace'
  | 'deleteEntry'
  | 'clearNamespace'
  | 'retrieve'
  | 'clear'
>;
const _mmShape: _MemoryManagerShape = {
  addToNamespace: async (e: MemoryEntry, ns: string) => {
    void e;
    void ns;
  },
  retrieveFromNamespace: async (q: string, ns: string, limit?: number) => {
    void q;
    void ns;
    void limit;
    return [];
  },
  deleteEntry: async (id: string, ns: string) => {
    void id;
    void ns;
  },
  clearNamespace: async (ns: string) => {
    void ns;
  },
  retrieve: async (q: string, limit: number) => {
    void q;
    void limit;
    return [];
  },
  clear: async () => undefined,
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
    expect(Array.isArray(_jsonArr)).toBe(true);
    expect(typeof _jsonObj).toBe('object');
    expect(typeof _jsonObject).toBe('object');
    expect(Array.isArray(_jsonArray)).toBe(true);
  });

  it('RAGChunk has id field', () => {
    expect(_ragChunk.id).toBe('chunk-1');
    expect(_ragChunk.source).toBe('doc.pdf');
    expect(_ragChunk.documentId).toBe('doc-1');
  });

  it('MemoryEntry.timestamp is a SyzygyTimestamp', () => {
    expect(_entry.timestamp.millisecondsSinceEpoch).toBe(1_700_000_000_000);
    expect(_entry.timestamp.secondsSinceEpoch).toBe(1_700_000_000);
    expect(_entry.timestamp.toDate()).toBeInstanceOf(Date);
  });

  it('ConversationTurn.timestamp is a SyzygyTimestamp', () => {
    expect(typeof _turn.timestamp.millisecondsSinceEpoch).toBe('number');
    expect(_turn.timestamp.toDate()).toBeInstanceOf(Date);
  });

  it('ToolCall can be constructed', () => {
    const call: ToolCall = { id: 'tc-9', name: 'search', arguments: { q: 'x', n: 2 } };
    expect(call.id).toBe('tc-9');
    expect(call.name).toBe('search');
    expect(call.arguments).toEqual({ q: 'x', n: 2 });
  });

  it('LLMRequest accepts tools', () => {
    const tool: AgentTool = {
      name: 'search',
      description: 'Search',
      inputSchema: { type: 'object' },
      execute: async () => ({ output: 'ok' }),
    };
    const req: LLMRequest = { messages: [], model: 'm', tools: [tool] };
    expect(req.tools).toHaveLength(1);
  });

  it('LLMRequest without tools leaves tools undefined', () => {
    const req: LLMRequest = { messages: [], model: 'm' };
    expect(req.tools).toBeUndefined();
  });

  it('LLMResponse accepts toolCalls', () => {
    const res: LLMResponse = {
      content: '',
      finishReason: 'tool_call',
      toolCalls: [{ id: 'tc-1', name: 'search', arguments: {} }],
    };
    expect(res.toolCalls?.[0].name).toBe('search');
  });

  it('LLMResponse without toolCalls leaves toolCalls undefined', () => {
    expect(_res.toolCalls).toBeUndefined();
  });

  it('MessageRole includes tool value', () => {
    expect(_role).toBe('tool');
  });

  it('RAGOptions accepts scoreThreshold', () => {
    expect(_ragOpts.scoreThreshold).toBe(0.7);
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

  it('NamespacedMemoryManager shape has distinct namespaced methods', () => {
    expect(typeof _mmShape.addToNamespace).toBe('function');
    expect(typeof _mmShape.retrieveFromNamespace).toBe('function');
    expect(typeof _mmShape.deleteEntry).toBe('function');
    expect(typeof _mmShape.clearNamespace).toBe('function');
    expect(typeof _mmShape.retrieve).toBe('function');
    expect(typeof _mmShape.clear).toBe('function');
  });
});
