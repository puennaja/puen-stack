# puen-stack

คลัง Skills, Agents, Scripts, Templates และ Automation ใช้ร่วมกับ Codex และ Claude Code โดยอิงแนวคิด Engineer-first จาก pstack และ mattpocock แต่ปรับเป็นแนวทางของ My Engineer

Engineering Practices, Accepted Workflows และ Artifact Templates อยู่ที่ [puen-engineer](https://github.com/puennaja/puen-engineer) ส่วน Skills/Agent Setup/Tooling อยู่ที่นี่

## Quickstart — ติดตั้ง Skills ทั้ง Codex และ Claude

**ต้องมี Node.js 18+** ติดตั้งบนเครื่อง และควร Review Source ก่อนรัน:

```bash
git clone https://github.com/puennaja/puen-stack.git
cd puen-stack
node scripts/setup.mjs
node scripts/setup.mjs --check --doctor
```

**รันโดยไม่ใส่ Arguments จะเข้า Interactive Wizard:** เลือก Global หรือ Project → Codex / Claude / Both → Skills → Link หรือ Copy → ดู Dry-run Plan → ยืนยันก่อนติดตั้ง โดย Global ใช้ Link เป็นค่าเริ่มต้น และ Project ใช้ Copy เป็นค่าเริ่มต้น

สำหรับ CLI/Automation ยังใช้ `node scripts/setup.mjs --dry-run` และ `node scripts/setup.mjs --scope project --project /path/to/repo --agent codex --yes` ได้เหมือนเดิม Script รองรับ Windows PowerShell/macOS/Linux และรันซ้ำได้โดย **ไม่ทับไฟล์เดิม** และ **ไม่เปิด GitLab/Agent Permissions เอง** หลังติดตั้งเรียก Skill `setup-puen-stack` ให้ช่วยตรวจ AGENTS.md, Git Flow และ Permission ของ Repo งานจริง

## Documentation

- [Setup Guide ภาษาไทย](./setup/README.th.md) · [Setup Guide English](./setup/README.md)
- [Skill Catalog ภาษาไทย](./skills/README.th.md) · [Skill Catalog English](./skills/README.md)
- [Script CLI และ Tests](./scripts/README.md)

**Skills v0.1 ยังเป็น Draft**; มี Synthetic Test Scenarios และ Installer Unit Tests แต่ Codex/Claude Live Test และ GitLab Self-managed Pilot ต้องทำแยก การติดตั้ง **ไม่ใช่สิทธิ์ Push, เปิด Draft MR, Mark Ready/Merge หรือ Deploy**
