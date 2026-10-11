# เชื่อม Plane Cloud สำหรับ My Engineer Pilot (ภาษาไทย)

**เป้าหมาย:** ให้ Codex/Claude **อ่านและเขียน Plane Work Items ได้จริง** ผ่าน Official MCP แต่แยก Permission ของ Tracker ออกจาก **Human Gates** และ GitLab/Production Permissions

[English](./plane-cloud.md) · [Pilot Playbook ภาษาไทย](../playbooks/idea-to-outcome.th.md) · [Plane Adapter](../skills/work-item-runner/references/plane-cloud.md)

**คู่มือ Permission แยกตาม Agent:** [Plane MCP Permissions — Codex & Claude](./plane-permissions.th.md) (Project Role / OAuth / Read-Write Smoke Test)

## A. เตรียม Pilot ตั้งแต่ศูนย์

1. เข้า [Plane Cloud](https://app.plane.so) แล้วสร้าง **Workspace + Project สำหรับ Pilot** ใน UI หรือเลือก Project ที่มีสิทธิ์ทดลองจริง ตัวอย่าง Identifier `PILOT` เป็นแค่ชื่อสมมติ ไม่ใช่ Project ที่กูสร้างให้
2. ให้บัญชีที่เชื่อม Plane มี Role **Contributor หรือ Admin ภายใน Project** เพื่อ Create/Edit Work Items และ Comment ได้ ไม่จำเป็นต้องให้ Workspace Admin เกินความจำเป็น
3. เตรียม Git Repository ของ Product ที่มีสิทธิ์ทำงานได้จริง (Greenfield เริ่มจาก Repo เปล่าก็ได้) ถ้ามีข้อมูลบริษัทให้เป็น **Private Repository**; `puen-stack` Public มีเฉพาะ Skills/Guides
4. ระบุคนตัดสินใจเรื่อง Product, Design/Planning, Implementation/Verification, MR และ Release ถ้าทำคนเดียวก็รับหลายบทบาทได้ แต่ต้องแยก Decision Record และใช้ Independent Review Pass อย่างมีสติ; หาก Policy ต้องมี Reviewer อีกคน ให้ทำตามนั้น
5. เลือก Local/Sandbox/Staging และข้อมูลทดสอบที่ปลอดภัยเป็นหลัก ไม่ต้องเปิด Production Deployment เพื่อทดสอบ Workflow

## B. ติดตั้ง Skills (ยังไม่ใช่การ Login Plane)

จาก `puen-stack` ที่ Clone และ Review แล้ว:

```bash
node scripts/setup.mjs
node scripts/setup.mjs --check --doctor
```

Wizard จะให้เลือก **Global/Project → Codex/Claude/Both → Skills → Link/Copy → Preview → Confirm** เลือก `work-item-runner`, `codebase-explore`, `verify-work-item`, `review-change` และเลือก `git-commit`, `gitlab-draft-mr`, `setup-puen-stack` เมื่อจำเป็น ต้องมี Node.js 18+ การติดตั้ง Skills **ไม่เปิด MCP หรือ Permissions เอง**

## C. เชื่อม Plane Cloud MCP แบบ OAuth

**Codex CLI:**

```bash
codex mcp add plane --url https://mcp.plane.so/http/mcp
codex mcp login plane
codex mcp list
```

**Claude Code:**

```bash
claude mcp add --transport http --scope user plane https://mcp.plane.so/http/mcp
claude mcp list
```

ใน Session Claude Code ใช้ `/mcp` เพื่อ Authenticate เมื่อระบบขอ และตรวจว่า Login **บัญชี/Workspace ที่ถูกต้อง** ถ้าเคยตั้ง MCP แล้ว ให้ตรวจ Existing Entry ก่อน อย่าสร้างซ้ำ หากเวอร์ชัน CLI ที่ติดตั้งต่างออกไป ดู [Official Plane MCP Docs](https://developers.plane.so/dev-tools/mcp-server)

**ไม่ต้องใช้ Personal Access Token สำหรับ Interactive OAuth ปกติ** ห้ามส่ง Token ลง Chat, Skills, `AGENTS.md` หรือ Git Public และ Setup Script ไม่ Login แทน

## D. ทดสอบ Read/Write ใน Plane จริงอย่างปลอดภัย

ให้มึงเลือก **Project สำหรับ Pilot ที่มีสิทธิ์** และให้ Human อนุญาตสร้าง **Synthetic Work Item หนึ่งรายการ** ก่อน จากนั้นสั่งใน Codex หรือ Claude:

```text
Use work-item-runner and the official Plane Cloud MCP.
First inspect the intended workspace/project, available tools,
permissions, and existing Work Items in READ-ONLY mode.
Propose one synthetic pilot Work Item and ask me to approve creation
and routine create/update/comment within that named project.
After approval, create the item, read back its real ID and URL,
update a harmless description field, post one AI-labelled comment,
then read the result back. Do not change any roles, other projects,
delete items, or mark human gates approved.
Report what was actually written and what was not executed.
```

**ถือว่าผ่านเมื่อ:** Plane มี ID/URL จริง, มี Description + Comment ปรากฏใน Activity, ไม่มี Work Item ซ้ำ, ข้อความ AI ระบุว่าไม่ใช่ Human Approval, ไม่มีข้อมูลลับ และไม่มี Write ที่ไม่ได้รับอนุญาต ถ้า Request Timeout ให้ **Read Back ก่อน Retry** อย่า Create ซ้ำทันที

เมื่อ Test ผ่านแล้ว สามารถให้ Permission แบบ **Bounded สำหรับ Routine Create/Update/Comment ภายใน Project ที่ระบุ** ตลอด Pilot ได้ แต่ Human Gates ราย Stage, Git Push/Draft MR, Merge, Delete/Bulk Edit, Privileged Writes และ Production **ต้องแยกการยืนยันตาม Action เสมอ**

## E. โครงสร้าง Plane ที่ใช้จริง

- **Parent Work Item หนึ่งรายการ:** Product Idea, Problem, Users, Desired Outcome, Scope, Success Signals, Stage และ Human Decision ที่รอ
- **Child Work Items:** เพิ่มเมื่อผ่าน Human Delivery Planning Gate และมี Slice/Owner/Acceptance/Repo Scope ที่ตกลงแล้ว
- **Timeline:** ใช้ Plane Activity + Comment ที่ระบุ `[My Engineer | AI progress, not approval]` เมื่อมี Milestone, Gate, Blocker, Test หรือ Outcome สำคัญ ไม่สร้าง Ticket ใหม่ทุก Phase
- **Traceability:** `Idea → Parent → Child → Branch/Commit → GitLab Draft MR → Test/CI → Release Evidence → Outcome`

Plane Work Item ที่เห็นเช่น `PILOT-12` มี UUID แยกต่างหากสำหรับบาง MCP Actions; ห้ามเดา ID และ **State = Done ไม่ใช่ Human Verification/Release Approval**

## F. หากติดปัญหา

- ไม่เห็น Plane MCP: ตรวจ OAuth, `codex mcp list` หรือ `claude mcp list` และ Tool Discovery
- `401`: ให้เจ้าของ Account Login ใหม่; `403`: Role/Permission ไม่พอ ห้าม AI ยกระดับสิทธิ์เอง; `404`: ตรวจ Workspace/Project/Work Item
- MCP Tool Names หรือ Parameters ต่างจากตัวอย่าง: อ่าน Tool Schema จริงก่อน ไม่แต่ง API Call
- Write Timeout: Read Back ก่อน Retry; Plane Comments อาจเกิดซ้ำได้
- ไม่อนุญาตให้ AI ทำ Prod Write/Merge/Deploy เพียงเพราะมี Plane Write Permission

**เอกสารอ้างอิง:** [Plane MCP](https://developers.plane.so/dev-tools/mcp-server) · [Project Roles](https://docs.plane.so/roles-and-permissions/member-roles) · [Work Items](https://docs.plane.so/work-items/overview)

**สถานะ:** การ Commit คู่มือนี้ไม่ได้ Login Plane หรือสร้าง Project/Work Item จริงให้มึง ยังต้อง Setup OAuth และทำ Live Pilot บนเครื่องของมึง
