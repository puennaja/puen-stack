# Skill Contract — Stateless and Standalone (v0.1 Draft)

## Rule
Every **specialist skill** in puen-stack MUST be **stateless and standalone**. **Only `work-item-runner`** may coordinate other skills and maintain workflow state, which must still be externally observable/reconstructible. This applies to new and existing skills, including setup and Git helpers.

### Stateless
- Each invocation takes explicit input, authorized repository context and current evidence as needed; it can resume without assuming previous chat turns, global variables, hidden agent memory or a previous skill's side effects.
- Skills MAY use tools, read current files, return structured outputs and, if separately authorized, write artifacts or execute bounded operations. Persistent artifacts are **explicit outputs**, not hidden internal state.
- A repeat call must re-read current facts and reconcile external effects/idempotency. Never invent past approvals, tests or IDs.

### Standalone
- Each skill MUST contain its own trigger, inputs, prerequisites, main procedure, output contract, safety/permissions, error handling and verification/failure cases. It must work when called directly, without running another puen-stack skill first.
- A specialist MUST NOT require, instruct, or invoke another skill as a prerequisite or downstream handoff. It MAY reference canonical **workflow policy, templates, shared reference docs, commands and provider adapters** as passive reading/tool dependencies.
- A specialist may **describe a handoff artifact** for a caller, but cannot require the runner or another skill to process it.
- Missing inputs become **Blocked/Needs input** with precise requirements, not automatic delegation to another installed skill or third-party substitute.

### Runner exception
- `work-item-runner` owns stage selection, dispatch, handoffs and externally recorded workflow progress across specialist calls.
- For pilot use, route using explicit puen-stack stage-to-skill mapping. Do not silently substitute skills from Matt Pocock, Poteto or other installations; report missing/mismatched skills and request human decision. Skill name alone is not proof of resolved source; verify the actual discovered skill path when runtime permits.
- Human Gate approval is sourced from a human record; running a skill never grants additional authority.

### Audit checks
1. Invoke each specialist **directly** with a complete synthetic input and no prior session; expect normal output.
2. Repeat in a new session from unchanged inputs; outcome must not rely on undocumented prior state.
3. Omit required input; expect a truthful Blocked response, not another skill invocation.
4. Scan content for "use/invoke/ask [another skill] first" and refactor to **input artifact contracts**.
5. Check external effects remain separately authorized and are idempotently reconciled.
6. Verify runner routing is explicit and doesn't auto-fallback to third-party skills.

This policy supplements, and does not supersede, accepted engineering workflows in [puen-engineer](https://github.com/puennaja/puen-engineer/tree/master/workflows).
