# My Engineer Permission Templates (manual copy only)

Nothing in this directory grants GitHub/GitLab roles, installs credentials, or automatically changes local agent permissions.

- Claude: manually merge [safe JSON](./claude/claude-safe.json) into **local** `.claude/settings.local.json`; [optional JSONC](./claude/claude-optional.jsonc) is reference text, not valid JSON until comments are removed. Local settings files should remain uncommitted.
- Codex: manually merge [config TOML](./codex/config-safe.toml) into `~/.codex/config.toml`. Codex uses sandbox + approval settings rather than these Claude command patterns.
- Plane: follow [MCP setup](./plane/plane-mcp.md); OAuth != work-item write approval.
- AGENTS.md: review [optional workflow policy](./notes/AGENTS-permission-policy.md), but it is guidance, not access control.

## Optional commands and consequences

| Command | Default | If you opt into automatic tool allowance |
| --- | --- | --- |
| git add/commit | Ask | Stage possibly unrelated/secret data; create local history |
| git push | Ask | Publish code; may trigger CI/CD, notifications or deployment |
| gh pr create / glab mr create | Ask | Create team-visible PR/MR; trigger workflows/reviews |
| gh pr ready | Ask | Mark Draft PR Ready; trigger downstream automation |
| gh pr merge / glab mr merge | Ask | Merge into target; may trigger production deploy |
| go mod tidy / go generate | Ask | Modify dependencies/files; generators may run arbitrary code |

Even with tool auto-allow enabled, **Human Gate decisions stay mandatory** under the accepted My Engineer workflow. Never broad-allow `Bash(*)` or `Bash(git *)`. Test policies on a disposable repository, and keep credentials out of public files.
