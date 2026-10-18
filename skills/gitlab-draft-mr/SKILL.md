---
name: gitlab-draft-mr
description: Prepare or open one GitLab Draft Merge Request after inspecting repository-specific Git flow and receiving explicit human source/target confirmation for this exact MR. Never merge, mark Ready, publish without permission, or deploy.
---

# gitlab-draft-mr — v0.1 Draft

**Purpose:** Prepare and, only with appropriate permissions and per-MR human confirmation, create **one GitLab Draft MR**. Does **not** grant network, Git credentials, API access or remote publication rights. See [tests](./TESTS.md) and [Accepted Implementation](https://github.com/puennaja/puen-engineer/blob/master/workflows/implementation.md).

## Delivery ordering — canonical policy

Follow the [Accepted Verification Workflow](https://github.com/puennaja/puen-engineer/blob/master/workflows/verification.md) for the default pre-publication verification sequence and the human-approved remote-evidence exception. Before publishing, require the applicable verification decision or an explicit scoped exception; a separately authorized Push never implies Draft MR approval, and neither implies Ready, Merge or Deploy.
## Trigger & required inputs

User requests a Draft MR. Identify the assigned, confirmed Plane/Jira/other Work Item, actual GitLab host/repository, source branch, **investigated** target branch, approved **Human Implementation Gate** evidence, actual publish authorization for the non-protected source branch, commits, MR contents and dependencies.

## Mandatory preflight

1. Read actual `AGENTS.md`, contributing/branch/review rules, `git status --short --branch`, `git branch -vv`, `git remote -v`, and relevant source/target refs. **Never assume target is `master`, `main`, or the default branch.**
2. Resolve GitLab **host + project namespace** from actual remote; use permitted read-only `glab` / integration calls to inspect existing Draft MRs and CI/review rules. An agent with one open repo does not automatically see sibling repos.
3. Verify explicit **Human Implementation Gate** and source-branch **Push authorization** separately. If source not published, **do not push** without separately approved scope. Never force-push or update protected branches.
4. Stop for ambiguous project/target, mismatched GitLab login host, duplicate existing MR, missing commits, required CI blocker, contract dependency, unavailable permission, or secret exposure. Do not create the MR when blocked.
5. Prepare exact proposal: **project, GitLab host, source → proposed target, why target matches this work item**, Work Item link from the configured tracker, Draft title/description, tests **Pass/Fail/Not run**, risks, dependencies and reviewer.

## Human confirmation — EVERY MR separately

**Before creating each Draft MR**, show complete proposal and **ask the human to confirm this exact project, source and target, description and dependencies**. Implementation approval, previous MR approval, previous push, CI-green or blanket permission is insufficient. If source/target/scope changes, confirm again. Repeat independently for each repo's MR.

## After confirmed, permitted execution

1. Recheck actual host, project, source published under separate permission, target, approvals and identity.
2. Use installed/authenticated `glab` or an explicitly authorized GitLab tool. Example command **shape only** (substitute verified values, not placeholders):
   ```text
   glab mr create --repo <group/project> --source-branch <approved-source> --target-branch <approved-target> --title "<approved-title>" --description-file <approved-file> --draft --yes
   ```
3. Verify response contains a **real MR URL** with **Draft status** and correct source/target; report actual CI status and any failures. No invented URL.
4. For stacked/multi-repo work, repeat the complete preflight and confirmation **for each MR**.

## Output, failure handling and authority

Report approved project/source/target + rationale, Work Item URL/identifier, approval evidence, actual MR URL/state **or Blocked/Not executed**, CI/test evidence, dependency order, reviewer and next action.

- **Human only:** Draft→Ready, Merge and Production release. **No auto-merge, deployment or feature exposure changes.**
- **Push is separately authorized:** Draft MR consent never grants access to Push or rewrite history.
- No plaintext token, secrets in logs, privileged GitLab token copied into docs, or bypass of repo branch/approval policies.
- **Not yet tested against live GitLab, Codex or Claude**; run [synthetic tests](./TESTS.md) first.
