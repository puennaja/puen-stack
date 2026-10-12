---
name: implementation
description: Use for an explicitly authorized, bounded work item to implement the smallest maintainable code change against agreed acceptance, with developer-owned tests and real check evidence before its human implementation gate.
---
# Implementation (v0.1 draft)
Canonical: https://github.com/puennaja/puen-engineer/blob/master/workflows/implementation.md
Companion: https://github.com/puennaja/puen-engineer/blob/master/workflows/verification.md

## Inputs and boundaries
Actual assigned Work Item and real tracker link or approved standalone scope; feature-level Design/Planning human approvals; authorized repo/worktree/branch, acceptance examples, contracts, risk, review/test expectations and local AGENTS.md. No broad autonomy from invoking this skill.

## Procedure
1. **Preflight before writing:** inspect repo root, branch/upstream, git status, staged/unstaged/untracked changes and focused diffs; read local AGENTS.md and conventions. Distinguish existing work from this task. Never overwrite overlapping work without resolving ownership or invoke destructive cleanup.
2. State goal, non-goals, files expected to change, behavioral examples and acceptance oracle from approved sources. Ask for a scope decision if facts are insufficient; do not silently invent requirements or edit sibling repos.
3. Ask `verify-work-item` for **acceptance-first test intent** (not Formal Verification) and select relevant unit/regression/contract/integration checks. Negative/boundary cases should reflect realistic failure modes.
4. Make the **smallest coherent vertical change**. Coding character: favor clarity over cleverness; reuse suitable existing patterns; meaningful names; cohesive responsibility; simple explicit control flow; avoid duplication when abstraction earns its cost; avoid speculative helpers, unrelated cleanup, premature optimization and tests of private details. Preserve behavior outside scope and document deviations from conventions.
5. When a stable test seam and fast harness exist, use **red (correct expected failure) → minimal green → refactor → rerun**. If TDD is unsuitable, state why and use the closest credible executable behavior check. A broken harness is not a meaningful red.
6. Inspect changed diff for domain invariants, errors, authorization, data safety, edge cases and accidental secrets. Execute relevant developer-owned unit/regression tests and required lint/build/typecheck, capturing command/environment/result. Never change assertions simply to silence genuine failures.
7. If required checks fail, repair within approved scope and rerun; if checks cannot run, report Not run/Blocked. Do **not** begin Formal Independent Verification by claiming green.
8. Give the human **Work-Item Implementation Gate** an evidence-linked diff, scope summary, passing/failed/not-run checks, contract risks, and proposed next step. Human decision remains Pending until approved. Then route `review-change` and `verify-work-item` Formal mode; rework is scope-bounded and must be retested.
9. Hand off milestone evidence through `work-item-runner`; use `pilot-recorder` for pilot observations rather than duplicating every tool call.

## Output / verification
Changed files/hunks; why and what changed; actual commands and outcomes; tests/edge cases; untouched pre-existing work; unresolved risks; Implementation Gate decision source or Pending. Required developer checks must genuinely pass before Formal Independent Verification; unit-test exceptions need risk-grounded human agreement.

## Synthetic example
Approved "add an expense": first lock expected totals and invalid amount behavior, implement only required route/storage and narrow tests, run actual checks, report pending human gate; do not touch bank-import functionality.

## Safety / limitations
No implicit staging, commit, push, PR/MR, deployment, credential/permission changes, auto human approval or cross-repo edits. Never turn a Coding Character into a rule that overrides correctness/security. Draft and unproven in live pilot.
