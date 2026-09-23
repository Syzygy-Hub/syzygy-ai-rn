# Changelog

All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

## [1.1.0] - 2026-09-24

### Added
- `id?: string` on RAGChunk — optional chunk identifier (required in v2.0.0)
- `JSONValue`, `JSONObject`, `JSONArray` — shared JSON value model in `src/types/JSONValue.ts`
- `ToolCallRequest` — structured tool call contract (id, name, arguments as JSONObject)
- `ToolCallResult` — tool call result contract (toolCallId, content, isError)
- `AIError` — typed error class with `AIErrorCode` union
- `StreamContract` — namespace documenting the stream lifecycle as JSDoc
- `contractParity.test.ts` — compile-time and runtime shape checks for all v1.1.0 contracts
- `.npmignore` — excludes src/, tests, config files from published package

### Changed
- `LLMMessage` — added `toolCalls?: ToolCallRequest[]` and `toolCallResult?: ToolCallResult`
- `MessageRole` — added `'tool'` variant (`'tool_call'` was removed; use `toolCalls` on `LLMMessage` instead)
- `LLMRequest` — added `requestId?: string` and `correlationId?: string`
- `LLMResponse` — added `providerName?: string` and `modelName?: string`
- `LLMChunk` — added `providerName?: string` and `modelName?: string`
- `RAGChunk` — added `id: string`, `source?: string`, `documentId?: string`
- `RAGOptions` — added `maxResults?: number`
- `MemoryManager` — base interface kept to non-namespaced signatures; namespaced overloads moved to `NamespacedMemoryManager`
- `MemoryEntry` — added `timestampMs?: number` deprecation bridge
- `ConversationTurn` — added `timestampMs?: number` deprecation bridge
- `ci.yml` — upgraded node to 24, `npm install` → `npm ci`, added typecheck and build steps
- `release.yml` — added typecheck and build steps before publish
- `index.ts` — exports all new types

### Deprecated
- `MemoryEntry.timestamp` — use `timestampMs`; will be replaced by `SyzygyTimestamp` in v2.0
- `ConversationTurn.timestamp` — use `timestampMs`; will be replaced by `SyzygyTimestamp` in v2.0

### Removed
- `src/contracts/stream/` empty directory (only contained `.gitkeep`)

## [1.0.0] - 2026-09-22

### Added
- `LLMProvider` — abstract interface for LLM backend integration
- `AgentProtocol` — ReAct loop contract (Reason → Act → Observe)
- `RAGProvider` — retrieval-augmented generation interface
- `MemoryManager` — conversation context management contract
- `StreamHandler` — token streaming abstraction
