[![React Native](https://img.shields.io/badge/React%20Native-TypeScript-7F77DD?style=flat)](https://reactnative.dev/) [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-1D9E75?logo=typescript&logoColor=white&style=flat)](https://typescriptlang.org) [![CI](https://img.shields.io/github/actions/workflow/status/Syzygy-Hub/syzygy-ai-rn/ci.yml?label=ci&style=flat)](https://github.com/Syzygy-Hub/syzygy-ai-rn/actions/workflows/ci.yml) [![Version](https://img.shields.io/badge/version-3.0.0-D85A30?style=flat)](https://github.com/Syzygy-Hub/syzygy-ai-rn/releases) [![License](https://img.shields.io/badge/License-MIT-green?style=flat)](LICENSE)

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/Syzygy-Hub/.github/main/brand/assets/banners/syzygy-banner-dark-1200.png">
  <img src="https://raw.githubusercontent.com/Syzygy-Hub/.github/main/brand/assets/banners/syzygy-banner-light-1200.png" alt="Syzygy" width="600">
</picture>

# syzygy-ai-rn

AI layer contracts for the Syzygy React Native ecosystem — providing LLMProvider, AgentProtocol, EmbeddingProvider, RAGProvider, and MemoryManager interfaces.

## About

syzygy-ai-rn defines the AI integration contracts that sit on top of the Syzygy Foundation layer. It provides abstract interfaces for LLM backends, agentic ReAct loops, retrieval-augmented generation, text embeddings, and conversation memory management. Nothing in this layer has concrete behaviour — swap any AI provider by conforming to these contracts.

> **v3.0.0 — Contract Alignment with Foundation 3.0.0**
> This release moves memory timestamps to `SyzygyTimestamp`, moves RAG result limiting to `RAGOptions.maxResults`, consolidates tool calling on a single `ToolCall` contract, and gives `NamespacedMemoryManager` distinct method names. No concrete implementations are included — swap any AI provider by conforming to these contracts.

## Role in the Syzygy Ecosystem

`syzygy-ai-rn` is the AI peer layer — it depends only on `syzygy-foundation-rn` and defines the contracts that AI-powered features consume.

Full ecosystem architecture: [ecosystem-fragment.md](https://github.com/Syzygy-Hub/.github/blob/main/docs/ecosystem-fragment.md)

### Contracts

| Contract | Description |
|---|---|
| `LLMProvider` | Abstract interface for LLM backend integration |
| `AgentProtocol` | ReAct loop contract (Reason → Act → Observe) |
| `RAGProvider` | Retrieval-augmented generation interface |
| `MemoryManager` | Conversation context management contract |
| `EmbeddingProvider` | Abstract interface for generating text embeddings |

## What's New in v3.0.0

- **Breaking:** requires `syzygy-foundation-rn` `>=3.0.0`.
- **Breaking:** `NamespacedMemoryManager` uses distinct method names (`addToNamespace`, `retrieveFromNamespace`, `deleteEntry`, `clearNamespace`) instead of overloads, matching the Flutter contract.
- **Breaking:** `RAGProvider.retrieve(query, options?)` no longer takes a positional result-count parameter. Use `RAGOptions.maxResults` (default `DEFAULT_MAX_RESULTS` = 10, values < 1 clamped to 1 via `resolveMaxResults()`).
- **Breaking:** `MemoryEntry.timestamp` and `ConversationTurn.timestamp` are now `SyzygyTimestamp` (from `syzygy-foundation-rn`) instead of `number`; the former millisecond bridge field is removed.
- **Breaking:** tool calling is consolidated on a single `ToolCall` contract (`id`, `name`, `arguments: JSONObject`); the former separate request type is removed and `LLMMessage.toolCalls` is `ToolCall[]`.
- `LLMRequest.tools?: AgentTool[]` and `LLMResponse.toolCalls?: ToolCall[]` enable tool calling at the LLM layer.
- `DEFAULT_MAX_STEPS` and `resolveMaxSteps()` helper for `AgentRequest.maxSteps` (default 10, values < 1 clamped to 1).

## What's New in v1.1.0

- **Structured Tool Calling** — `ToolCall` and `ToolCallResult` contracts; `LLMMessage` now carries `toolCalls` and `toolCallResult`; `MessageRole` gains `'tool'`.
- **Typed Error Model** — `AIError` class with `AIErrorCode` union (`authentication_failure`, `rate_limited`, `network_error`, `invalid_request`, `provider_failure`, `cancelled`).
- **Shared JSON Value Model** — `JSONValue`, `JSONObject`, `JSONArray`; used by `ToolCall.arguments`. (`AgentTool`/`AgentStep` still use `Record<string, unknown>`.)
- **Operational Metadata** — `requestId`/`correlationId` on `LLMRequest`; `providerName`/`modelName` on `LLMResponse` and `LLMChunk`.
- **Stream Semantics** — `StreamContract` namespace documents the stream lifecycle (OPEN → CHUNK → FINAL → CLOSED).
- **RAG improvements** — `RAGChunk` gains optional `id?`, `source`, `documentId`.
- **Memory improvements** — new `NamespacedMemoryManager` interface extends `MemoryManager` with `addToNamespace`/`retrieveFromNamespace`/`deleteEntry`/`clearNamespace`; `MemoryEntry` and `ConversationTurn` gained a millisecond bridge field (removed in v3.0.0, see above).

- **Contract parity tests** — `contractParity.test.ts` compile-checks all contract shapes.


### RAG

```typescript
const chunks = await rag.retrieve('how do I reset my password?', {
  maxResults: 5,        // default 10
  scoreThreshold: 0.7,
})
```

### Tool calling

```typescript
const response = await llm.complete({ messages, model, tools: [searchTool] })
for (const call of response.toolCalls ?? []) {
  // call.id, call.name, call.arguments
}
```

### Timestamps

```typescript
import { SyzygyTimestamp, createSyzygyTimestamp } from 'syzygy-foundation-rn'

const entry: MemoryEntry = { id: '1', content: 'fact', type: 'fact', timestamp: SyzygyTimestamp.now() }
const fixed = createSyzygyTimestamp(1_700_000_000_000)
```

## Release Process

Releases follow the Syzygy tag-push release flow:

1. Create a `release/X.X.X` branch
2. Bump the version in `syzygy.yml`, `package.json`, the README badge, and `CHANGELOG.md`
3. Open a PR to `main` and wait for CI to pass
4. Merge the PR
5. Push the tag: `git tag X.X.X` and `git push origin X.X.X`

For the full release standard see the [Syzygy-Hub/.github release standard](https://github.com/Syzygy-Hub/.github/blob/main/engineering/standards/release-standard.md).

## Platforms

| Platform | Min Version | Package Manager | Status |
|---|---|---|---|
| React Native | 0.71+ | npm | ✅ Supported |

## Requirements

- React Native 0.71+
- TypeScript 5+
- Node.js 20+
- syzygy-foundation-rn 3.0.0+

## Installation

```bash
npm install syzygy-ai-rn
```

```typescript
import { LLMProvider, AgentProtocol } from 'syzygy-ai-rn'
```

## Architecture

**Depends on:** syzygy-foundation-rn

**Used by:** AI-powered features in the Syzygy React Native ecosystem

For the full ecosystem architecture see [syzygy-ecosystem.md](https://github.com/Syzygy-Hub/.github/blob/main/engineering/architecture/syzygy-ecosystem.md).

## Development Setup

After cloning the repo, install the pre-push hook to run typecheck and lint before every push:

```bash
bash scripts/install-hooks.sh
```

The hook blocks pushes if `tsc --noEmit` or `eslint src/` fails. To bypass in an emergency: `git push --no-verify`.

## Contributing

Contributions are welcome. Please follow the [Syzygy engineering standards](https://github.com/Syzygy-Hub/.github/tree/main/engineering/standards) when submitting pull requests.

### Local Development

| Script | Description |
|--------|-------------|
| `npm run build` | Compile TypeScript to `dist/` |
| `npm run clean` | Remove compiled output |
| `npm run lint` | Run ESLint |
| `npm run test` | Run Jest tests |

> `prepare` and `prebuild` are lifecycle hooks that run automatically — no need to call them directly.

## License

MIT — see [LICENSE](LICENSE)
