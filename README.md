# Agent Policy Authorization Engine

A declarative policy and authorization engine for autonomous AI agents.

Before an agent performs a consequential action, this project answers: is the agent authorized to perform that action under the current context?

## MVP
- Agent, action, and resource matching
- Wildcards
- Allow/deny effects
- Explicit deny precedence
- Default deny
- Context conditions: equality, membership, existence, numeric limits
- Auditable decision reasons
- TypeScript library and CLI

## Quick start
npm install
npm test
npm run build

This is an authorization primitive, not an AI safety oracle. It enforces explicit constraints; it does not determine whether an agent's reasoning is correct.

License: MIT
