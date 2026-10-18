# Plane MCP / OAuth

Official endpoint: https://mcp.plane.so/http/mcp

## Codex
```sh
codex mcp add plane --url https://mcp.plane.so/http/mcp
codex mcp login plane
codex mcp list
```

## Claude Code
```sh
claude mcp add --transport http plane https://mcp.plane.so/http/mcp
claude mcp list
```
Authenticate interactively through the supported client OAuth flow. Exact CLI behavior varies by installed version.

OAuth is connectivity, not permission to mutate all work items. Scope every write to verified workspace/project/work item; check the actual role and tool permissions. Create/update/comment can change team-visible records or send notifications. Delete, bulk edits, movement across projects and admin changes stay OFF without separate human approval. Never invent MCP tool permission names; inspect the connected tools first.
