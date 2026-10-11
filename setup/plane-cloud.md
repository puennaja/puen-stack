# Connect Plane Cloud to the My Engineer pilot (EN)

**Goal:** Use Plane as the **read/write work-item tracker** for Codex and/or Claude Code while keeping real **human decision gates** separate from tracker permissions. These are **manual instructions for the user**, not actions performed by this repository's installer.

[ภาษาไทย](./plane-cloud.th.md) · [End-to-end pilot playbook](../playbooks/idea-to-outcome.md) · [Plane adapter](../skills/work-item-runner/references/plane-cloud.md)

## A. Prepare a disposable pilot (zero-to-one)

1. Sign in at [Plane Cloud](https://app.plane.so). Create a **workspace and project** for this pilot in the Plane UI (or choose an existing project where changes are permitted). A project identifier such as `PILOT` is an example only; do not assume it exists.
2. Make sure the signed-in account has **Contributor or Admin** permissions on the chosen project to **create/edit Work Items and add comments**. Roles below this may be read-only or comment-only. Use the lowest suitable role, not Workspace Admin merely for convenience.
3. Create or select an **authorized local Git repository** for the product code (greenfield is fine). Prefer a private repository if it contains private product/company data. The public `puen-stack` repo holds only generic skills and instructions.
4. Know the responsible humans for product/design/planning, Work Item Implementation/Verification, MR and Release. A solo pilot can have the same human in several roles, but record each **decision separately** and use a deliberate independent review pass; meet stronger peer-review policy where applicable.
5. Define a first **non-production** run target (local/sandbox/staging) and safe test data. No production token/deployment rights are needed to pilot the decision flow.

## B. Install skills (this is not Plane authentication)

Review/clone the [puen-stack](https://github.com/puennaja/puen-stack) repo, then from its root:

```bash
node scripts/setup.mjs
node scripts/setup.mjs --check --doctor
```

The interactive wizard chooses Global/Project, Codex/Claude/Both, Skills and Link/Copy. Select **work-item-runner**, **codebase-explore**, **verify-work-item**, **review-change**, and optionally `git-commit`, `gitlab-draft-mr`, `setup-puen-stack`. For a greenfield pilot start with one repo. Node.js 18+ required.

## C. Connect official Plane Cloud MCP via OAuth

**Codex** (on the developer machine):

```bash
codex mcp add plane --url https://mcp.plane.so/http/mcp
codex mcp login plane
codex mcp list
```

**Claude Code** (user scope, shared across local projects):

```bash
claude mcp add --transport http --scope user plane https://mcp.plane.so/http/mcp
claude mcp list
```

Inside Claude Code, use `/mcp` to complete authentication/authorize the Plane connection if prompted. OAuth happens in a browser; confirm the **intended Plane account/workspace** and granted access. On an existing MCP entry, inspect rather than duplicating it. Some installed CLI versions use slightly different login/reconnection commands; follow the prompt and [official Plane MCP documentation](https://developers.plane.so/dev-tools/mcp-server).

**No PAT is required for this normal interactive OAuth path.** Do not paste credentials in chat, Skills, `AGENTS.md`, repo configuration or commits. The setup wizard **does not configure MCP** or login for you.

## D. Validate real read/write behavior once, safely

The human explicitly authorizes **only this selected pilot project** and a **synthetic practice item** before mutation. In a Codex or Claude session, request:

```text
Use work-item-runner with Plane Cloud MCP.
In the Plane workspace/project I will specify, do a read-only permission
and tool-discovery check first. Report actual project and current user.
Then propose ONE synthetic pilot Work Item and wait for me to approve
creation and routine updates in that project.
After approval: create it, read back its real ID/URL, update a harmless
description field, post one AI-labelled test comment, and read back again.
Do not change roles, project configuration, other items, or any release.
Report each actual write and any Blocked/Not executed step.
```

Acceptance conditions: real ID/URL confirmed, description and comment observable in Plane Activity, no duplicate item, AI-authored comment explicitly distinguished from a human gate, no secret leak, no unapproved write. If one step fails, **read back before retry**.

**After validated setup**, a bounded authorization for routine Work Item create/update/comment inside the named project can remain effective for the pilot. But each distinct human design/planning/implementation/verification/release gate, each Git Push/MR, any destructive/privileged write or scope change retains its **own approval requirement**.

## E. Minimal Plane data model and traceability

- One parent **Feature/Idea Work Item**: validated problem, users, success signal, feature-wide scope, current stage and pending decision.
- Child **implementable Work Items**: only after the Human Delivery Planning Gate, with assigned owner, source-backed acceptance, repo boundary and evidence.
- Timeline: existing **Plane Activity + AI-labelled comments** at meaningful checkpoints: intake, discovery, design gate, planning gate, developer checks, independent verification, MR/release evidence, outcome.
- Store real refs: `Work Item ID -> branch/commit -> GitLab Draft MR -> pipeline/deployment evidence -> outcome`. No forced Epics, custom states, modules, cycles or extra tickets in a brand-new project.

Plane's readable ID (e.g. `PILOT-12`) is distinct from the UUID many MCP operations use. Project state `Done` is **not** evidence that a Human Verification or Production Gate was approved.

## F. Safety and troubleshooting

- No MCP visible: verify installed agent, MCP list and OAuth handshake. Skills alone cannot call Plane.
- `401`: human re-authenticates. `403`: account/project role insufficient; **do not elevate automatically**. `404`: verify workspace/project/item, not create a workaround.
- Tool schema differs: introspect actual current MCP actions; do **not** call undocumented or invented tool names/parameters.
- Unexpected write timeout: **fetch/search existing objects before retry** to avoid duplicates. Plane create-comment endpoints may not deduplicate.
- Never mark a real Work Item, MR or Release `Approved/Done` merely to progress a demo. A live Production Release is only an option with a real, separately authorized human Go/No-Go.

**Official references:** [Plane Cloud MCP](https://developers.plane.so/dev-tools/mcp-server), [Plane project roles](https://docs.plane.so/roles-and-permissions/member-roles), [Plane Work Items](https://docs.plane.so/work-items/overview).

**Pilot status:** No real Plane account, OAuth session, project, Work Item or GitLab environment is connected or changed by publishing these files.
