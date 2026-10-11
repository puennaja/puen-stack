# Plane Cloud MCP Permissions — Codex และ Claude Code (ภาษาไทย)

**Status: Configuration guide; live authorization/write test pending.** คู่มือนี้เป็น Tooling ใน puen-stack; Workflow/Human Gates อ้างอิง [Canonical Playbook](https://github.com/puennaja/puen-engineer/blob/master/playbooks/idea-to-outcome.th.md).

## 1. ขอบเขตสิทธิ์ 3 ชั้น (ต้องตรวจแยก)

1. **Plane account/project role (enforced):** Official hosted MCP ทำงานเป็นบัญชีที่ล็อกอิน; Workspace ที่เลือกตอน OAuth ผูกกับ Connection นั้น และ Plane บังคับ Workspace/Project Role จริง. ให้สมาชิกมี **Contributor หรือ Role ต่ำสุดที่ทดลอง Create/Update/Comment ได้จริง** ภายใน Pilot Project เท่านั้น. อย่าให้ Workspace Admin โดยไม่จำเป็น.
2. **OAuth connection:** Plane hosted OAuth ขอ `read` และ `write` scopes; **ไม่มีการแยก Read/Write ด้วยการเปลี่ยน URL หรือ Codex/Claude Prompt**. ให้ตรวจ Consent และบัญชี/Workspace จริง.
3. **Agent operational policy:** จำกัด Write ผ่าน Human Approval, `AGENTS.md`, Skill และ Client permission; เป็น Process Guard ไม่ใช่ Server-side ACL. สำหรับ Hard Read-only ให้ใช้บัญชี/Role ที่ Plane บังคับไม่ให้เขียน หรืออย่าเชื่อม MCP ใน Session นั้น.

## 2. Permission matrix สำหรับ Pilot

| Action | Codex / Claude | Approval |
| --- | --- | --- |
| List/Get/Search Workspace, Projects, Work Items | Allowed after login | No approval needed for authorized Pilot project |
| Create approved parent/child Work Item | Scoped Write | Human confirms project + initial object/scope |
| Update description/status of approved item | Scoped routine Write | Allowed after bounded project/scope authorization |
| Add AI-labelled progress/evidence comment | Scoped routine Write | Allowed after bounded project/scope authorization |
| Delete, archive, bulk edits, project settings, member/roles | **Denied by workflow** | Never in Pilot without a new explicit higher-risk plan/approval |
| Mark Human Gate approved | **Denied to AI** | Real human decision recorded independently |
| Git Push / Draft PR/MR / Merge / Deploy | Separate Git/Release permissions | Plane OAuth never grants these |

**Important:** Policy/Prompt ไม่ได้ปิด Tool การเขียนเชิงเทคนิคโดยตัวมันเอง. OAuth ที่มี `write` และสิทธิ์ Project พอสามารถทำ Write ผ่าน MCP ได้ ต้องใช้ Client approvals และ Human review เสริม.

## 3. Codex MCP Setup (WSL2 Ubuntu)

```bash
codex mcp list
# ถ้ายังไม่มี plane entry:
codex mcp add plane --url https://mcp.plane.so/http/mcp
codex mcp login plane
codex mcp list
```

เปิด Codex แล้วใช้ `/mcp` ตรวจ Server/Auth/Actions ที่แสดงจริง; **อย่าใส่ PAT ใน config.toml หรือ Git**. ถ้าใช้ Login อยู่แล้วให้ข้ามขั้น add/login ที่ไม่จำเป็น. ไม่ใช้ `sandbox_mode = "read-only"` เป็นหลักประกันว่า Remote MCP จะเขียนไม่ได้; ตรวจ Approval/Tool Behavior จริง.

## 4. Claude Code MCP Setup (optional; only if Claude installed)

```bash
claude mcp list
# ถ้ายังไม่มี plane:
claude mcp add --transport http --scope user plane https://mcp.plane.so/http/mcp
claude mcp login plane
claude mcp list
```

หาก CLI เวอร์ชันนั้นไม่รองรับ `claude mcp login plane` ให้เปิด Session แล้วใช้ `/mcp` เพื่อ Authenticate. `--scope user` คือ Client Configuration Scope ไม่ใช่ Plane Project Permission. ใช้ Claude default permission mode และ Human Confirm สำหรับ Write; อย่าใช้ `bypassPermissions`. สำหรับ Read-only session ใช้ Plan Mode/Tool Restrictions ได้เป็น Convenience แต่ **Hard Enforcement ต้องมาจาก Plane Role**.

## 5. Read Smoke Test — no write

ใน Codex/Claude:
```text
Use work-item-runner with Plane MCP in READ-ONLY assessment mode.
Confirm actual authenticated workspace and selected pilot project.
List project work items and read one existing work item.
Do not mutate Plane. Distinguish actual evidence from assumptions.
```

Pass เมื่อเห็นชื่อ Workspace, Project และ Work Item จริง (หรือ Project ว่างอย่างยืนยันได้). ถ้า MCP มี Action `workitem(action="list")`, `retrieve_by_identifier` ให้ใช้ Schema ที่ Tool แสดงจริง.

## 6. Write Smoke Test — exact scoped authorization

เลือก **หนึ่ง Pilot Project** ก่อน. ให้ Agent ค้น Work Item ทดสอบเดิมเพื่อหลีกเลี่ยงรายการซ้ำ แล้วเสนอชื่อ `[My Engineer Pilot] MCP RW Smoke Test` และขอ Human Approve ก่อน Create.

หลังอนุมัติ ใช้ **เฉพาะ** `workitem create → read back → update harmless description → workitem_comment create → read back`; โค้ดตัวอย่าง Action เป็นเพียง Pattern ต้องยึด Schema ที่ MCP จริงเปิดให้ใช้. Comment ควรขึ้นต้น `[My Engineer | AI progress, NOT HUMAN APPROVAL]`.

Pass เมื่อเห็น ID + URL จริง, Description/Comment ตรงกัน, ไม่มี Duplicate/Out-of-scope Write. Timeout ให้ **Read Back ก่อน Retry**. ห้ามทดสอบ Delete หรือ Promote Role เพียงเพื่อพิสูจน์ Permission.

## 7. Troubleshooting & Audit

- `401`: reauthenticate; `403`: check real account/Project Role; `404`: check bound Workspace, Project and object.
- ไม่เห็น Tool: check `codex mcp list` หรือ `claude mcp list`, `/mcp`, then reconnect/restart as required.
- อ่านได้แต่เขียนไม่ได้: ตรวจว่า Role เป็น Viewer/Guest หรือ Client กำลัง Block Write; แยก OAuth Scope vs Role vs Human Gate.
- เก็บใน `pilot-projects/docs`: timestamp, agent, Plane account/Workspace/Project (ไม่เก็บ credential), Action, Human Authorization Evidence, actual ID/URL, observed result/timeout, resolution และ Outcome (`Work/Partial/Failed/Not Verified`).
- ถ้าต้องเปลี่ยน Workspace ให้ Reconnect OAuth; Client คนละตัวต้อง Login และตรวจ Connection แยกกัน.

Sources: [Official Plane MCP](https://developers.plane.so/dev-tools/mcp-server), [Plane Roles](https://docs.plane.so/roles-and-permissions/member-roles), [Claude Permissions](https://code.claude.com/docs/en/settings).
