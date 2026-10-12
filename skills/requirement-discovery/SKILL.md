---
name: requirement-discovery
description: Use when an idea, product request, story or bug needs clarification of user problem, observable outcome, critical assumptions and acceptance examples before technical design. Risk-scaled optional specialist, not a mandatory ceremony.
---
# Requirement discovery (v0.1 draft)
Canonical policy: https://github.com/puennaja/puen-engineer/blob/master/workflows/requirement-discovery.md
Artifact: https://github.com/puennaja/puen-engineer/blob/master/artifacts/workflows/requirement-discovery.md

## Trigger and inputs
Run on an ambiguous idea, contradictory story, missing user behavior, or important acceptance uncertainty. Inputs: original user words, authorized tracker/issue source, requester or decision owner (Unknown if absent), observed evidence and project scope. For a clear low-risk edit, a short issue note may be sufficient; do not force invocation.

## Procedure
1. Keep **problem, desired outcome and proposed solution** separate. Identify actor, last concrete incident, workarounds, frequency, consequence of doing nothing and success signal. Never invent a numeric success target.
2. Extract **Confirmed (with source), Assumed, Unknown, Decision**; challenge the highest-impact assumptions. Ask one decision-changing question at a time, non-leading and anchored to actual behavior. Do not ask questions already answered by evidence.
3. Probe only relevant alternative paths: missing/invalid inputs, permission, data/privacy, duplicate actions, failure/empty state, recovery and boundaries. Propose examples in Given–When–Then form only when grounded; label proposals unconfirmed.
4. Suggest a **smallest testable candidate scope**, non-goals and plausible observation or experiment. Do not choose architecture, promise features or split implementation tasks here.
5. Play back the concise **single Discovery Summary** to the designated human: problem/users, evidence, outcome, candidate scope, assumptions, priority unknowns, owner and next action.
6. Route to **technical explore / prototype / discover more / defer** using human decision evidence. Discovery validated for exploration does NOT imply design, implementation or gate approval.
7. If using an authorized tracker, give the summary to `work-item-runner` for scoped update of the existing parent; never create one issue per question. For a pilot, call `pilot-recorder` at meaningful findings.

## Output and verification
One summary or small existing-issue note; explicit source for every confirmation; prioritized open questions and named decision owner. Check that the summary doesn't turn guesses into acceptance. Record owner decision as Pending until genuine human confirmation; mark inaccessible evidence Blocked/Unknown.

## Synthetic example
Idea: "Show how much I can spend." Ask whether this means account balance or money after scheduled obligations; propose an example excluding transfers, labeled **Unconfirmed**. Route to a prototype rather than promising a bank integration.

## Limits
Read-only discovery unless separately authorized tracker write; no invented stakeholder validation, confidential exports, automatic approval or unrelated repo edits. Not live-validated with Codex/Claude.
