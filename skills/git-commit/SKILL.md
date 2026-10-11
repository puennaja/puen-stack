---
name: git-commit
description: Prepare or create a scoped local Git commit for a user's assigned work item. Inspect actual changes, avoid unrelated staged files, verify test evidence, and never push without separate authorization.
---

# git-commit — v0.1 Draft

**Purpose:** Safe, reviewable **local commits**, never remote publication. This skill is a procedure, not permission. See [Thai companion](./SKILL.th.md), [synthetic tests](./TESTS.md), and the [Accepted Implementation Workflow](https://github.com/puennaja/puen-engineer/blob/master/workflows/implementation.md).

## Trigger & inputs

Invoke when a human asks to prepare, review, or create a local Git commit. Know the **actual repository and branch**, assigned Jira Work Item (or clearly scoped independent task), authorized change boundaries, repository commit convention, intended paths/hunks, and **actual** developer checks. Editing code alone does not grant commit authority.

## Preconditions

1. Read repository `AGENTS.md` and relevant contribution/branch/commit rules, approved work scope, and actual source change. Use read-only `git status --short --branch`, `git diff --stat`, `git diff --cached --stat`, `git diff --check`, and focused diffs.
2. Distinguish **pre-existing/unrelated, untracked, staged, mixed-hunk, and agent-created changes**. Never silently include staged content from someone else. If ownership or scope is ambiguous, **stop and ask**. Never stash, reset, discard, amend history, rewrite branches, or switch branches to conceal changes.
3. Inspect candidate content for **secrets/company data**, generated files, unintended artifacts, risky schema/contract modifications, and unrelated refactors. Stop and report the risk without printing secret values.
4. Examine actual applicable unit/regression tests, build/lint/typecheck, and required hooks. Mark `Pass / Fail / Not run / Blocked / Inconclusive` honestly, linking command/log/environment. Do not claim a check passed without execution evidence; never bypass hooks with `--no-verify`. A required failure/gap requires a human/policy decision before committing.

## Procedure

1. Propose **one cohesive commit**: Work Item and scope; included/excluded files/hunks; real test evidence; message following the **local repo convention**, not an invented global Jira rule.
2. Get an explicit human instruction for the commit. If only a proposal was requested, **do not commit**. Even after a general “commit” instruction, ask for **exact content confirmation** if there are pre-staged changes, mixed hunks, sensitive/risky changes or scope uncertainty.
3. Stage **only approved files or hunks**. `git add -- <explicit paths>` is suitable **only if the whole file is in scope**; use deliberate hunk selection for mixed files or ask the human to isolate them. **Never** use `git add .`, `git add -A`, `git commit -a` or indiscriminate untracked-file staging.
4. Before commit, recheck `git diff --cached --name-status`, `git diff --cached --check`, `git diff --cached` and verify **all staged content** matches the reviewed scope. Stop on unrelated pre-staged data.
5. With permission and checks satisfied, run `git commit -m "<approved repo-compliant message>"`, allowing hooks to run. If hooks fail, **stop** and report actual failure; never skip.
6. Report actual SHA from `git show --stat --oneline HEAD` and remaining `git status --short`; separate pre-existing changes from yours.

## Output & failure handling

Report Work Item, repo/branch, approved files/hunks, commit SHA/message (or **Not executed**), real checks, remaining changes, risk and next owner. On missing permissions, dirty-tree ambiguity, failed hooks or tests, **stop without destructive cleanup**.

**Authority boundary:** Local commit is **not** Git Push authorization, MR creation, Draft→Ready/Merge approval, or deployment permission. Push always needs scoped separate permission; every Draft MR needs its own human confirmation. This v0.1 skill is **not yet live-tested with Codex or Claude**.
