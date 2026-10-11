# My Engineer playbooks (EN)

Playbooks show **how to combine focused Skills into an engineering outcome** without replacing the [Accepted My Engineer workflows](https://github.com/puennaja/puen-engineer/tree/master/workflows). Inspired by the task-oriented organization of pstack, not its Cursor-only command system.

[ภาษาไทย](./README.th.md)

## Start here

**[Idea → Working Change → Observable Outcome — full pilot playbook](./idea-to-outcome.md)**

**[อ่าน Playbook ภาษาไทย](./idea-to-outcome.th.md)**

This playbook works for:
- An **idea from zero**: greenfield product, empty authorized Git repo, Plane Cloud work item creation.
- A **feature requirement**: an existing project/repo, Plane/Jira work item and actual implementation scope.
- A **resumed task**: read Plane parent/children/comments and linked GitLab commits/MRs to reconstruct evidence and pending decisions.

## Minimal skill route

| Need | Call this Skill | Non-negotiable boundary |
| --- | --- | --- |
| Orchestrate stages, intake, Plane read/write, resume | [work-item-runner](../skills/work-item-runner/SKILL.md) | Bounded authorized tracker writes; human decisions are never AI-issued |
| Inspect source / feasibility / contracts | [codebase-explore](../skills/codebase-explore/SKILL.md) | Read only accessible repos; unknowns remain unknown |
| Source-backed scenarios and real test evidence | [verify-work-item](../skills/verify-work-item/SKILL.md) | Formal entry only after developer-green + Human Implementation Gate |
| Skeptical independent diff and blast-radius review | [review-change](../skills/review-change/SKILL.md) | No automatic approval; human Verification Gate remains |
| Scoped local commit | [git-commit](../skills/git-commit/SKILL.md) | Tracker identifier (Plane/Jira) in commit message; no implicit Push |
| Propose/create GitLab Draft MR | [gitlab-draft-mr](../skills/gitlab-draft-mr/SKILL.md) | Human confirmation for **each** MR, separate Push authorization |
| Assess per-repo setup | [setup-puen-stack](../skills/setup-puen-stack/SKILL.md) | No automatic token/permissions/config changes |

**Setup:** [Global/Project Skill Wizard](../scripts/README.md) + [Plane Cloud OAuth read/write setup](../setup/plane-cloud.md).

## Observable output

Use one parent Plane Work Item as the **pilot index**; create implementation children only when approved. Progress and decision trail live in the existing Plane Activity/Comments and actual GitLab/MR/CI records, not a compulsory new log per stage. Human decisions, AI actions, executed checks, unverified facts and business outcomes are **separate fields/claims**.

**Status:** Pilot Skills and Playbook are Draft until actual end-to-end evidence exists. Production is not implicitly in scope.
