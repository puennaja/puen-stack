# puen-stack Skills (v0.1 drafts)

**English** · [ภาษาไทย](./README.th.md) · [Codex/Claude setup (EN)](../setup/README.md) · [Setup (TH)](../setup/README.th.md)

One directory per Skill, with a single English **`SKILL.md` entry point** shared by Codex and Claude Code. Keep actionable agent instructions in English; the setup and human-facing catalog may be bilingual.

| Skill | Trigger | Skill instructions (EN) | Synthetic acceptance scenarios |
| --- | --- | --- | --- |
| **git-commit** | Review or create a scoped **local** Git commit in the assigned repo | [SKILL.md](./git-commit/SKILL.md) | [TESTS.md](./git-commit/TESTS.md) |
| **gitlab-draft-mr** | Prepare/create a **single** GitLab Draft MR after **per-MR explicit human source/target confirmation** | [SKILL.md](./gitlab-draft-mr/SKILL.md) | [TESTS.md](./gitlab-draft-mr/TESTS.md) |

**Status:** v0.1 Draft; scenarios documented but **Not run**. No credential/network permissions, installer scripts, real GitLab integration or CI hooks are supplied. Agent setup stays an **operator-run** task. Never treat executing a Skill as permission to publish, merge or deploy.

**Standards:** [AGENTS.md](../AGENTS.md) · [Contributing](../docs/CONTRIBUTING.md) · [Accepted engineering workflow source](https://github.com/puennaja/puen-engineer/tree/master/workflows). Keep GitLab self-managed host, credentials and business data out of this public repository.
