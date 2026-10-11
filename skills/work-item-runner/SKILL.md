---
name: work-item-runner
description: Use when a user provides a product idea, requirement, feature request or issue and wants to carry it through My Engineer's accepted workflow. Coordinate an observable, human-gated pilot with Plane Cloud or another authorized work-item tracker; read and write only within explicitly authorized scope.
---

# Work item runner — idea to observable outcome (v0.1 pilot draft)

**Mission:** Guide one bounded product idea, feature or bug from intake through discovery, design, planning, implementation, verification, release readiness and learning, using actual evidence and the [Accepted My Engineer workflows](https://github.com/puennaja/puen-engineer/tree/master/workflows). This is a **coordination skill**, not a blanket grant to edit code, write to a tracker, open MRs or deploy.

- [Pilot playbook](../../playbooks/idea-to-outcome.md) (Thai: [idea-to-outcome.th.md](../../playbooks/idea-to-outcome.th.md))
- [Plane Cloud adapter and trace policy](./references/plane-cloud.md)
- [Manual acceptance scenarios](./TESTS.md)
- Skill instructions are in English; user-facing notes can be Thai.

## Delivery ordering — canonical policy (2026-10-11)

The accepted My Engineer default is **Developer Checks green → Human Implementation Gate → locally feasible Formal Independent Verification → Human Verification Gate → separately authorized scoped Push → separately confirmed Draft PR/MR**. Early/provisional feedback and acceptance-first test planning remain allowed. **Remote-evidence exception:** when required CI/preview/integration evidence cannot be obtained locally, a human may explicitly approve a narrowly scoped earlier Push and, if necessary, separately approve a Draft PR/MR; unexecuted checks remain Not run/Blocked, and the Verification Gate cannot be claimed passed until necessary remote evidence is observed and a human makes the decision. CI/PR review findings trigger appropriate scoped fixes, retesting, independent re-verification and refreshed human decision. Never auto-merge/deploy. Canonical upstream: https://github.com/puennaja/puen-engineer/blob/master/workflows/verification.md .


## Trigger, operating modes and scope

Use for "start from an idea", "run our pilot", "turn this requirement into a feature", "resume item XYZ", and stage-by-stage delivery. The unit is a **product/feature parent record** with independently owned **Work Items** once planned, not a fictional requirement document.

Modes:
- **Assess**: read existing evidence, identify stage/unknowns; never mutate tracker or repo.
- **Plan/pilot**: prepare artifacts, propose tracker writes and implementation steps; confirm provider/project and permissions before first write.
- **Execute a bounded stage**: perform only authorized tracker CRUD, read-only analysis, code edits, tests or separate downstream Skills whose gates are satisfied. Ask before any separately gated action.
- **Resume**: re-fetch the tracker item and linked work, reconcile last evidence and decisions, then state the next safe stage. Never trust a stale session summary as authority.

**Mandatory startup record:** user-provided idea/requirement or issue URL; real tracker provider; Plane workspace/project if used; repo/worktree and authorized write scope; human product owner and engineering decision owner (or Unknown); success hypothesis and pilot-safe deployment boundary. If provider inaccessible, prepare a pending proposal; do not invent IDs or links.

## Stage routing — iterative, risk-scaled, human-controlled

Follow the accepted activities; stages may be combined for low-risk work, but material unknowns/decisions cannot be silently skipped. Read **only** the workflow and artifact template for the stage being performed.

| Stage / responsibility | Read accepted workflow + template | Output and human boundary |
| --- | --- | --- |
| 0. Idea / intake | [Feature Delivery Lifecycle](https://github.com/puennaja/puen-engineer/blob/master/workflows/feature-delivery-lifecycle.md) | Capture problem hypothesis, affected users, success signals, owner; product owner agrees to investigate |
| 1. Requirement Discovery | [Workflow](https://github.com/puennaja/puen-engineer/blob/master/workflows/requirement-discovery.md) / [Artifact](https://github.com/puennaja/puen-engineer/blob/master/artifacts/workflows/requirement-discovery.md) | One Discovery Summary, separate confirmed facts/assumptions/unknowns; human chooses explore/prototype/defer |
| 2. Technical Discovery | [Workflow](https://github.com/puennaja/puen-engineer/blob/master/workflows/technical-discovery.md) / [Artifact](https://github.com/puennaja/puen-engineer/blob/master/artifacts/workflows/technical-discovery.md) | Invoke `codebase-explore` in an authorized repo, or greenfield feasibility; evidence sufficient for design / spike / blocked |
| 3. Solution Design | [Workflow](https://github.com/puennaja/puen-engineer/blob/master/workflows/solution-design.md) / [Artifact](https://github.com/puennaja/puen-engineer/blob/master/artifacts/workflows/solution-design.md) | Options, contracts, risks; **Feature-level Human Solution Design Gate** before planning commitment |
| 4. Delivery Planning | [Workflow](https://github.com/puennaja/puen-engineer/blob/master/workflows/delivery-planning.md) / [Artifact](https://github.com/puennaja/puen-engineer/blob/master/artifacts/workflows/delivery-planning.md) | Whole-feature map + progressively detailed **next** Work Item; **Feature-level Human Delivery Planning Gate** |
| 5. Implementation (per Work Item) | [Workflow](https://github.com/puennaja/puen-engineer/blob/master/workflows/implementation.md) / [Artifact](https://github.com/puennaja/puen-engineer/blob/master/artifacts/workflows/implementation.md) | Authorized scoped code edits, developer checks, `verify-work-item` preparation; **Human Implementation Gate for each Work Item** |
| 7. Independent Verification (per Work Item) | [Workflow](https://github.com/puennaja/puen-engineer/blob/master/workflows/verification.md) / [Artifact](https://github.com/puennaja/puen-engineer/blob/master/artifacts/workflows/verification.md) | `review-change` and `verify-work-item` formal path only after eligible developer checks and Implementation Gate; default before Push/Draft PR/MR; **Human Verification Gate per Work Item** |
| 8. Commit / Draft PR/MR coordination | `git-commit`, then `git-draft-pr` for GitHub or `gitlab-draft-mr` for GitLab | Default: after Human Verification Gate. Remote-evidence exception needs explicit human authorization; select provider from verified Git remote; separate commit/push authority; ask human confirmation before **each** Draft PR/MR; **human alone** marks Ready/Merge |
| 9. Release & Operations | [Workflow](https://github.com/puennaja/puen-engineer/blob/master/workflows/release-operations.md) / [Artifact](https://github.com/puennaja/puen-engineer/blob/master/artifacts/workflows/release-operations.md) | Bounded release readiness + explicit **human Go/No-Go for each production release**; fresh human confirmation before every anomaly-driven intervention |
| 10. Outcome & Learning | Release & Operations Q6 + FDL Stage 9 | Actual technical outcome distinct from observed product/business outcome; human owner, unresolved hypotheses, next checkpoint |

**Two levels:** Feature-level Design/Planning are not Work Item code approvals. Work Item Implementation/Verification Gates do not approve an entire feature, MR completion, production release or business impact.

## Tracker contract (Plane Cloud first, portable elsewhere)

Use a **normalized work-item record** without making up project taxonomy:
- `provider, workspace, project, url, human_id, uuid_if_known`
- `parent, child_ids, type_if_configured, title, description, owner, status/state`
- `problem, desired_outcome, acceptance, scope, constraints, risk, evidence_links`
- `stage, pending_human_gate, human_decision_source, blockers, next_owner, checkpoint`
- `updated_at, last_confirmed_source`

**Plane Cloud adapter (only when selected):** official OAuth MCP at `https://mcp.plane.so/http/mcp`. Discover **actual available tools/actions and schemas** at runtime. Look up workspace/project/record before creating anything. Work-item human identifier (e.g. `ENG-42`) and UUID differ; resolve UUID for calls requiring it. Write operations may include **create/update/comment/link** but only inside a named, explicitly authorized Plane project, with approved content/scope and sufficient role. The user wanting write capability allows designing for writes; it does **not** license any unspecified mutations. Use [adapter](./references/plane-cloud.md).

**Provider neutrality:** Core workflow must use capabilities such as list/read/create/update/comment work items, not rely on vendor names. Inspect selected provider tools and permissions. Missing or unsupported integration is `Blocked / Not Verified`, not an invitation to silently switch services. For pilot projects, invoke `pilot-recorder` at meaningful setup and lifecycle milestones for evidence stored in product `docs/pilot/`.

**No duplicate records:** search existing work before creation; do not create an Issue per workflow phase. Parent feature and approved child Work Items are enough. Work Item state is not a human gate; never mark `Completed` to hide unresolved verification/release risks. For unsupported tracker actions report `Not executed / Blocked` and provide a concise manual payload.

## Observable progress and truthful Plane writes

At meaningful transitions, update the **existing parent or child** with a small evidence-linked stage note or comment, using the current authenticated agent identity. Template:

```text
[My Engineer | STAGE | AI report — not approval]
Work item: <real ID/link> | status: Draft / In progress / Blocked / Evidence ready
Observed: <facts + source paths, commands, links, run timestamps>
Decision needed: <named human, exact decision, Pending>
Next action: <safe action, owner/checkpoint>
Unverified: <unknowns, Not run / Blocked / Inconclusive>
```

Use provider activity/history for tracker chronology, while the **pilot-recorder local evidence log** tracks experiments and setup failures; avoid redundant event copies. Read back successful writes to get real IDs and links. Avoid duplicate comments on retries: re-fetch/reconcile first; when the API supports stable external IDs, use them carefully; otherwise inspect the current comments and serialize per work item. Never impersonate the human approver. A claimed approval must point to an **actual human decision** (Plane comment, MR record or human message), not an AI-generated label.

## Stop / handoff protocol

Before each human gate, show: decision requested, exact object and scope, alternatives, current evidence, residual risks and what permission the decision would grant. Await actual authorization. During reversible exploration, continue only tasks already authorized. Resume from the last observed state after a rejection or blocker. Material changes reopen only invalidated decisions.

**After every session, report:** current stage + tracker URL, changes in the selected tracker (created/updated/commented) with real links, code paths/SHAs/MRs and actual test outcomes, **human approvals vs pending**, what was not run, blocking unknowns, next owner/action and which pilot success signal has observable evidence. Don't say the product was released or validated in production if it was only simulated/local/staging.

**Explicit exclusions:** no credentials/role changes, guessed Jira/Plane IDs, unapproved project setup, cross-repo browsing without access, secret uploads to public repos, arbitrary tracker bulk edits/deletions, automatic Ready/Merge/production release, or self-issued human gate approvals.

**Status:** Pilot draft. The skill is not yet proven through an end-to-end live pilot using any selected provider configuration.
