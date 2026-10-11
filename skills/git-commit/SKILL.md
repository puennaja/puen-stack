---
name: git-commit
description: Prepare or create a scoped local Git commit for a user's assigned work item. Inspect actual changes, avoid unrelated staged files, verify test evidence, and never push without separate authorization.
---

# git-commit — v0.1 Draft

**Purpose:** Safe, reviewable **local commits**, never remote publication. This skill is a procedure, not permission. See [synthetic tests](./TESTS.md) and the [Accepted Implementation Workflow](https://github.com/puennaja/puen-engineer/blob/master/workflows/implementation.md).

## Trigger & inputs

Invoke when a human asks to prepare, review, or create a local Git commit. Know the **actual repository and branch**, assigned Jira Work Item (or clearly scoped independent task), authorized change boundaries, the **confirmed Subtask/Work Item identifier**, repository commit and branch conventions, intended paths/hunks, and **actual** developer checks. Editing code alone does not grant commit authority.

## Preconditions

1. Read repository `AGENTS.md` and relevant contribution/branch/commit rules, approved work scope, and actual source change. Use read-only `git status --short --branch`, `git diff --stat`, `git diff --cached --stat`, `git diff --check`, and focused diffs.
2. Distinguish **pre-existing/unrelated, untracked, staged, mixed-hunk, and agent-created changes**. Never silently include staged content from someone else. If ownership or scope is ambiguous, **stop and ask**. Never stash, reset, discard, amend history, rewrite branches, or switch branches to conceal changes.
3. Inspect candidate content for **secrets/company data**, generated files, unintended artifacts, risky schema/contract modifications, and unrelated refactors. Stop and report the risk without printing secret values.
4. Examine actual applicable unit/regression tests, build/lint/typecheck, and required hooks. Mark `Pass / Fail / Not run / Blocked / Inconclusive` honestly, linking command/log/environment. Do not claim a check passed without execution evidence; never bypass hooks with `--no-verify`. A required failure/gap requires a human/policy decision before committing.

## Commit message template — My Engineer default

When the target repository does **not** specify a conflicting commit convention, use the following **default** (the brackets are literal, placeholders must be replaced):

```text
[<subtask-id>] <type>: <short imperative summary>
```

Example messages:

```text
[PAY-1234] feat: add GP approval operation log
[PAY-1234] fix: handle missing operation timestamps
[PAY-1234] test: cover approval status transitions
[PAY-1234] refactor: extract approval log mapper
[PAY-1234] docs: document operation log contract
[PAY-1234] chore: update tooling configuration
```

- **`<subtask-id>`:** use the **actual confirmed Subtask/Work Item key**, such as `PAY-1234`, from Jira or another authoritative task source. The source may be the linked issue, an explicitly supplied identifier or a reliable verified mapping from the branch. Do **not** invent a Jira key, use the literal word `subtask` by default, or silently substitute an unrelated parent Story key. If missing or ambiguous, **ask the user** which identifier to use. For non-Jira tasks, follow repository policy or ask for an approved identifier/alternative format.
- **`<type>`:** choose from the change's actual intent: `feat` (behavior), `fix` (bug), `refactor` (no behavior change), `test`, `docs`, or `chore` (maintenance). Follow the repository's permitted type set if it differs. Do not label a behavioral change `refactor` merely to avoid release rules.
- **`<short imperative summary>`:** describe the **specific committed diff**, not the entire parent Story. Prefer a short, clear English imperative phrase; do not include placeholders, misleading claims, secrets, trailing full stop or unsupported “done”/“verified” claims.
- **Optional body:** add a blank line and concise motivation, relevant contract/migration implications or issue link when the repo requires it. Never put sensitive company data into the public `puen-stack` repository.
- **Validation:** compare the proposed message to the confirmed task, reviewed staged diff and **repo-required format/commitlint rules** before committing. The repository's actual enforced convention takes precedence; if it conflicts with this default, report the difference and use the approved convention, rather than bypassing hooks.

### Branch naming context (not branch creation)

The developer commonly uses `feature/<subtask>`-style branches (for example, `feature/PAY-1234` or `feature/PAY-1234-operation-log`). **Read the actual checked-out branch** and the repository Git Flow; do not assume an existing `feature/subtask` branch proves the issue ID, auto-rename/create branches, or guess `main`/`master` as an MR target. Branch naming and commit message are related but **separate policies**; changing branches is outside this local commit skill. An existing branch named `feature/subtask` remains unchanged until the responsible human approves any required rename.

## Procedure

1. Propose **one cohesive commit**: Work Item and scope; included/excluded files/hunks; real test evidence; a **fully substituted commit message using the My Engineer default above when allowed by the repo**, otherwise its actual required commit convention.
2. Get an explicit human instruction for the commit. If only a proposal was requested, **do not commit**. Even after a general “commit” instruction, ask for **exact content confirmation** if there are pre-staged changes, mixed hunks, sensitive/risky changes or scope uncertainty.
3. Stage **only approved files or hunks**. `git add -- <explicit paths>` is suitable **only if the whole file is in scope**; use deliberate hunk selection for mixed files or ask the human to isolate them. **Never** use `git add .`, `git add -A`, `git commit -a` or indiscriminate untracked-file staging.
4. Before commit, recheck `git diff --cached --name-status`, `git diff --cached --check`, `git diff --cached` and verify **all staged content** matches the reviewed scope. Stop on unrelated pre-staged data.
5. With permission and checks satisfied, run `git commit -m "<approved repo-compliant message>"` with the **real identifier and diff-specific summary**, allowing hooks to run. If hooks fail, **stop** and report actual failure; never skip.
6. Report actual SHA from `git show --stat --oneline HEAD` and remaining `git status --short`; separate pre-existing changes from yours.

## Output & failure handling

Report Work Item, repo/branch, approved files/hunks, commit SHA/message (or **Not executed**), real checks, remaining changes, risk and next owner. On missing permissions, dirty-tree ambiguity, failed hooks or tests, **stop without destructive cleanup**.

**Authority boundary:** Local commit is **not** Git Push authorization, MR creation, Draft→Ready/Merge approval, or deployment permission. Push always needs scoped separate permission; every Draft MR needs its own human confirmation. This v0.1 skill is **not yet live-tested with Codex or Claude**.
