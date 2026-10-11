---
name: git-draft-pr
description: Prepare or create a GitHub Draft Pull Request for an approved work item. Verify git remote, source/target branches, checks, duplicate PRs and separate human permissions for push and PR creation; never merge or mark ready.
---

# git-draft-pr — v0.1 Draft (GitHub only)

Use for **GitHub Draft Pull Requests**. For GitLab, use `gitlab-draft-mr`. This procedure grants no GitHub credentials, write access, push authorization or human-gate approval.

## Delivery ordering — canonical policy (2026-10-11)

The accepted My Engineer default is **Developer Checks green → Human Implementation Gate → locally feasible Formal Independent Verification → Human Verification Gate → separately authorized scoped Push → separately confirmed Draft PR/MR**. Early/provisional feedback and acceptance-first test planning remain allowed. **Remote-evidence exception:** when required CI/preview/integration evidence cannot be obtained locally, a human may explicitly approve a narrowly scoped earlier Push and, if necessary, separately approve a Draft PR/MR; unexecuted checks remain Not run/Blocked, and the Verification Gate cannot be claimed passed until necessary remote evidence is observed and a human makes the decision. CI/PR review findings trigger appropriate scoped fixes, retesting, independent re-verification and refreshed human decision. Never auto-merge/deploy. Canonical upstream: https://github.com/puennaja/puen-engineer/blob/master/workflows/verification.md .


## Trigger and inputs

Use when asked to prepare/open a Draft PR. Obtain the real repository, existing work item (Plane ID/URL if applicable), exact source branch, investigated target branch, relevant commits, actual test evidence, approvals, PR description and dependencies. Respect repository `AGENTS.md`, CONTRIBUTING, and branch protection.

## Preflight: read-only, no side effects

1. Inspect `git status --short --branch`, `git remote -v`, `git branch -vv`, `git log -5 --oneline`, focused changes, and actual source/target refs. Resolve the GitHub `owner/repo` from the authenticated remote; do not guess from directory name. Refuse if remote is GitLab or unknown.
2. Confirm GitHub authentication for the correct account/host and repository access (e.g. `gh auth status`, `gh repo view`) without exposing token data.
3. Investigate the target branch from repository policy, work item and target branch existence; **do not assume `main` or `master`**.
4. Look for any existing open PR from the same source to avoid duplicates (e.g. `gh pr list --head <branch> --state open`). If one exists, report its URL and stop before creating another; ask whether to work with it.
5. Verify approved implementation scope, relevant actual tests (Pass / Fail / Not run / Blocked / Inconclusive), security/secrets, linked work item, dependencies, required reviewers and **Human Implementation Gate**.
6. Confirm whether branch is already pushed; publication **requires separate explicit scoped Human Push authorization**. Never force-push, amend/rebase protected history or push to target.
7. If permission, CI, target, work item, git status or ownership is ambiguous, stop and report blocker. Do not silently choose.

## Proposal before actions

Display: actual GitHub `owner/repo`, exact `source → target`, why target, work item URL/ID, commit SHA(s), Draft title/body, test evidence, risky changes, dependencies, required reviewer, existing PR search result, and publication status.

**Human checkpoint A — Push:** when source branch is not published, ask for explicit authorization to push that **exact branch**. This is not granted by implementation or PR approval.

**Human checkpoint B — Draft PR:** before each Draft PR creation, ask human to confirm this **exact repo, source, target, title/description and dependencies**. Prior push approval or blanket project approval is insufficient. Reconfirm if these change. Do not execute both checkpoints from a single ambiguous permission.

## Execution only after authorization

1. Re-run preflight to ensure branches, commits and approval conditions have not changed.
2. If necessary and separately authorized, push the approved branch without force; verify remote branch and SHA match.
3. Use authenticated `gh` or a verified GitHub integration with actual Draft PR support. Example **shape**, substitute verified values:
   ```bash
   gh pr create --repo OWNER/REPO --base VERIFIED_TARGET --head VERIFIED_SOURCE --draft --title "APPROVED_TITLE" --body-file APPROVED_FILE
   ```
   Do not treat this example as blanket permission to write.
4. Read back the PR (e.g. `gh pr view <number> --json url,isDraft,baseRefName,headRefName`) and verify real URL, Draft state and exact branches. Report CI/status honestly; if not yet run, say so.
5. Record real PR link, approvals, evidence and any failures in the work item and current product repo `docs/pilot/`; classify as Work / Partial / Failed / Not Verified. Do not invent records or forge Human Approval.

## Boundaries and output

Never mark Ready, merge, delete branches, change permissions, auto-approve, deploy or mutate unrelated PRs. Repo policies and Human Gates override skill. GitHub PR creation is **not** Production release.

Return: observed repo/remote, source/target, work item, approver evidence, authorized actions, actual PR URL/state or **Not executed/Blocked**, tests/CI, risks, and next safe action. Synthetic tests do not demonstrate real GitHub integration.
