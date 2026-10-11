# puen-stack
คลัง Skills, Agents, Scripts, Templates และ Automation ที่ใช้ซ้ำได้ โดยอิงปรัชญาของ pstack จาก poteto แต่ปรับให้เหมาะกับ Claude Code และ Codex

## Skills สำหรับ Codex + Claude Code (v0.1 Draft)

Skills, Scripts และ Setup สำหรับ AI Developer เก็บใน **puen-stack** เป็นแหล่งเดียว ส่วน Engineering Workflows / Approved Decisions / Artifacts เก็บใน [puen-engineer](https://github.com/puennaja/puen-engineer)

- [Skill Catalog — English](./skills/README.md)
- [Skill Catalog — ภาษาไทย](./skills/README.th.md)
- [Setup Codex / Claude / GitLab — English](./setup/README.md)
- [คู่มือ Setup ภาษาไทย](./setup/README.th.md)

**Starter Skills:** `git-commit` (Scoped Local Commit) และ `gitlab-draft-mr` (Git Flow Preflight + Human Confirmation ก่อนแต่ละ Draft MR) เป็น **Draft v0.1 ยังไม่ Live-tested** พร้อมแผนทดสอบแบบ Synthetic Repo/Mock GitLab

**Permission Boundary:** Skill ไม่ได้ให้สิทธิ์ Push, Merge, Deploy หรือเข้าถึง Production; ต้องทำ Setup และอนุมัติแยกภายใต้ Company/Repo Policies ก่อนใช้งานจริง
