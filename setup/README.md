# puen-stack — Codex + Claude Code setup (v0.1 draft)

**Purpose:** Install **one versioned source** of the `git-commit` and `gitlab-draft-mr` skills for local Codex and Claude Code, and explicitly configure **least-privilege** Git and GitLab access. This is an **operator-run guide**, not an installer, automated credential setup or permission grant.

[ภาษาไทย](./README.th.md) · [Skill index](../skills/README.md) · [puen-engineer Accepted workflows](https://github.com/puennaja/puen-engineer/tree/master/workflows)

## 0. Boundaries and prerequisites

- Work on a machine/account authorized for the *target* source repository. Check local company policy, protected branches, merge-review rules, secrets handling and corporate software installation policy.
- Check `git --version`, `codex --version`, `claude --version`, and (for GitLab MR) `glab --version`. Install/update using the official vendor's instructions **outside** this guide. Git and `glab` are separate from the AI agents.
- Do not install from unreviewed branches. Review the skills at a known pinned commit before using them in sensitive projects; a changed public skill is executable *instruction* for the agent.
- **No blanket approval:** reading files, editing, shell execution, network, Git Push, Draft MR, Merge and Production permissions are **different capabilities**. `SKILL.md` does not override them.
- Repos opened in separate VS Code windows remain separate workspaces. Do not assume source, contracts or authorization from adjacent repos.
- A project `AGENTS.md` is the shared intended policy source. Confirm that your installed agent actually loads it; otherwise **explicitly instruct it to read `AGENTS.md`**. Do not add a mandatory `CLAUDE.md` to the project.

## 1. Clone the source, do not copy skills around

Example for macOS/Linux — substitute a safe, non-conflicting local directory:

```bash
mkdir -p "$HOME/src"
git clone https://github.com/puennaja/puen-stack.git "$HOME/src/puen-stack"
cd "$HOME/src/puen-stack"
git status --short --branch
```

If already cloned, inspect local modifications before a **manual** `git pull --ff-only`. **Do not overwrite an existing checkout**. For production use, pin or review the approved commit rather than pulling the latest Skill blindly.

## 2. Install the same skills in both agents

Both agents can discover a `SKILL.md` **only from their configured discovery locations**. Keep the canonical `SKILL.md` in `puen-stack/skills/<name>/`; link folders for each agent. This avoids two conflicting versions.

**macOS/Linux:** after reviewing existing directories and confirming none of these destinations exist:

```bash
mkdir -p "$HOME/.agents/skills" "$HOME/.claude/skills"
for skill in git-commit gitlab-draft-mr; do
  ln -s "$HOME/src/puen-stack/skills/$skill" "$HOME/.agents/skills/$skill"
  ln -s "$HOME/src/puen-stack/skills/$skill" "$HOME/.claude/skills/$skill"
done
```

**Windows PowerShell:** after cloning to a trusted path, e.g. `$HOME\src\puen-stack`, and confirming **no conflicting destination**:

```powershell
$source = Join-Path $HOME 'src\puen-stack\skills'
$codexSkills = Join-Path $HOME '.agents\skills'
$claudeSkills = Join-Path $HOME '.claude\skills'
New-Item -ItemType Directory -Force -Path $codexSkills, $claudeSkills | Out-Null
foreach ($name in @('git-commit', 'gitlab-draft-mr')) {
  $target = Join-Path $source $name
  foreach ($root in @($codexSkills, $claudeSkills)) {
    $link = Join-Path $root $name
    if (-not (Test-Path -LiteralPath $target)) { throw "Skill source missing: $target" }
    if (Test-Path -LiteralPath $link) { throw "Review existing destination; do not overwrite: $link" }
    New-Item -ItemType Junction -Path $link -Target $target | Out-Null
  }
}
```

**Windows caveat:** Junctions assume a local directory on a compatible filesystem. Symlinks may instead require Windows Developer Mode or elevation. Do **not** delete an existing Skill folder or junction automatically. If links are unsupported by your tool installation/sandbox, use a reviewed manual copy with an explicit sync process; note the copy can drift.

Codex user skills: `~/.agents/skills/<skill>/SKILL.md`. Claude Code user skills: `~/.claude/skills/<skill>/SKILL.md`. Validate skill discovery **in each installed version**, since cloud/remote agents may not use your local user skill folders.

## 3. Agent sandbox and permission prompts (examples, not policy overrides)

**Codex:** inspect and manually edit `~/.codex/config.toml` on your own machine. A conservative interactive default is:

```toml
approval_policy = "on-request"
sandbox_mode = "workspace-write"
```

This controls **when the agent asks to execute commands** and workspace write scope. Some versions isolate `.git` and network access even under workspace-write, so Git Commit/network/remote operations can still require an explicit escalation. **Do not** use `danger-full-access`, `--yolo`, or `approval_policy = "never"` to “fix” a blocked action. Never assume sandbox approval equals a Work Item/MR/Release authorization.

**Claude Code:** inspect and manually edit `~/.claude/settings.json`, merging into any existing settings rather than replacing them:

```json
{
  "permissions": {
    "defaultMode": "default",
    "ask": [
      "Bash(git push *)",
      "Bash(glab mr create *)"
    ]
  }
}
```

This is a **prompting aid**, not guaranteed prevention of equivalent actions via scripts, aliases or other tools. Never add broad `allow` permissions for network/git commands merely to reduce prompts. Actual GitLab role/branch protections and human workflow decisions remain authoritative. Confirm actual rule behavior using a synthetic task on your installed Claude version.

## 4. GitLab Self-managed setup (user/admin task)

**Do not enter access tokens into chats, Skills, agent files or public Git.** Prefer OS keyring/credential manager and permissions restricted by project/group and expiration per company policy. The GitLab CLI may require broad API capabilities to create a Draft MR: review scope with your GitLab admin rather than granting broad PATs automatically.

1. Check actual repository host: `git remote -v`, and ensure it is the intended GitLab instance (not the GitHub `puen-stack` repository).
2. Interactively authenticate using the **actual** host; example placeholder:
   ```bash
   glab auth login --hostname gitlab.example.com
   glab auth status
   ```
   Confirm host identity, account, project access, branch protections and no plaintext token leaks. Git transport SSH/HTTPS auth for `git push` may be separate from `glab` API auth.
3. Test **read-only** `glab mr list` or `glab mr view` in an authorized repository first. Inspect required review/CI policies.
4. Enable **scoped work-branch Push** only when a specific Work Item's Human Implementation Gate and publish policy allow it. Each **Draft MR** must still get separate human confirmation for the exact project/source/target/title/body. **Ready/Merge/Production remain human-only.**
5. Test a Draft MR using **a disposable, explicitly authorized GitLab sandbox project** only after explicit human approval. A fake CLI/mock is preferred for the initial dry-run.

## 5. Permission matrix and test gate

| Action | Default stance | What grants permission? |
| --- | --- | --- |
| Read repo files / history | Workspace-only, read-only | Workspace authorization and tool sandbox |
| Edit work files | Scoped worktree only | Assigned Work Item + repository rights |
| Run developer checks | Allowed only on safe authorized targets | Applicable execution-safety preflight |
| Local Git Commit | Scoped files after review | Current request and Work Item gate/policy; never include unrelated staged content |
| Push to work branch | **Separate approval** | Scoped human publish decision + real Git permissions |
| Create each Draft MR | **Human confirmation EACH time** | Exact repo/source/target/description decision + valid GitLab auth |
| Mark Ready / Merge | **Human only** | GitLab protected/reviewer policies |
| Production Deploy / Recovery | **No AI permission in v0.1** | Separate human and operational release/incident policy |

**Minimum validation (before real adoption):** check `SKILL.md` appears in both agents, agent reads the correct source, synthetic [Commit tests](../skills/git-commit/TESTS.md) and [Draft MR tests](../skills/gitlab-draft-mr/TESTS.md) are **actually run**, and the agent **stops** for unrelated changes, unapproved Push/MR, wrong branch/host and missing required checks. Record results; tests are **not run yet**.

## 6. Source references / limitations

- [Codex skills discovery](https://developers.openai.com/codex/skills) and [Codex config basics](https://developers.openai.com/codex/config-basic)
- [Claude Code skills](https://code.claude.com/docs/en/skills) and [Claude Code permissions](https://code.claude.com/docs/en/settings)
- [GitLab CLI authentication](https://docs.gitlab.com/cli/authentication/) and [Draft MR CLI](https://docs.gitlab.com/cli/mr/create/)

**State:** Setup examples are **documented, not executed on your machine**. No tokens, agents, permissions, GitLab hosts, skill installations, or release actions have been changed by publishing this guide.
