# Scripts

**One executable setup command** installs puen-stack Skill directories for Codex and Claude without changing credentials, GitLab permissions or any production environment.

## Install / diagnostics (Node.js 18+, no dependencies)

From a reviewed clone of this repository:

```bash
node scripts/setup.mjs --dry-run
node scripts/setup.mjs --yes
node scripts/setup.mjs --check --doctor
```

By default, the installer discovers **every** `skills/<name>/SKILL.md` and makes user-global links for **Codex** (`~/.agents/skills`) and **Claude** (`~/.claude/skills`). Windows uses folder Junctions; macOS/Linux use symlinks. Nothing is overwritten. If another installation uses the same name, the entire plan stops before writes.

```bash
node scripts/setup.mjs --list
node scripts/setup.mjs --agent codex --skill git-commit --dry-run
node scripts/setup.mjs --scope project --project /your/repo --agent claude --yes
node --test scripts/setup.test.mjs
```

`--scope project` requires the explicitly specified path and uses **copy** by default. Re-runs are idempotent for matching copies/links. Modified local copies are not replaced. `--mode link` is available for a conscious shared-source project installation, but project-local paths may show in `git status`.

**Safety boundaries:** `--yes` is confirmation **only for installation of Skill directories**, not approval to Push, create MRs, modify permissions, authenticate GitLab, enable network access or deploy. `--check`, `--doctor`, `--dry-run` and `--list` do not write files. A per-project conversational [setup-puen-stack Skill](../skills/setup-puen-stack/SKILL.md) can inspect existing policies and suggest changes, but cannot grant itself access.

**Tests:** [setup.test.mjs](./setup.test.mjs) contains executable synthetic checks for repeated installs, permission-free inspection, scope/agent selection and conflicting paths; run with `node --test scripts/setup.test.mjs`. A synthetic local prototype was exercised; real Windows Junctions, Codex/Claude runtime discovery and GitLab/auth behavior are **not yet verified**.

See [Setup Guide (English)](../setup/README.md) and [ภาษาไทย](../setup/README.th.md). Keep secrets and real company project data out of this public repository.
