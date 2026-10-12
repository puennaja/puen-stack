---
name: pilot-recorder
description: Record factual My Engineer pilot activities, setup issues, decisions, verification evidence and lessons under the current product repository docs/pilot, using concise non-duplicated logs.
---

# pilot-recorder

**Purpose:** Persistent, evidence-based learning in the **current product repository**, not puen-stack. This skill must work regardless of coding agent, work tracker or Git hosting provider.

## Activation

Invoke at initial project setup, milestone transitions, blockers, meaningful retries, verification results, release checkpoints, and end-of-session handoffs. Prefer concise factual entries over logs of every tool call.

## Repository and permissions

1. Confirm actual `git rev-parse --show-toplevel`, `pwd`, existing `AGENTS.md` and `docs/`. Ensure this is a product pilot repository, never silently write to the puen-stack toolkit repo or an unrelated sibling repo.
2. Use `docs/pilot/` as suggested root, but reuse the project's existing equivalent log structure if present; avoid duplicate records.
3. Show paths and get user authorization to initialize or change documentation when not already allowed under an approved scoped pilot documentation policy. Never infer approval from mere skill invocation.
4. Read the smallest relevant log section before appending; preserve user-authored content and avoid duplicate entries. Do not record passwords, OAuth tokens, proprietary/private contents, or sensitive personal data.

## Minimal records

- `docs/pilot/setup/setup-log.md`: meaningful environment and setup transitions.
- `docs/pilot/setup/issues.md`: each failure, root cause **hypothesis vs verified**, attempted fixes and outcomes.
- `docs/pilot/setup/environment.md`: OS/agent/CLI version, selected provider config, verification time; never secrets.
- `docs/pilot/experiments.md`: baseline, hypothesis, method, measures, evidence, Work/Partial/Failed/Not Verified.
- `docs/pilot/decisions.md`: decisions and human approval evidence (do not forge approvals).
- `docs/pilot/improvement-backlog.md`: reusable tooling or workflow improvements with owner, status.
- `docs/pilot/lessons-learned.md`: reusable findings after verifying evidence.

Create **only files needed now**, not an empty folder tree for its own sake.

## Event schema

```markdown
### YYYY-MM-DD HH:mm offset — <short event>
- Stage / task / agent / model (if known):
- Action:
- Observed evidence (command result / source path / link):
- Problem / suspected root cause:
- Attempted solution:
- Verification and status: Worked | Partial | Failed | Not Verified
- Human decision (actual evidence or Pending):
- Next action / owner:
```

Use actual timestamp/timezone when available; otherwise say `Time not captured`. User-reported resolution is marked as such, not independently verified. Never claim command/tests ran unless observed or backed by reliable provided logs.

## Evaluation signals (optional and evidence-only)

At meaningful pilot checkpoints, capture measured elapsed time, model/profile, token or monetary cost **only when a trustworthy meter exists**, review/rework cycles, human corrections, blockers and outcome evidence. If absent, record `Not measured` rather than inventing a baseline. Compare Work Item-level observations against the pilot goal; avoid treating one synthetic pass as proof of productivity. Propose specific skill/workflow changes with links to underlying worked/failed evidence, keeping raw logs concise and in the approved product pilot docs.

## Handoff and feedback

Report exact files updated, key conclusions, blockers, and next safe step. For tooling fixes, propose a specific change in `puen-stack`; for accepted engineering policy, propose change in `puen-engineer`. Do not automatically push, merge, publish, or cross-write into other repositories.
