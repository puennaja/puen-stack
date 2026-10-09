# Contribution guide

## Adding a skill
1. Define a repeated engineering task and a specific trigger.
2. Create `skills/<kebab-case-name>/SKILL.md`.
3. Describe expected inputs, prerequisites, procedure, outputs, and verification.
4. Include a small realistic example using *synthetic* data.
5. Test manually in the target environment (Codex, Claude Code, or both); state exactly what was tested.
6. Only add scripts or dependencies when the steps genuinely require them.

Keep common principles in `AGENTS.md`; load detailed skills only when needed.

## Proposed skill template

```markdown
---
name: example-skill
description: Use when ...
---

# Example skill
## Inputs
## Preconditions
## Workflow
## Expected output
## Verification
## Limitations
```

Third-party material must be reviewed for licensing and attribution before reuse.
