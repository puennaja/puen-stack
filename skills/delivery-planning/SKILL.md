---
name: delivery-planning
description: Use after an approved feature-level solution design to map whole-feature delivery, dependencies, vertical slices and a detailed next independently verifiable work item, with a human planning gate before tracker child creation.
---
# Delivery planning (v0.1 draft)
Canonical: https://github.com/puennaja/puen-engineer/blob/master/workflows/delivery-planning.md
Artifact: https://github.com/puennaja/puen-engineer/blob/master/artifacts/workflows/delivery-planning.md

## Inputs
Approved feature-level Solution Design Gate (human decision evidence), outcome and acceptance, explicit boundaries, verified dependencies/contracts, owner, capacity/risk signals and the selected authorized tracker. If approval is missing: prepare **proposal only**, never claim commitment.

## Procedure
1. Capture **whole-feature scope** (including testing, security, migrations, operability, release/recovery where relevant), explicit exclusions and the smallest demonstrable end-to-end outcome.
2. Slice by **observable behavior and integration checkpoints** rather than BE/FE tasks alone. Subtasks may be component-specific under an owned work item. Prioritize small vertical slices or timeboxed question-driven spikes.
3. Map actual cross-repo dependencies, producer/consumer contracts, sequencing, test environments and reviewers. Mark inaccessible repos/owners Unknown; do not assign other teams silently.
4. Choose planning depth by **risk and uncertainty**: clear low-risk tasks may be fully broken down; volatile future work remains outlines; high-risk migrations need comprehensive safety/dependency mapping even if code subtasks are progressive.
5. Detail the **next Work Item**: why, approved scope/non-goals, real repo owner, acceptance and negative cases, tests/proof, dependencies, risks and completion criterion. Make the unit independently reviewable and link it to its parent.
6. Give qualitative effort/range only with actual assumptions or precedent. No invented estimates, dates or capacity. Define inspection/replanning triggers.
7. Submit one Delivery Plan to the **feature-level Human Delivery Planning Gate**. After actual approval, hand approved child Work Item creation/updates to `work-item-runner` within existing explicitly authorized tracker scope. Search before creating; read back actual IDs. No phase-per-issue proliferation.
8. Replan when contract/scope/impact changes; reopen only invalidated human gates.

## Output and verification
Whole-feature map; ordered slices and dependencies; one actionable next Work Item; evidence, owners and unknowns; actual human decision or Pending. Check each item has an independently observable done criterion and no silent expansion of repo scope.

## Synthetic example
Expense app: plan "save expense and show updated total" first; leave statement import outlined until format/privacy evidence exists. No fabricated tracker IDs.

## Boundaries
Planning approval does not approve Work Item implementation, verification, push, PR/MR or deployment. No unapproved tracker writes or code edits. Draft, not live pilot proven.
