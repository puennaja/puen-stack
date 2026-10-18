# puen-stack

คลัง Skills, Agents, Scripts, Templates และ Automation ใช้ร่วมกับ Codex และ Claude Code โดยอิงแนวคิด Engineer-first จาก pstack และ mattpocock แต่ปรับเป็นแนวทางของ My Engineer

Engineering Practices, Accepted Workflows และ Artifact Templates อยู่ที่ [puen-engineer](https://github.com/puennaja/puen-engineer) ส่วน Skills/Agent Setup/Tooling อยู่ที่นี่

## Quickstart — เลือก Provider ได้ (Pilot)

```bash
git clone https://github.com/puennaja/puen-stack.git
cd puen-stack
npm run setup
```

Bootstrap Wizard ให้เลือก **Codex/Claude/Both**, **Plane/Jira/GitHub Issues/None**, **GitHub/GitLab/None**, และ Global/Project Skills. สร้าง Codex Profile เฉพาะไฟล์ที่ยังไม่มี; ตรวจ Credential และขอ Confirm ก่อน Official Login (ไม่แจก Role/Permission หรือ Push ให้อัตโนมัติ). Provider ที่ยังไม่มี Connector ต้องทำตาม Guide และถือว่า `Not Verified`.

จากนั้นเปิด Product Repo (เช่น `fall-in-love-project`) เรียก **`pilot-recorder` ก่อน `setup-puen-stack`** และทำตาม [Canonical Playbook](https://github.com/puennaja/puen-engineer/blob/master/playbooks/idea-to-outcome.th.md). บันทึกผลการทดลองที่ Product `docs/pilot/`.

**Safety:** ไม่จำเป็นต้องลบ `~/.codex` หรือถอน CLI เพื่อรัน Wizard; ตรวจสภาพเดิมและสำรองก่อนเปลี่ยน Config. `npm run setup -- --dry-run` เป็น Preview Preset (Codex/GitHub/Plane) ไม่ใช่การทดสอบ Integration จริง.

## Legacy Skill-only Installer — Codex และ Claude

**ต้องมี Node.js 18+** ติดตั้งบนเครื่อง และควร Review Source ก่อนรัน:

```bash
git clone https://github.com/puennaja/puen-stack.git
cd puen-stack
node scripts/setup.mjs
node scripts/setup.mjs --check --doctor
```

**รันโดยไม่ใส่ Arguments จะเข้า Interactive Wizard:** เลือก Global หรือ Project → Codex / Claude / Both → Skills → Link หรือ Copy → ดู Dry-run Plan → ยืนยันก่อนติดตั้ง โดย Global ใช้ Link เป็นค่าเริ่มต้น และ Project ใช้ Copy เป็นค่าเริ่มต้น

สำหรับ CLI/Automation ยังใช้ `node scripts/setup.mjs --dry-run` และ `node scripts/setup.mjs --scope project --project /path/to/repo --agent codex --yes` ได้เหมือนเดิม Script รองรับ Windows PowerShell/macOS/Linux และรันซ้ำได้โดย **ไม่ทับไฟล์เดิม** และ **ไม่เปิด GitLab/Agent Permissions เอง** หลังติดตั้งเรียก Skill `setup-puen-stack` ให้ช่วยตรวจ AGENTS.md, Git Flow และ Permission ของ Repo งานจริง

## Pilot จาก Idea → Feature → Outcome

**Current Pilot Setup (2026-10-11):** Codex Profiles ตั้งค่าแล้ว, Skills ติดตั้งแบบ Global แล้ว (ยังต้องตรวจ Skill Discovery); Version Control ใช้ **Git** และ Pilot ปัจจุบันใช้ **GitHub Draft PR**; GitLab Draft MR เป็นทางเลือก ไม่ต้องติดตั้ง Skills ซ้ำหากค้นพบได้จริง


เริ่มจาก **Product Idea ที่ยังไม่มี Requirement/Jira Card** ได้เลย ใช้ **Plane Cloud เป็น Work Item Tracker ที่ให้ Codex/Claude อ่านและเขียนได้ภายใต้ Project Scope ที่อนุญาต** แล้วให้ `work-item-runner` เลือก Accepted Workflow และเรียก Skills อื่นตาม Stage พร้อมบันทึก Evidence/Human Decisions กลับ Plane

- **[Canonical Playbook ภาษาไทย (puen-engineer)](https://github.com/puennaja/puen-engineer/blob/master/playbooks/idea-to-outcome.th.md)** · [English](https://github.com/puennaja/puen-engineer/blob/master/playbooks/idea-to-outcome.md) · [Tooling Quickstart](./playbooks/idea-to-outcome.th.md)
- **[Plane Cloud Setup แบบ OAuth + Write ภาษาไทย](./setup/plane-cloud.th.md)** · [English](./setup/plane-cloud.md)
- **[รวม 11 Skills และ Test Scenarios ภาษาไทย](./skills/README.th.md)**

```bash
# หลัง Clone Repo แล้ว
node scripts/setup.mjs
# เลือก Global / Project, Codex / Claude, Skills และ Confirm
```

**สำคัญ:** Installer ติดตั้ง Skills เท่านั้น; Plane MCP/OAuth ต้องเชื่อมแยกบนเครื่อง ไม่เปลี่ยน Permissions ให้อัตโนมัติ การ Write ลง Plane กับ Human Gate / Push / Draft MR / Merge / Production Release เป็นคนละสิทธิ์

- **[Plane MCP Permission Setup — Codex & Claude](./setup/plane-permissions.th.md)**
- **[Codex WSL2/Plus Setup & Model Profiles](./setup/codex-model-routing.th.md)** · [Model Routing Policy (puen-engineer)](https://github.com/puennaja/puen-engineer/blob/master/guides/codex-model-routing.th.md)

## Documentation

- [Setup Guide ภาษาไทย](./setup/README.th.md) · [Setup Guide English](./setup/README.md)
- [Skill Catalog ภาษาไทย](./skills/README.th.md) · [Skill Catalog English](./skills/README.md)
- [Script CLI และ Tests](./scripts/README.md)

**Draft PR/MR:** ใช้ [draft-change-request](./skills/draft-change-request/SKILL.md) และเลือก GitHub/GitLab adapter จาก remote ที่ยืนยันแล้ว; ยังต้อง Live Smoke Test ก่อนรับรองการทำงานจริง

**Skills ยังเป็น Draft**; มี Synthetic Test Scenarios และ Installer Unit Tests แต่ Codex/Claude Live Test และ GitLab Self-managed Pilot ต้องทำแยก การติดตั้ง **ไม่ใช่สิทธิ์ Push, เปิด Draft MR, Mark Ready/Merge หรือ Deploy**
