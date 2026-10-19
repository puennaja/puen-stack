# Agent instructions — puen-stack

Purpose: maintain reusable, vendor-neutral developer tooling and agent skills.

**Skill architecture:** All specialist skills MUST be stateless and standalone; only `work-item-runner` may orchestrate other skills. See [Skill Contract](./docs/architecture/skill-contract.md). Specialist skills must not require another skill to run first; take explicit input artifacts instead.

## Rules
- Read the relevant existing files before modifying them; make the smallest justified change.
- Do not add dependencies or auto-executing scripts without explaining their purpose.
- Do not execute destructive operations or publish secrets.
- Prefer portable instructions usable by both Codex and Claude Code; avoid mandatory vendor-specific commands.
- Keep this file short. Put detailed procedures in `skills/<name>/SKILL.md`, not here.
- A new skill must document: purpose, trigger, inputs, steps, outputs, failure handling, and verification.
- Clearly mark untested workflows as drafts.
- Never commit company-confidential code, ticket contents, keys, or personal data into this public repository.
- Validate changed markdown links and relevant scripts before reporting completion.
- Summarize changes, tests performed, and remaining uncertainty.
