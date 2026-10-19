# Real Work Template — Feature / Enhancement (EN)

**Draft v0.1.** An operator prompt and stage guide; accepted policies remain in [puen-engineer](https://github.com/puennaja/puen-engineer/tree/master/workflows). Do not paste confidential tickets, Figma content, credentials or code into the public toolkit; keep company details only in approved internal AI and tracking environments.

## Kickoff: Assess only (copy into an approved Codex / Claude workspace)

```text
$work-item-runner

Mode: ASSESS ONLY / READ ONLY.
Request type: <Feature | Enhancement | Bugfix>
Authorized tracker work item: <real ID/URL>
Original requirements and approved designs: <authorized references>
Desired behavior/outcome: <specific or Unknown>
Repository currently open: <actual repo>
Affected services: <confirmed / suspected, with BE/BFF/FE ownership>
Authorized scope: <repos, worktrees, actions, environments>
Human product/engineering owners: <actual or Unknown>
Git host, workflow and constraints: <actual or Unknown>

Read AGENTS.md, current Git status, tracker, docs and accessible source first.
Label Confirmed / Assumed / Unknown. Route to the smallest relevant specialist
skill. For unclear behavior use requirement-discovery in grilling style:
one highest-value question per turn, options plus grounded recommendation,
wait for my answer. Do not manufacture decisions. Give stage, scope, evidence,
risks, pending human gate and next safe action. No edits, tracker writes,
commits, push, PR/MR or deploy from this initial prompt.
```

## Routing and gates

| Situation | Skill / procedure | Output and human control |
| --- | --- | --- |
| Ambiguous requirement | `requirement-discovery` | Interview, one summary, human validation |
| Legacy impact and contracts | `codebase-explore` | Source-backed Technical Discovery |
| Architecture choice | `solution-design` | Options/risks; feature Design Gate |
| Feature slicing | `delivery-planning` | Whole-feature map and next Work Item; feature Planning Gate |
| Approved code work | `verify-work-item` (acceptance-first), `implementation` | Actual developer checks; Work Item Implementation Gate |
| Independent proof | `verify-work-item` (Formal) | Behavior / review evidence; Work Item Verification Gate |
| Commit and Draft PR/MR | [Local commit procedure](../docs/procedures/local-commit.md), `draft-change-request` | Scoped commit; Push authority separate from per-request Draft authority |
| Release/outcome | `work-item-runner` and accepted release workflow | Human Go/No-Go and real results |

Default: passing developer checks → Human Implementation Gate → local Formal Independent Verification → Human Verification Gate → separate scoped Push → explicit per-PR/MR confirmation. Earlier remote-evidence publication requires specific human exception approval, and missing proof stays Not run/Blocked. Never auto-Ready/Merge/Deploy.

## Follow-up prompts

### Design (after source-backed discovery)
```text
$solution-design
Use confirmed requirements and codebase-explore evidence; compare simple
viable approaches and relevant trade-offs, cross-service contracts, failure
cases, tests, migration and rollout. Stop at feature-level Human Design Gate.
```

### Plan (after actual design approval)
```text
$delivery-planning
Map whole-feature dependencies and owners, then detail the next verifiable
Work Item. Stop at feature-level Human Planning Gate; no unauthorized writes.
```

### Implement (after approvals and bounded edit authorization)
```text
$implementation
For <real work item>, begin with verify-work-item acceptance-first intent.
Work only in <authorized repo/scope>, preserve pre-existing changes, make
small maintainable edits and run real developer checks. Hand off at the
Work Item Human Implementation Gate; do not publish.
```

### Verify (after developer checks and human Implementation Gate)
```text
$verify-work-item
Run Formal independent risk-scaled review/behavior checks.
Record actual Pass/Fail/Not run/Blocked and source evidence.
Stop at Human Verification Gate.
```

### Draft request (separately approved)
```text
$draft-change-request
Inspect real host, branch, target, tests and reviewer.
Request separate scoped Push authority and approval for this exact Draft.
Never assume target branch or auto-Ready/Merge/Deploy.
```

### Resume tomorrow
```text
$work-item-runner
Mode: RESUME / STATUS. Work Item: <real link>.
Read current tracker, approvals, Git/CI evidence, risks, owner and next
safe action. Read-only; label missing facts. Do not repeat resolved questions.
```

## Safe usage notes
- Open only approved repos. Other services/contracts are unknown until inspected with permission.
- Avoid copying internal details into public puen-stack / puen-engineer or public pilot logs.
- If company policy does not authorize third-party AI, use synthetic/redacted context.
- Use the existing authorized Jira/Plane issue, PR/MR and internal docs instead of creating ceremonial copies.
- `pilot-recorder` is for approved pilot evidence; it is not mandatory inside a company repository.
- This template is **not live-tested** and grants no workflow or Git permissions.
