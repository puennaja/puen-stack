---
name: draft-change-request
description: Prepare or create one GitHub Draft PR or GitLab Draft MR for an approved Work Item. Detect the actual Git remote, inspect exact branches and evidence, and require separate, action-specific human approvals for Push and each Draft PR/MR.
---

# Draft change request — provider-neutral (v0.1 pilot draft)

**Purpose:** Coordinate one safe GitHub Draft Pull Request or GitLab Draft Merge Request using common checkpoints and the provider-specific procedures below. This skill grants no Git credentials, repository write access or approval.

- [GitHub adapter](./references/github.md) and [GitLab adapter](./references/gitlab.md)
- [Manual acceptance scenarios](./TESTS.md)
- Canonical ordering, formal verification eligibility and remote-evidence exception: [Accepted Verification Workflow](https://github.com/puennaja/puen-engineer/blob/master/workflows/verification.md)

## Trigger and input
Use only for a requested Draft PR/MR. Require actual Work Item and acceptance source (or explicitly approved standalone scope), authorized repository, exact source branch and investigated target branch, commits, dependencies, relevant test/verification evidence, reviewer and human decision owner. Read repository AGENTS.md and contribution/branch policies.

## Shared read-only preflight
1. Inspect real repo/worktree, git status, remotes, source/target refs, commits, staged changes, branch protections/policy and required CI. Never assume `main`, `master`, or a sibling repo's visibility.
2. Detect provider from verified Git remote host: GitHub routes to [github.md](./references/github.md); GitLab routes to [gitlab.md](./references/gitlab.md). For custom/ambiguous hosts, verify service identity explicitly; do not guess or silently switch.
3. Confirm authenticated identity/host and read permission via provider adapter, existing open Draft/PR/MR for this exact head, required reviewers, linked issue and concrete risk/secret checks. Do not duplicate an existing request.
4. Follow canonical verification ordering: require observed developer checks, relevant Human Implementation/Verification Gate decisions or the specifically human-authorized remote-evidence exception. Report remote-dependent checks as Not run/Blocked until evidence exists. No green claims from missing CI.
5. Stop at blockers: missing target/owner/permission, host mismatch, ambiguous worktree, secrets, failing mandatory checks, duplicate request, missing required evidence or unauthorized publication.

## Human checkpoints — each action separately
Present the exact host, repository, source → target, rationale, Work Item URL/ID, commit SHA(s), Draft title/body, actual checks, residual risks, dependencies, reviewer, existing-request search and intended next action.

**Checkpoint A (Push):** Only if a source branch must be published, seek an explicit scope-bound human approval for that branch and revision. No force push or protected-branch rewrite. Existing remote publication does not grant new Push authority.

**Checkpoint B (Draft PR/MR):** For *each* request, seek separate human confirmation of exact repository, source, target, title/body and dependencies. Push permission and previous confirmations cannot substitute. Reconfirm whenever these change. A single vague consent does not grant both A and B.

## Authorized execution
1. Re-run relevant preflight and verify that the source revision, target and recorded approvals still match.
2. Only perform a narrowly approved Push if required; read back remote branch and revision.
3. Invoke **only** the matching provider adapter for one Draft request; read back real URL, Draft status, head/base and CI state. Never invent URLs or mark missing tests Pass.
4. Record actual evidence and approvals in the existing Work Item/MR and in product `docs/pilot/` when authorized. For multi-repo/stacked changes, repeat independent checkpoints per repository and request.

## Authority, failure and output
Do not mark Ready, merge, deploy, delete branches, change permissions, approve for the human, or touch unrelated repositories. A created Draft request does not imply production release. Report exact repo/host/source/target, Work Item, actual approval sources, checks, PR/MR link and Draft state **or** Not executed/Blocked, unverified claims, risks and next owner/action. This is a draft procedure, not proven by live provider tests.
