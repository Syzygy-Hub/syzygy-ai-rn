[![React Native](https://img.shields.io/badge/React%20Native-TypeScript-7F77DD?style=flat)](https://reactnative.dev/) [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-1D9E75?logo=typescript&logoColor=white&style=flat)](https://typescriptlang.org) [![CI](https://img.shields.io/github/actions/workflow/status/Syzygy-Hub/syzygy-ai-rn/ci.yml?label=ci&style=flat)](https://github.com/Syzygy-Hub/syzygy-ai-rn/actions/workflows/ci.yml) [![Version](https://img.shields.io/badge/version-1.0.0-D85A30?style=flat)](https://github.com/Syzygy-Hub/syzygy-ai-rn/releases) [![License](https://img.shields.io/badge/License-MIT-green?style=flat)](LICENSE)

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/Syzygy-Hub/.github/main/brand/assets/banners/syzygy-banner-dark-1200.png">
  <img src="https://raw.githubusercontent.com/Syzygy-Hub/.github/main/brand/assets/banners/syzygy-banner-light-1200.png" alt="Syzygy" width="600">
</picture>

# syzygy-ai-rn

AI layer contracts for the Syzygy React Native ecosystem — providing LLMProvider, AgentProtocol, RAGProvider, MemoryManager, and StreamHandler interfaces.

## About

syzygy-ai-rn defines the AI integration contracts that sit on top of the Syzygy Foundation layer. It provides abstract interfaces for LLM backends, agentic ReAct loops, retrieval-augmented generation, conversation memory management, and token streaming. Nothing in this layer has concrete behaviour — swap any AI provider by conforming to these contracts.

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
| `StreamHandler` | Token streaming abstraction |

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
