# Plane Cloud adapter — scoped read/write and trace contract

**Primary provider:** [Plane Cloud](https://app.plane.so), official [Plane MCP server](https://developers.plane.so/dev-tools/mcp-server). This file tells `work-item-runner` how to use a provider; it is **not** an MCP connection, authorization, token, or executable script.

## Setup and tool discovery

- MCP endpoint: `https://mcp.plane.so/http/mcp` (OAuth recommended for a local, interactive pilot).
- Codex: `codex mcp add plane --url https://mcp.plane.so/http/mcp`, `codex mcp login plane`, then `codex mcp list`.
- Claude Code: `claude mcp add --transport http --scope user plane https://mcp.plane.so/http/mcp`; in Claude Code use `/mcp` to sign in, then `claude mcp list`.
- Setup is a **human action**. Do not run a login, issue tokens, edit credentials or install MCP as a side effect of a Skill invocation. The Skill installer `scripts/setup.mjs` installs `SKILL.md` directories only, not MCP or Plane permissions.
- **At runtime discover actual MCP tool names and parameter schemas.** Plane's MCP tool set may expose resource tools such as `workitem` with `action=create/update/list/retrieve`, but versions differ. Resolve workspace/project and work-item identifiers before any call. Do not invent tool arguments or assume a named tool exists.

## Per-project write authorization and role

Before writing, require the human to specify or confirm:
1. Plane workspace and project **by real name/URL**; who owns decisions; whether this is a disposable pilot.
2. Allowed changes: **create one feature parent, edit its scope/status, post AI-labelled comments, and create only approved child Work Items** (or a smaller subset).
3. Real OAuth connection identity and project rights (Contributor/Admin generally can create/edit; Commenter is not sufficient for creating work items), plus privacy constraints and whether sensitive requirement text may be stored on Plane.
4. Rules for when AI may write routine stage/evidence updates inside scope. **One scoped grant is sufficient for routine, non-gated Work Item writes until it expires or scope changes; do not seek a redundant human confirmation for every ordinary comment.** However, sensitive changes, new parent features, scope expansion, destructive actions and every **Human Gate** still need explicit authorization.
5. No permission to delete/archive/bulk-edit, change users/projects/roles/states, attach confidential material, mark verified/complete without source-backed human decision, or infer MR/deploy authority.

**Human Gate integrity:** An authenticated MCP comment appears from the signed-in account, so prefix it `[My Engineer | AI progress, not human approval]`. When a human explicitly approves in Plane, reference that **original human-authored** comment or authorized source. If a human owner explicitly approves in chat and has the correct authority, record the **user-stated decision with its actual source, time and scope** in an AI-authored progress note when tracker writes are authorized; do not mislabel that note as a human-authored Plane comment. Do not invent a second approval requirement just because Plane is the chosen tracker, and never manufacture human approvals.

## Suggested record layout (minimal, adaptable)

- **Plane Project:** one explicitly selected pilot project. Creating a new project is a separate human/admin action.
- **One parent Work Item:** product idea, problem, user/outcome hypothesis, approved scope and success signals; comments are the single evidence/decision timeline.
- **Children only for planned implementable slices:** created after Human Delivery Planning Gate and actual work assignment; use Plane's real work item type/parent feature only if configured. Do not require an Epic type, custom state, label, module or cycle in a fresh project.
- **Plane activity/comments:** timestamped summaries at key transition or blocker, **not a new Work Item for each workflow phase**.
- **External links:** Work Item ↔ source repository branch/commit/Draft MR/pipeline/evidence when those objects exist. Never invent URLs.

Human-readable ID (for example `ENG-42`) is distinct from the UUID often used by Plane tools. Always resolve the object and verify its project before writing.

## Allowed operation pattern

1. **Read:** list/search projects; resolve requested workspace/project; search existing Work Items and inspect the parent's description and recent comments; use `list/retrieve` action supported by current tool.
2. **Propose:** present a bounded new item or exact fields to update; confirm overall tracker scope if not already authorized.
3. **Write:** call the smallest appropriate actual tool action (`create`, `update`, `comment`, relationship) with real project/work-item IDs and authorized fields. Never overwrite a description containing user content blindly: read current version, preserve conflicting material, and request clarification if the change is ambiguous.
4. **Read-back:** fetch the object again; state real readable ID, URL, changed fields and timestamp. If tool returns an error or outcome is uncertain, **re-fetch before retry**.
5. **Avoid duplication:** use deterministic stage labels plus references and inspect recent comments before posting; tools/API may support `external_id` for stable comment correlation, but it is not globally unique automatically. For Plane API v2, create-comment is not deduplicated; `upsert` needs `external_source` and `external_id`, and simultaneous upserts can race. Serialize writes per key. Never blindly repeat a create call after timeout.

Do not assume generic state names like `In Progress` are valid. Inspect project states/IDs if a state transition is actually authorized. **A state is not a Human Gate**; a done label cannot replace actual Verification evidence or product-outcome confirmation.

## Event-style comment template (append only at meaningful transitions)

```text
[My Engineer | AI progress, not approval]
Stage: Requirement Discovery (or another accepted stage)
Work item: <real human ID + URL>
Evidence: <confirmed facts; links or commands/results; Unknown/Not run>
Change: <what this agent actually wrote/observed, if any>
Decision: <Human Gate: Pending / approved by human with original link>
Blockers / risks: <explicit>
Next: <owner + safe action / checkpoint>
```

Do not post a stage as `Approved` based on AI recommendation. Separate **human-provided decisions**, **AI writes**, **executed test outcomes**, and **real Git/MR/Release actions** so a person can reconstruct the pilot.

## When Plane writes fail or MCP unavailable

- `401`: initiate no secret-sharing workaround; human reauthenticates.
- `403`: permissions/role insufficient; stop writes, never escalate permissions.
- `404`: recheck workspace/project/item identity; don't create a substitute automatically.
- Network timeout/unknown write outcome: **read-back before retry**, never duplicate blindly.
- Missing write tools: still generate a **manual field/comment proposal**, mark `Not executed`, avoid claiming progress in Plane.
- Sensitive/production data or third-party identities: apply actual workspace/company rules; redact as appropriate.

## Pilot evidence checks

- Can agent read the authorized project and real existing item?
- Can user-authorized agent create **one synthetic pilot Work Item**, retrieve/read back, then **edit** and **comment** under the same scoped grant, each with real observed response?
- Are creator/AI progress vs approving human, time, evidence links and status differences clear in Plane history?
- Can the agent restart a session and **resume without duplicate Work Items/comments**?
- Does it refuse a wrong project, unauthorized deletion, implied approval or no available MCP?

**No live Plane actions have been executed by publishing this adapter.** Validate on an authorized disposable pilot item first.
