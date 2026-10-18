# puen-stack Skills (ภาษาไทย — v0.1 Draft)

[English](./README.md) · [คู่มือ Setup ไทย](../setup/README.th.md) · [Setup EN](../setup/README.md)

Codex และ Claude ใช้ **Skill Entry Point `SKILL.md` ภาษาอังกฤษเดียวกัน** ไม่ต้องมี `SKILL.th.md` คู่กัน ส่วนเอกสาร Setup และ Catalog ยังคงแยกภาษาไทย/อังกฤษได้

| Skill | ใช้เมื่อ | Skill (EN) | Test Scenarios |
| --- | --- | --- | --- |
| **pilot-recorder** | เก็บ Setup/Experiment/Failure/Evidence ที่ `docs/pilot/` ใน Product Repo | [SKILL.md](./pilot-recorder/SKILL.md) | [TESTS](./pilot-recorder/TESTS.md) |
| **draft-change-request** | เตรียม GitHub Draft PR / GitLab Draft MR โดยตรวจ Provider และขอ Human Confirm สำหรับ Push และแต่ละ PR/MR แยกกัน | [SKILL.md](./draft-change-request/SKILL.md) | [TESTS](./draft-change-request/TESTS.md) |
| **work-item-runner** | รับ Idea, เดิน Workflow, อ่าน/เขียน Plane แบบ Scoped และติดตาม Human Gates | [SKILL.md](./work-item-runner/SKILL.md) | [TESTS](./work-item-runner/TESTS.md) |
| **requirement-discovery** | สำรวจปัญหา Assumptions และ Acceptance เมื่อโจทย์ยังไม่ชัด (เรียกตามความเสี่ยง) | [SKILL.md](./requirement-discovery/SKILL.md) | [TESTS](./requirement-discovery/TESTS.md) |
| **codebase-explore** | สำรวจ Code จริง / Greenfield Feasibility พร้อม Evidence | [SKILL.md](./codebase-explore/SKILL.md) | [TESTS](./codebase-explore/TESTS.md) |
| **solution-design** | เปรียบเทียบ Design Options, Contracts และ Risks ก่อน Human Design Gate | [SKILL.md](./solution-design/SKILL.md) | [TESTS](./solution-design/TESTS.md) |
| **delivery-planning** | วางแผน Whole Feature + Next Work Item โดยใช้ Vertical Slices | [SKILL.md](./delivery-planning/SKILL.md) | [TESTS](./delivery-planning/TESTS.md) |
| **implementation** | เขียน Scoped Code ตาม Acceptance พร้อม Developer Checks และ Coding Character | [SKILL.md](./implementation/SKILL.md) | [TESTS](./implementation/TESTS.md) |
| **verify-work-item** | Acceptance-first, Developer Checks, Adversarial Review และ Formal Verification ตาม Gate | [SKILL.md](./verify-work-item/SKILL.md) | [TESTS](./verify-work-item/TESTS.md) |

**Pilot Guide:** [จาก Idea จนจบทุก Stage ภาษาไทย](../playbooks/idea-to-outcome.th.md) และ [คู่มือ Plane Cloud Read/Write](../setup/plane-cloud.th.md)

**Bootstrap สำหรับผู้เริ่มจากศูนย์:** `npm run setup` จาก Root (เลือก Agent/Tracker/Git Hosting และติดตั้ง/ตรวจสอบตามสิทธิ์). ตัว Installer เดิมยังใช้ได้เมื่อจะเลือกเฉพาะ Skills.

**ติดตั้งด้วย Script:** จาก `puen-stack` ที่ Clone และ Review แล้ว ใช้ `node scripts/setup.mjs --dry-run` เพื่อดูสิ่งที่จะติดตั้ง จากนั้น `node scripts/setup.mjs --yes` และ `node scripts/setup.mjs --check --doctor` เพื่อเช็กสถานะ อ่าน [คู่มือ Script](../scripts/README.md) และ [Setup Guide ไทย](../setup/README.th.md)

**สถานะ:** Skills ทั้งเก้าตัวยังเป็น **v0.1 Draft** ยังไม่ได้ยืนยันการใช้งานจริงร่วมกับ Codex/Claude/GitLab การติดตั้ง Skill **ไม่ให้ Permission Push, เปิด Draft MR, Merge, Deploy หรือเข้าถึง Production** อัตโนมัติ

หลักการกลางอยู่ที่ [AGENTS.md](../AGENTS.md) · [Contributing](../docs/CONTRIBUTING.md) และ Accepted Workflows อยู่ที่ [puen-engineer](https://github.com/puennaja/puen-engineer/tree/master/workflows)


**ย้ายเป็นเอกสารขั้นตอน:** [Local Commit](../docs/procedures/local-commit.md) · [Repository Readiness](../setup/repository-readiness.md) พร้อม Test Scenarios เดิม; ไม่ถูกติดตั้งเป็น Skill อีกแล้ว
