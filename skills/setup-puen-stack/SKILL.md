---
name: setup-puen-stack
description: Use when a developer wants to configure a repository for puen-stack skills on Codex and Claude Code. Inspect AGENTS.md, tracker, Git flow, existing approvals, environment permissions, and propose only safe, minimal changes.
---

# Setup puen-stack for a repository (v0.1 draft)

**Purpose:** Interactive repository-specific setup, complementary to the executable [installer](../../scripts/setup.mjs). This is **not** a permission-granting skill or an agent installer.

## Trigger and prerequisites

Use only when the user asks to set up or assess their current repository. Confirm the actual repository root, Git host, responsible human, approved scope and whether they want a read-only assessment or a change proposal. Read current `AGENTS.md`, README and contribution instructions when permitted.

If Skills are missing, recommend that the human reviews `node scripts/setup.mjs --dry-run`, then chooses whether to run the installer. **Never silently run `--yes`**, install tools, authenticate GitLab, edit permission files or touch protected branches.

## Guided questions (ask only where evidence is insufficient)

1. **Source of work:** Plane Cloud (preferred for this pilot), Jira, GitLab Issues or another configured tracker. Inspect real issue links and acceptance sources. Ask whether the operator explicitly authorizes bounded tracker reads/writes; a Skill or CLI present on disk is **not** authentication or authorization.
2. **Repository scope:** Which repo and Work Item are assigned? Which BE/BFF/FE, external contracts and sibling repos are outside the current workspace?
3. **Git flow:** Actual branch/commit conventions, required CI, reviewer rules, protected branches, source and target policy. **Every Draft MR still requires its own explicit human confirmation of repo/source/target**, regardless of defaults.
4. **Engineering evidence:** Where are specs, technical findings, ADRs, tests, Plane/Jira/MR human approvals and release records stored? Use the existing tracker instead of creating duplicate mandatory reports.
5. **Permissions and human gates:** Authorized safe test targets, actual account/project rights, Implementation/Verification approval owners, separate work-branch Push approval, and incident/release decision owner.

## Read-only readiness assessment

- Use confirmed file/branch metadata, not guesses. Mark **Observed / Unknown / Needs human decision**. Never pretend the agent can see other repos or private issue trackers.
- Inspect actual agent skill discovery; use `node scripts/setup.mjs --check --doctor` as an operator-run diagnostic only. CLI presence does not prove auth or permission.
- Shared project instructions should remain short and in **`AGENTS.md`**. Do not automatically create `CLAUDE.md`, install plugins/MCP, create credentials, modify agent sandbox policies or enable force-push/merge/deploy.
- Recognize that assistant permission prompts are not complete security boundaries. Actual GitLab role, branch protection, safety policy and human gate must also hold.

## Proposal and human checkpoint

Present a concise summary: confirmed facts, specific missing owner/approval, minimal **proposed** `AGENTS.md` edits if necessary, safe tool install steps and synthetic validation plan.

**Do not write any project file without explicit human approval of exact path and scope.** Never commit, push, create a Draft MR, mark Ready/Merge or deploy as an unannounced consequence of running this skill.

## Expected output / failure handling

State **Ready for synthetic pilot / Needs setup / Blocked**, with evidence, owner, and smallest safe next action. A short comment on an authorized Plane/Jira/other Work Item is enough; no required report.

This v0.1 Skill has not been live-tested. Follow [TESTS.md](./TESTS.md) and the [Accepted engineering workflows](https://github.com/puennaja/puen-engineer/tree/master/workflows).
