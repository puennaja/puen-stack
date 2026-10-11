# puen-stack Skills (v0.1 Drafts)

**English** · [ภาษาไทย](./README.th.md) · [Setup (EN)](../setup/README.md) · [Setup (TH)](../setup/README.th.md)

A Skill has one **English `SKILL.md` entrypoint**, shared by Codex and Claude. No `SKILL.th.md` duplicates. Guides and human-facing explanations can remain bilingual.

| Skill | When to use | Skill (EN) | Test scenarios |
| --- | --- | --- | --- |
| **git-commit** | Scoped **local** commit; default message `[<subtask-id>] feat: <summary>` (repo convention overrides) | [SKILL.md](./git-commit/SKILL.md) | [TESTS](./git-commit/TESTS.md) |
| **gitlab-draft-mr** | Propose a GitLab Draft MR and require human approval for **each** source/target pair | [SKILL.md](./gitlab-draft-mr/SKILL.md) | [TESTS](./gitlab-draft-mr/TESTS.md) |
| **setup-puen-stack** | Inspect a repo and guide a human through tracker, Git flow and permission readiness | [SKILL.md](./setup-puen-stack/SKILL.md) | [TESTS](./setup-puen-stack/TESTS.md) |

**Installation:** Use the [safe setup script](../scripts/setup.mjs) from a reviewed local clone. Run `node scripts/setup.mjs --dry-run` first, then `node scripts/setup.mjs --yes` if the plan is correct. [CLI manual](../scripts/README.md).

**State:** The two execution Skills and the setup Skill remain **v0.1 Drafts pending live agent evaluation**. Installing them does **not** grant GitLab tokens, Push, protected branch changes, Draft MR creation, Ready/Merge, CI bypass or production actions. Always follow actual [AGENTS.md](../AGENTS.md), [contribution guidance](../docs/CONTRIBUTING.md) and [Accepted engineering workflows](https://github.com/puennaja/puen-engineer/tree/master/workflows).
