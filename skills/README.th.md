# puen-stack Skills (ภาษาไทย — v0.1 Draft)

[English](./README.md) · [คู่มือ Setup ไทย](../setup/README.th.md) · [Setup EN](../setup/README.md)

Codex และ Claude ใช้ **Skill Entry Point `SKILL.md` ภาษาอังกฤษเดียวกัน** ไม่ต้องมี `SKILL.th.md` คู่กัน ส่วนเอกสาร Setup และ Catalog ยังคงแยกภาษาไทย/อังกฤษได้

| Skill | ใช้เมื่อ | Skill (EN) | Test Scenarios |
| --- | --- | --- | --- |
| **git-commit** | Local Commit แบบ Scoped พร้อม Template `[<subtask-id>] feat: <summary>` (ใช้ Repo Convention ก่อนเสมอ) | [SKILL.md](./git-commit/SKILL.md) | [TESTS](./git-commit/TESTS.md) |
| **git-draft-pr** | เปิด GitHub Draft PR หลังตรวจ Remote, Human Push/PR Confirm แยกกัน | [SKILL.md](./git-draft-pr/SKILL.md) | [TESTS](./git-draft-pr/TESTS.md) |
| **gitlab-draft-mr** | เตรียม Draft MR และขอ Human Confirm **ทุก MR** | [SKILL.md](./gitlab-draft-mr/SKILL.md) | [TESTS](./gitlab-draft-mr/TESTS.md) |
| **setup-puen-stack** | ตรวจ Repo, Git Flow, Issue Tracker, AGENTS.md และสิทธิ์ก่อนใช้งานจริง | [SKILL.md](./setup-puen-stack/SKILL.md) | [TESTS](./setup-puen-stack/TESTS.md) |
| **work-item-runner** | รับ Idea, เดิน Workflow, อ่าน/เขียน Plane แบบ Scoped และติดตาม Human Gates | [SKILL.md](./work-item-runner/SKILL.md) | [TESTS](./work-item-runner/TESTS.md) |
| **codebase-explore** | สำรวจ Code จริง / Greenfield Feasibility พร้อม Evidence | [SKILL.md](./codebase-explore/SKILL.md) | [TESTS](./codebase-explore/TESTS.md) |
| **verify-work-item** | Acceptance-first, Developer Checks และ Formal Verification ตาม Gate | [SKILL.md](./verify-work-item/SKILL.md) | [TESTS](./verify-work-item/TESTS.md) |
| **review-change** | Independent Diff/Tests/Blast-radius Review | [SKILL.md](./review-change/SKILL.md) | [TESTS](./review-change/TESTS.md) |

**Pilot Guide:** [จาก Idea จนจบทุก Stage ภาษาไทย](../playbooks/idea-to-outcome.th.md) และ [คู่มือ Plane Cloud Read/Write](../setup/plane-cloud.th.md)

**ติดตั้งด้วย Script:** จาก `puen-stack` ที่ Clone และ Review แล้ว ใช้ `node scripts/setup.mjs --dry-run` เพื่อดูสิ่งที่จะติดตั้ง จากนั้น `node scripts/setup.mjs --yes` และ `node scripts/setup.mjs --check --doctor` เพื่อเช็กสถานะ อ่าน [คู่มือ Script](../scripts/README.md) และ [Setup Guide ไทย](../setup/README.th.md)

**สถานะ:** Skills ทั้งแปดตัวยังเป็น **v0.1 Draft** ยังไม่ได้ยืนยันการใช้งานจริงร่วมกับ Codex/Claude/GitLab การติดตั้ง Skill **ไม่ให้ Permission Push, เปิด Draft MR, Merge, Deploy หรือเข้าถึง Production** อัตโนมัติ

หลักการกลางอยู่ที่ [AGENTS.md](../AGENTS.md) · [Contributing](../docs/CONTRIBUTING.md) และ Accepted Workflows อยู่ที่ [puen-engineer](https://github.com/puennaja/puen-engineer/tree/master/workflows)
