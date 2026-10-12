---
name: solution-design
description: Use when a feature has sufficient discovery evidence and needs an evidence-based technical solution, trade-offs, contracts and validation strategy before the feature-level human design gate.
---
# Solution design (v0.1 draft)
Canonical: https://github.com/puennaja/puen-engineer/blob/master/workflows/solution-design.md
Artifact: https://github.com/puennaja/puen-engineer/blob/master/artifacts/workflows/solution-design.md

## Inputs and entry checks
Use confirmed outcome, scope, acceptance examples, `codebase-explore` findings or honest greenfield constraints, real affected repositories and contracts, decision owner, risk and unknowns. If an assumption could overturn correctness, authorization or architecture, route to targeted discovery/spike rather than guess.

## Procedure
1. State decision to be made, verified constraints, reversibility and relevant nonfunctional requirements. Read just the canonical workflow/template needed for this stage.
2. Inspect existing patterns and contracts via `codebase-explore` when source evidence is needed; no guessed sibling repo visibility.
3. Consider reuse and the simplest viable approach first. Compare one or more credible alternatives when consequential; for a trivial reversible choice, say why a single approach suffices. Evaluate relevant correctness, complexity, operational cost, security, migration, testing and ownership trade-offs—not arbitrary scoring.
4. Describe a to-be flow and responsibility boundaries, relevant API/event/data contracts, authorization, error/empty/concurrency behavior and invariants. Note each contract's owner and confidence.
5. Define risk-proportional validation and change safety: behavior tests, integration checks, compatibility, migration, rollout, observability and recovery where applicable. Include consequences for multiple repos without silently expanding edit rights.
6. Recommend a solution with rationale, discarded alternatives, unresolved high-impact uncertainties and a thin vertical slice suitable for planning. Prefer minimal change and existing conventions; avoid speculative abstraction.
7. Present a **single Solution Design Summary** to the actual **feature-level Human Solution Design Gate**. Gate Pending until a human approves this specific design. An ADR is optional for long-lived consequential decisions, not automatic.

## Output and verification
Goal/scope, evidence and sources, candidate options, chosen proposal (pending approval), trade-offs, contracts/data flow, verification/rollout risks, alternatives, open decisions and human decision source. Check traceability to original outcome and absence of unsupported claims. Handoff approved scope to `delivery-planning` through `work-item-runner`; reuse existing tracker/docs.

## Synthetic example
Expense log: compare local-only persistence to service/database; identify multi-device sync as Unknown, not a guaranteed feature; human selects approach before planning.

## Stop conditions
Critical unknown, unavailable contract owner, privacy or security risk without authority, or material scope change: mark Blocked and request focused evidence/decision. Never edit production code, approve the gate or publish. Draft not live-tested.
