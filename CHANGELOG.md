# Changelog

All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

## [3.0.0] - 2026-10-06

### Breaking Changes
- **BREAKING:** requires `syzygy-foundation-rn` `>=3.0.0`; the package now imports `SyzygyTimestamp` from Foundation
- **BREAKING:** `ToolCallRequest` is removed and consolidated into `ToolCall` (identical shape: `id`, `name`, `arguments: JSONObject`); `LLMMessage.toolCalls` is now `ToolCall[]`. Replace `ToolCallRequest` imports with `ToolCall`
- **BREAKING:** `RAGProvider.retrieve(query, topK, options?)` is now `retrieve(query, options?)`; the `topK` parameter is removed in favour of `RAGOptions.maxResults`
- **BREAKING:** `MemoryEntry.timestamp` and `ConversationTurn.timestamp` changed from `number` to `SyzygyTimestamp` (`syzygy-foundation-rn`); the `timestampMs` bridge field is removed
- **BREAKING:** `NamespacedMemoryManager` no longer overloads `add`/`retrieve`/`delete`/`clear` (the `retrieve(query, namespace, limit?)` overload collided with `MemoryManager.retrieve(query, limit)`). It now exposes `addToNamespace`, `retrieveFromNamespace`, `deleteEntry` and `clearNamespace`, matching the Flutter contract

### Added
- `RAGOptions.maxResults?: number` (default 10), `DEFAULT_MAX_RESULTS` and `resolveMaxResults()` helper (`undefined`/non-finite yields the default; fractional values floored; values < 1 clamped to 1)
- `ToolCall` (`id`, `name`, `arguments: JSONObject`) in `contracts/llm/ToolCall.ts`, exported from the barrel and package root
- `LLMRequest.tools?: AgentTool[]` and `LLMResponse.toolCalls?: ToolCall[]`
- `DEFAULT_MAX_STEPS` (10) and `resolveMaxSteps()` — pure helper resolving `AgentRequest.maxSteps`; `undefined`/non-finite yields the default; fractional values floored; values < 1 are clamped to 1
- `typecheck` npm script (`tsc --noEmit`)
- `tsconfig.build.json` — build config that excludes `__tests__` from `dist/`
- `files` allowlist in `package.json` (`dist`, `README.md`, `CHANGELOG.md`, `LICENSE`)
- `ToolCall`, `ToolCallResult` and stream phase types (`ChunkPhase`, `FinalPhase`, `StreamPhase`) are now exported from the `contracts/llm` barrel

### Changed
- `AgentRequest.maxSteps` — documented default (10) and clamping behaviour
- `syzygy-foundation-rn` dependency bumped to `^3.0.0`; `syzygy.yml` foundation constraint is now `>=3.0.0`
- `ci.yml` now delegates to the Syzygy-Hub reusable `rn-ci.yml` workflow (Node 20)
- `release.yml` publish job aligned with Foundation (`npm ci` then `npm publish`; build runs via `prepare`)
- `build` script now uses `tsc --project tsconfig.build.json`

### Removed
- Stale `.gitkeep` placeholder files

## [1.1.0] - 2026-09-24

### Added
- `id?: string` on RAGChunk — optional chunk identifier
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
- `RAGChunk` — added `id?: string`, `source?: string`, `documentId?: string`
- `MemoryManager` — base interface kept to non-namespaced signatures; namespaced overloads moved to `NamespacedMemoryManager`
- `MemoryEntry` — added `timestampMs?: number` deprecation bridge
- `ConversationTurn` — added `timestampMs?: number` deprecation bridge
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

[Unreleased]: https://github.com/Syzygy-Hub/syzygy-ai-rn/compare/3.0.0...HEAD
[3.0.0]: https://github.com/Syzygy-Hub/syzygy-ai-rn/compare/1.1.0...3.0.0
[1.1.0]: https://github.com/Syzygy-Hub/syzygy-ai-rn/compare/1.0.0...1.1.0
[1.0.0]: https://github.com/Syzygy-Hub/syzygy-ai-rn/releases/tag/1.0.0
