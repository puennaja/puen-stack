# My Engineer pilot playbook — idea → working change → observable outcome (EN)

**Status:** v0.1 pilot guide, inspired by the explicit playbook routing of [pstack](https://github.com/cursor/plugins/tree/main/pstack), but **not** a copy of its Cursor-specific automation. My Engineer's [Accepted workflows](https://github.com/puennaja/puen-engineer/tree/master/workflows), human gates and local repository/company rules win when instructions conflict.

[ภาษาไทย](./idea-to-outcome.th.md) · [Plane Cloud read/write setup](../setup/plane-cloud.md) · [Skill index](../skills/README.md) · [Thai artifact templates](https://github.com/puennaja/puen-engineer/blob/master/artifacts/workflows/README.th.md)

## What this pilot must prove

Given only a product idea **or** a feature requirement, can Codex/Claude **get the problem right**, discover constraints, propose a defensible solution, implement the smallest approved slice, verify behavior rather than just compile code, document human decisions, produce a reviewable Draft MR, and faithfully report actual release/outcome status?

It must also be obvious **what happened and why** from the existing tracker, Git and MR records when the owner resumes tomorrow, without reading a long AI transcript or adding duplicate templates.

**Initial pilot:** choose a small, reversible feature in a **private, disposable one-repo greenfield application** with synthetic data and local/staging verification. A brownfield, three-repo feature is a **second pilot** after the one-repo workflow succeeds. Plane Cloud serves as source of truth for Work Items and progress; GitLab or another authorized Git forge owns code/MR records. A successful local/staging pilot does **not** prove production readiness or business impact.

## Roles and authority

- **Human product/engineering owner** (may be the solo pilot operator): agrees the problem/outcome, reviews Design and Planning, approves each Work Item Implementation and Verification Gate, independently authorizes branch publication and each Draft MR, and controls MR Ready/Merge and each production release.
- **AI coordinator:** `work-item-runner`, tracking and routing only, with **bounded Plane CRUD** in the specified pilot project if granted; AI comments must say they are not approvals.
- **AI specialists:** `codebase-explore` (read-only), `verify-work-item` (pre-code expectations, developer checks or eligible formal checks), `review-change` (read-only independent judgment), `git-commit` (local scoped commit) and `gitlab-draft-mr` (propose/create only after human confirms **each** Draft MR).
- **Actual security boundary:** Plane OAuth/project role, agent workspace/sandbox, GitLab repo/branch protections and company policy. A Skill never elevates privileges.

## Step 0 — one-time setup from nothing

1. **Plane Cloud:** create/select workspace and project via UI; grant signed-in operator appropriate Contributor/Admin role for Work Item create/update/comment; don't give unnecessary workspace-admin rights. Follow [Plane setup](../setup/plane-cloud.md) to configure OAuth MCP separately for Codex and Claude if both will participate.
2. **Version control:** initialize/select an approved private Git repository. Create an initial README with a lightweight product goal, a safe local run/test command and a short `AGENTS.md` only if the owner approves exact content. No obligation to install every tool or add `CLAUDE.md`.
3. **Skills:** from cloned `puen-stack`, run `node scripts/setup.mjs`, choose **Global or Project**, agent(s), skills, Link/Copy and verify Dry-run preview. Restart agents to confirm discovery. The wizard installs **Skills only**, not Plane MCP or permissions.
4. **Plane read/write smoke:** call `work-item-runner` with [the Plane setup prompt](../setup/plane-cloud.md) against one authorized synthetic practice item; confirm actual Create → Read-back → Update → Comment → Read-back results. No blind retries.
5. **Boundary:** decide the nonproduction environment, safe synthetic fixtures, allowed repo paths and the person who approves human gates and reviewer/Release decisions. Treat Production deployment as **out of scope** unless separately authorized.

**Exit evidence:** real Plane project URL, read/write smoke result and MCP identity; Git repository branch; agents actually discover skills; test environment and human decision owner recorded. If any fails, mark `Setup Blocked`, no pretending connectivity.

## Copy/paste kickoff prompt (new idea)

```text
Use work-item-runner to start the My Engineer v0.1 pilot from this IDEA:
<describe the product, user problem or feature>

Tracker: Plane Cloud. Ask me for the specific authorized workspace/project.
I authorize you to propose the parent Work Item first. Once I confirm that
project and creation, you may create/update/comment on the approved parent
and later approved child Work Items for routine evidence/progress tracking.
Do not delete anything, change Plane project settings, alter GitLab permissions,
or treat a Plane status/comment you wrote as a Human Gate decision.

Follow the Accepted My Engineer workflows and smallest useful artifacts.
Separate Confirmed/Assumed/Unknown, ask one critical question at a time,
stop at real Human Gates, and tell me what was actually written to Plane
with real links. No production deployment unless separately authorized.
```

## Workflow routing: step by step

| Step | Ask the agent / use Skill | Actual work and observable evidence | Plane write (when authorized) | Stop/decision to move on |
| --- | --- | --- | --- | --- |
| **1. Intake** | `work-item-runner` | Problem hypothesis, user, desired outcome, success signal, owner; distinguish solution suggestion from need | Search first, then create **one parent** Idea/Feature item; read back URL/ID | Human confirms **problem worth exploring** |
| **2. Requirement Discovery** | `work-item-runner` + [Discovery artifact](https://github.com/puennaja/puen-engineer/blob/master/artifacts/workflows/requirement-discovery.md) | Clarifying questions, user scenarios, non-goals, confirmed vs assumed, candidate acceptance | Edit parent summary or one labelled milestone comment; no ticket per phase | Human routes: investigate, prototype, ask more, defer/decline |
| **3. Technical Discovery** | `codebase-explore` | Greenfield feasibility **or** source-lined brownfield trace, contracts, repo boundaries, risks/unknowns, checks actually run | Evidence-linked Technical Discovery summary; Unknown for unopened repos | Human chooses sufficient for Design / bounded spike / Blocked |
| **4. Solution Design** | `work-item-runner` (+ `codebase-explore` if needed) | At least the meaningful options, trade-offs, selected interface/data invariants, test/release risks | Design proposal + link to decision; concise Artifact not repeated | **Feature-level Human Solution Design Gate** |
| **5. Delivery Planning** | `work-item-runner` | **Whole-feature map + progressively detailed next Work Item**, cross-repo contract and integration owner | Plan parent; after Human Planning Gate, create only approved child Work Items | **Feature-level Human Delivery Planning Gate** |
| **6. Pre-code acceptance** | `verify-work-item` (preparation mode) | Acceptance oracle, negative cases and safe test seams from approved requirement, not generated code | Child acceptance/test-intent and owner | Ambiguity resolved by human product/tech owner |
| **7. Implementation** | Assigned coding agent under `work-item-runner` | Scoped files, diff, no destruction of pre-existing changes, applicable unit tests, real lint/build results | Child evidence summary, real `Pass/Fail/Not run/Blocked` links | **Human Implementation Gate per Work Item** after applicable checks |
| **8. Formal independent Verification** | `review-change` + `verify-work-item` | **Only after developer-green & Implementation Gate**; fixed diff, test quality, real behavior/contract proof where safely authorized, residual risk | Independent findings, evidence, fix/retest loops | **Human Verification Gate per Work Item** |
| **9. Local commit** | `git-commit` | Confirm intended staged hunks, tests/hooks, scoped local commit, real SHA. Tracker ID from **Plane or Jira** | Link child to branch/commit, no fake success | Scoped local commit authorization; **not Push** |
| **10. Push + Draft MR** | `gitlab-draft-mr` | Verify actual GitLab host/project/source/target and target rationale; source-branch Push **separately authorized**; create Draft only | Link actual Draft MR, CI state, integration dependency | **Human confirms each Draft MR**; **human only** Ready/Merge |
| **11. Release readiness** | `work-item-runner` + [Release artifact](https://github.com/puennaja/puen-engineer/blob/master/artifacts/workflows/release-operations.md) | Pinned build, included Work Items, environment, smoke/safety checks, observability, mitigation/recovery owner | Release-bound evidence and **actual** result; parent/child trace | **Human Go/No-Go for each real Production Release**; fresh human confirmation **for every anomaly intervention** |
| **12. Observe and learn** | `work-item-runner` | Technical deploy, service health, feature behavior and **business/user outcome** recorded as separate predicates; follow-ups, measurable pilot score | Final outcome note: Healthy/Degraded/Inconclusive/Not deployed; owner/date | Human confirms outcome or another iteration; never invent a metric |

**Iteration is expected.** A critical new unknown routes back to the affected Discovery/Design/Planning decision. Do not force a strict waterfall or repeat approved work unnecessarily. For a small low-risk change, combine notes inside existing Plane issues/MRs. A child can have separate tests and gate decisions; a parent is not complete until its accepted feature-level outcome and integrations are proven.

## Tiny example (fictional, not created for the user)

Idea: "I want a small tool to log daily expenses and see how much remains this week." Discovery may show that **the meaningful outcome** is answering "Can I afford a purchase?" rather than shipping a dashboard with arbitrary graphs.

- **Parent Plane Work Item (proposed):** `PILOT-<real-id>` — "Help a user understand weekly spendable amount"; Unknown until Plane actually creates it.
- **Design option A:** browser form + local storage and small calculations; option B: database + sync. Human decides from constraints and evidence.
- **First Work Item after Planning Gate:** add one expense and update the remaining amount; acceptance includes invalid input and negative balance; later import/export are explicitly out of scope.
- **Evidence:** real unit tests, approved local browser/API drive, captured expected/actual values and a Draft MR link if created.
- **Outcome:** "Local workflow demonstrated" if tests pass locally; **not** "production healthy" or "users adopted" without independent real evidence.

## How to observe what happened without reading chat

Use **Plane parent Work Item as the index** and its Activity/AI-labelled comments for a chronological summary. A good checkpoint note has:

```text
[My Engineer | AI progress, NOT HUMAN APPROVAL]
Stage / feature or child Work Item ID:
Observed evidence: real file/commit/test/MR/Plane links + timestamps
Decision requested: human role, exact gate, Pending or original human-authored link
Not run / inconclusive / unresolved: ...
Next: action, responsible owner, checkpoint
```

A human approval should live in an original human-authored Plane comment, review record or other reliable approved source. If recorded as spoken/chat confirmation by the operator, label its origin; **do not let the agent forge a human comment using OAuth as the signed-in user**. When a stage repeats, read back the current comment history and update only authorized fields to avoid duplicates.

At any moment ask:

```text
Use work-item-runner in RESUME / STATUS mode on <real Plane item URL>.
Read actual parent, children and latest comments, linked commits, MRs and
available test evidence. Show stages Passed / Pending human / Blocked /
Not executed, which agent wrote which entries, the next safest action,
and what still prevents claiming a working product. Do not write.
```

## Pilot scorecard and exit decision

Capture a **baseline where observable** (manual process duration/defect rate, or Unknown) before the run. Do not invent measurements just to show an improvement.

| Question to answer | How to demonstrate | Truthful result if missing |
| --- | --- | --- |
| Requirements interpreted correctly? | Human-approved problem, source-backed acceptance, review against actual behavior | Unknown / needs discovery |
| Every crucial decision traceable? | Original human gate evidence, not an agent-authored approval | Blocked |
| Verified behavior beyond unit green? | Safely run actual API/UI/CLI flow and documented negative case | Not run / Inconclusive |
| Changes reviewable and bounded? | Exact diff, tests, clean scoped commit and Draft MR | Pending / Blocked |
| Tracker writes observable and non-duplicated? | Plane Activity, readbacks and real links | Failed / Inconclusive |
| Actual delivery outcome? | Real environment/version, service health, changed behavior and owner | Local-only / Staging-only / Not deployed |
| Product/user outcome? | Predetermined signal observed at legitimate checkpoint | Not measured; owner + next date |
| Was work faster/easier? | Actual elapsed time, human correction count, token/runtime cost if available | Baseline unavailable / inconclusive |

**Classification:** `Pilot demonstrated (bounded scope)`, `Partial`, `Blocked` or `Inconclusive`. This is an honest pilot conclusion, **not** authorization to mark a Production Release healthy. Summarize the next small workflow/skill improvement for human review, without silently altering Accepted workflows.

## When to stop rather than simulate a pass

No approved tracker project, missing OAuth/write permission, ambiguous owner, critical source evidence missing, rejected Gate, failed required test, prohibited side-effecting verification, inaccessible contract, no MR rights, unapproved release, no safe monitoring: record **Blocker + Owner + Smallest Next Action**. Continue other authorized read-only work if helpful. Never replace a missing evidence source with an AI guess.

**Limitations:** This pilot runbook and associated Skills have not been executed end-to-end against real Plane + Codex/Claude + GitLab; tests must be performed and evidence added to the actual pilot Work Item.
