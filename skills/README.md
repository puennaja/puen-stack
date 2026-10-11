# puen-stack Skills (v0.1 Drafts)

**English** · [ภาษาไทย](./README.th.md) · [Setup (EN)](../setup/README.md) · [Setup (TH)](../setup/README.th.md)

A Skill has one **English `SKILL.md` entrypoint**, shared by Codex and Claude. No `SKILL.th.md` duplicates. Guides and human-facing explanations can remain bilingual.

| Skill | When to use | Skill (EN) | Test scenarios |
| --- | --- | --- | --- |
| **git-commit** | Scoped **local** commit; default message `[<subtask-id>] feat: <summary>` (repo convention overrides) | [SKILL.md](./git-commit/SKILL.md) | [TESTS](./git-commit/TESTS.md) |
| **gitlab-draft-mr** | Propose a GitLab Draft MR and require human approval for **each** source/target pair | [SKILL.md](./gitlab-draft-mr/SKILL.md) | [TESTS](./gitlab-draft-mr/TESTS.md) |
| **setup-puen-stack** | Inspect a repo and guide a human through tracker, Git flow and permission readiness | [SKILL.md](./setup-puen-stack/SKILL.md) | [TESTS](./setup-puen-stack/TESTS.md) |
| **work-item-runner** | Coordinate idea-to-outcome stages with bounded Plane Cloud read/write + human gates | [SKILL.md](./work-item-runner/SKILL.md) | [TESTS](./work-item-runner/TESTS.md) |
| **codebase-explore** | Source-grounded Technical Discovery / greenfield feasibility, read-only | [SKILL.md](./codebase-explore/SKILL.md) | [TESTS](./codebase-explore/TESTS.md) |
| **verify-work-item** | Acceptance-first checks, developer proof and gated formal behavior verification | [SKILL.md](./verify-work-item/SKILL.md) | [TESTS](./verify-work-item/TESTS.md) |
| **review-change** | Independent diff, test quality and blast-radius review | [SKILL.md](./review-change/SKILL.md) | [TESTS](./review-change/TESTS.md) |

**Pilot guide:** [Idea-to-outcome playbook](../playbooks/idea-to-outcome.md) / [ภาษาไทย](../playbooks/idea-to-outcome.th.md), plus [Plane Cloud OAuth write setup](../setup/plane-cloud.md). **Installation:** Use the [safe setup script](../scripts/setup.mjs) from a reviewed local clone. Run `node scripts/setup.mjs --dry-run` first, then `node scripts/setup.mjs --yes` if the plan is correct. [CLI manual](../scripts/README.md).

**State:** All seven Skills remain **v0.1 Drafts pending live agent + Plane/GitLab evaluation**. Installing them does **not** grant GitLab tokens, Push, protected branch changes, Draft MR creation, Ready/Merge, CI bypass or production actions. Always follow actual [AGENTS.md](../AGENTS.md), [contribution guidance](../docs/CONTRIBUTING.md) and [Accepted engineering workflows](https://github.com/puennaja/puen-engineer/tree/master/workflows).
