---
name: review-change
description: Use for a skeptical, evidence-linked review of a fixed code diff against confirmed requirements, negative cases and existing conventions; identify regressions, cross-repo contract risks and test weaknesses without editing, approving gates or merging.
---

# Review change — independent diff and blast-radius review (v0.1 pilot draft)

**Purpose:** Challenge an implementation from a fresh, source-backed view before the [Human Verification Gate](https://github.com/puennaja/puen-engineer/blob/master/workflows/verification.md). Inspired by pstack's `interrogate` and `blast-radius`, **without mandatory subagents or vendor-specific model selection**.

- [Manual test scenarios](./TESTS.md)
- Can give **preliminary review** of a partial change before formal eligibility. Never call preliminary findings `Verified`.

## Inputs and eligibility

Require: **assigned Work Item** + parent acceptance source, scope, authorized repo/worktree, fixed diff base/head SHAs or explicit working-tree snapshot, risk category, actual developer checks, and known external contracts/owners. Read repo `AGENTS.md`, review/commit/CI policies, relevant tests and design links; do not accept the implementer's summary as independent evidence.

Two modes:
- **Preliminary (any time):** risk analysis, test-plan challenge and scoped diff review. It is useful before Implementation Gate, but **not Formal Independent Verification**.
- **Formal independent review:** after actual passing applicable developer unit/regression/required checks and explicit **per-Work-Item Human Implementation Gate**; see `verify-work-item`. A second AI opinion can strengthen a deliberate independent pass but is **not a qualified human reviewer**, and self-review alone never meets a policy requiring a peer.

## Read-only review procedure

1. **Lock exact change:** inspect `git status`, remotes and **actual** base/head or `git diff --cached` / working tree as appropriate. Record the review boundary. If the base changed mid-review, mark evidence stale and recheck the affected range.
2. **Independent acceptance oracle:** read confirmed requirement, UX/business examples, constraints and chosen contracts **before judging the changed implementation**. Separate expected behavior from what the code currently does.
3. **Diff and codebase quality:** inspect additions, deletions, tests, validation, error paths, data handling, authorization, concurrency, idempotency, configuration, backward compatibility and duplicated abstractions only when relevant. Cite real `path:line` or diff position for actionable claims.
4. **Blast-radius beyond touched files:** trace actual call sites, API consumers, schema/events, migrations, jobs, feature flags and test or rollout assumptions. An inaccessible sibling repo is `Unknown — external owner to verify`; never invent its contract.
5. **Test quality challenge:** check assertions actually fail for the wrong behavior, negative/boundary coverage, risky mocking, flaky behavior, missing integration proof and `Not run` checks. Do not equate green CI to requirement coverage.
6. **Evidence-based risk triage:** tag findings `Blocking / Non-blocking / Question / Dismissed`; distinguish **Confirmed / Suspected / Unknown**. A suspicion requires a concrete failure mechanism and proposed proof, not a fabricated bug. For costly potential failures, ask for focused, safe verification through `verify-work-item`; this skill itself stays read-only.
7. **Handoff:** recommend `Fix and reverify | Evidence needed | Eligible for Human Verification Gate | Blocked` only if formal entry was valid. A required missing proof stays a blocker. Record honest residual risk and who can decide.

## Reporting contract

```text
Work Item / parent acceptance / review mode:
Repo / base SHA -> head SHA (or exact local diff snapshot):
Actual evidence available, unreviewed repos:
Findings:
  severity; confidence; requirement/impact; path:line or source link;
  reproduction or safest proof; suggested owner and action
Checks quality: <actual test results, missing assertion/negative case>
Blast radius: <observed dependencies; unknown external owners>
Recommendation: <Fix / Blocked / Ready for human review / Preliminary only>
Human Verification Gate: <Pending or actual owner decision + source>
```

- Keep independent findings in the **existing Plane Work Item/MR discussion** through the authorized tracker workflow; do not generate an extra compulsory Markdown report.
- If a finding is fixed, review the revised diff and relevant developer tests. Never silently modify files, stage, commit, push, open/mark Ready a Merge Request, merge or deploy from this skill.
- Never reveal company code or security findings in the public `puen-stack` repository.

**Status:** Pilot draft; not an executed formal review of a live project.
