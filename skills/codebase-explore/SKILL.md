---
name: codebase-explore
description: Use for understanding how a legacy or greenfield codebase works before designing a feature, locating owners and data paths, or establishing technical-discovery evidence. Inspect only accessible files and permitted read-only tools; never infer sibling repositories.
---

# Codebase explore — evidence before design (v0.1 pilot draft)

**Purpose:** Produce source-grounded Technical Discovery that answers what a system does, why relevant code has this shape when evidence exists, where contracts live and what remains uncertain. Inspired by pstack's `how` / `why`, but portable across Codex/Claude and aligned with [Technical Discovery v1.0](https://github.com/puennaja/puen-engineer/blob/master/workflows/technical-discovery.md).

- [Technical Discovery artifact](https://github.com/puennaja/puen-engineer/blob/master/artifacts/workflows/technical-discovery.md)
- [Manual test scenarios](./TESTS.md)

## Trigger and inputs

Use when asked to explore a subsystem, trace existing behavior, locate suitable code ownership, assess feasibility, explain an unfamiliar project, or supply evidence for an approved feature's Technical Discovery. Inputs: specific work item/problem, confirmed local repo/worktree, branch/revision, known system boundaries and permission to inspect. **No repo attached?** Choose greenfield feasibility based on real constraints instead of inventing an as-is architecture.

## Procedure — least work needed for the decision

1. **Confirm scope.** Read repo `AGENTS.md` and existing README/package/build/config hints. Check current branch and fixed revision. Record which repos/services are accessible; never claim visibility of an unopened sibling repo.
2. **Locate anchors.** Targeted searches for named routes, handlers, functions, data models, tests, migrations, feature flags and ownership. Prefer precise symbol/file searches over dumping whole projects. For every critical assertion, point to a real `path:line`, commit or named owner statement; identify unverified doc claims.
3. **Trace runtime/data flow.** Describe input trigger → interface/API → implementation → persistence/events → visible output. Trace security/authorization boundaries, error handling and retries only where relevant. For greenfield, investigate available stack and proposed contracts, not fictitious existing flows.
4. **Dependencies and ownership.** List producer/consumer, schema/API/event version, external services, data lineage, permissions and the true owner. Cross-repo connections that cannot be inspected are `Unknown / owner to verify`, not `Confirmed`.
5. **Blast radius / negative cases.** Risk-proportionate consideration of callers, UI/API contracts, auth/privacy, data correctness, concurrency, migration, compatibility, retries, observability, deployment. Read Git history/review discussion **only where accessible** to support architectural rationale; never assume a GitHub PR exists for a GitLab repository.
6. **Proof strategy.** Suggest the cheapest useful check for an important uncertainty. Default read-only; do not execute live APIs, DB writes, migrations, cleanup or network tests without authorized environment, safe fixtures and execution preflight. Quote actual command/output only if executed.
7. **Handoff.** Synthesize a **Technical Discovery Summary** and decide with human whether evidence is sufficient for Solution Design, another spike is required or investigation is blocked. Exploration is not implementation authorization.

## Output — one decision-friendly summary

```text
Work Item / scope / accessible repos + branch:
Observed as-is OR greenfield feasibility:
Flow + ownership: <trace with source links>
Contracts and dependencies: <confirmed / inferred / unknown>
Key constraints, impact / risk:
Evidence ledger: <fact → path:line / result / owner>
Open questions: <risk if wrong → smallest next proof → owner>
Executed checks: <command/env/outcome or Not run>
Proposed next step: design / bounded spike / clarify / blocked
Human decision: Pending or real approver/evidence
```

Write this into the existing authorized Plane work item/comment through `work-item-runner` **only when scoped tracker write permission is confirmed**. Keep source code, exact company paths and private ticket contents in authorized private records, not in public puen-stack. Never invent evidence or change files from this read-only skill.

**Stop conditions:** missing workspace scope, secrets/access constraints, critical inconsistent requirements, inaccessible producer contract, or missing human authority. Label the gap and ask for a targeted safe next step; do not compensate by guessing.

**Status:** Pilot draft, not live-evaluated on target repositories.
