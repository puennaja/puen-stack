# puen-stack Skills (v0.1 Drafts)

**English** · [ภาษาไทย](./README.th.md) · [Setup (EN)](../setup/README.md) · [Setup (TH)](../setup/README.th.md)

A Skill has one **English `SKILL.md` entrypoint**, shared by Codex and Claude. No `SKILL.th.md` duplicates. Guides and human-facing explanations can remain bilingual.

| Skill | When to use | Skill (EN) | Test scenarios |
| --- | --- | --- | --- |
| **pilot-recorder** | Record verified setup/experiment issues and decisions in the product repo's docs/pilot | [SKILL.md](./pilot-recorder/SKILL.md) | [TESTS](./pilot-recorder/TESTS.md) |
| **git-commit** | Scoped **local** commit; default message `[<subtask-id>] feat: <summary>` (repo convention overrides) | [SKILL.md](./git-commit/SKILL.md) | [TESTS](./git-commit/TESTS.md) |
| **draft-change-request** | GitHub Draft PR / GitLab Draft MR with detected provider, separate scoped Push and per-request approval | [SKILL.md](./draft-change-request/SKILL.md) | [TESTS](./draft-change-request/TESTS.md) |
| **setup-puen-stack** | Inspect a repo and guide a human through tracker, Git flow and permission readiness | [SKILL.md](./setup-puen-stack/SKILL.md) | [TESTS](./setup-puen-stack/TESTS.md) |
| **work-item-runner** | Coordinate idea-to-outcome stages with bounded selected work-tracker capabilities + human gates | [SKILL.md](./work-item-runner/SKILL.md) | [TESTS](./work-item-runner/TESTS.md) |
| **requirement-discovery** | Risk-scaled problem, outcome, assumptions and acceptance elicitation | [SKILL.md](./requirement-discovery/SKILL.md) | [TESTS](./requirement-discovery/TESTS.md) |
| **codebase-explore** | Source-grounded Technical Discovery / greenfield feasibility, read-only | [SKILL.md](./codebase-explore/SKILL.md) | [TESTS](./codebase-explore/TESTS.md) |
| **solution-design** | Evidence-grounded alternatives, contracts and feature-level Design Gate | [SKILL.md](./solution-design/SKILL.md) | [TESTS](./solution-design/TESTS.md) |
| **delivery-planning** | Whole-feature map, vertical slices, next Work Item and Planning Gate | [SKILL.md](./delivery-planning/SKILL.md) | [TESTS](./delivery-planning/TESTS.md) |
| **implementation** | Scoped, maintainable code, developer-owned checks and Implementation Gate | [SKILL.md](./implementation/SKILL.md) | [TESTS](./implementation/TESTS.md) |
| **verify-work-item** | Acceptance-first checks, developer proof, adversarial diff review and gated formal behavior verification | [SKILL.md](./verify-work-item/SKILL.md) | [TESTS](./verify-work-item/TESTS.md) |

**Pilot guide:** [Idea-to-outcome playbook](../playbooks/idea-to-outcome.md) / [ภาษาไทย](../playbooks/idea-to-outcome.th.md), plus [Plane Cloud OAuth write setup](../setup/plane-cloud.md). **Bootstrap:** `npm run setup` for provider selection and Codex profiles. **Skill-only installation:** Use the [safe setup script](../scripts/setup.mjs) from a reviewed local clone. Run `node scripts/setup.mjs --dry-run` first, then `node scripts/setup.mjs --yes` if the plan is correct. [CLI manual](../scripts/README.md).

**State:** All eleven skills remain **v0.1 Drafts pending live agent + Plane/GitLab evaluation**. Installing them does **not** grant GitLab tokens, Push, protected branch changes, Draft MR creation, Ready/Merge, CI bypass or production actions. Always follow actual [AGENTS.md](../AGENTS.md), [contribution guidance](../docs/CONTRIBUTING.md) and [Accepted engineering workflows](https://github.com/puennaja/puen-engineer/tree/master/workflows).
