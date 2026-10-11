# puen-stack Skills (ภาษาไทย — v0.1 Draft)

[English](./README.md) · [คู่มือ Setup ไทย](../setup/README.th.md) · [Setup EN](../setup/README.md)

หนึ่ง Skill มี **Entry Point ภาษาอังกฤษ `SKILL.md` เพียงไฟล์เดียว** ที่ Codex กับ Claude ใช้ร่วมกัน ส่วนคู่มือ Setup และ Catalog สำหรับคนอ่านยังคงแยกภาษาไทยได้ เพื่อลดงานดูแล Skill ซ้ำสองภาษา

| Skill | ใช้เมื่อ | Skill (EN) | Test Scenarios |
| --- | --- | --- | --- |
| **git-commit** | เตรียม/Review/ทำ Local Commit แบบ Scoped | [SKILL.md](./git-commit/SKILL.md) | [TESTS](./git-commit/TESTS.md) |
| **gitlab-draft-mr** | เตรียม/สร้าง Draft MR เมื่อ **Human ยืนยัน Source/Target เฉพาะ MR นั้น** | [SKILL.md](./gitlab-draft-mr/SKILL.md) | [TESTS](./gitlab-draft-mr/TESTS.md) |

**สถานะ:** v0.1 Draft ทั้งสอง Skills **ยังไม่ได้ Live Test กับ Codex/Claude/GitLab** Test Scenarios ที่เขียนไว้ยัง Not run ไม่มี Script ติดตั้ง ไม่มี Credential/Permission ที่เปิดให้เครื่องจริง และไม่ให้ AI Auto Push/Ready/Merge/Deploy

**แบ่งความรับผิดชอบ:** [puen-engineer](https://github.com/puennaja/puen-engineer/tree/master/workflows) เก็บ Accepted Workflows ส่วน `puen-stack` เก็บ Skills/Setup/Reusable Tools อ่าน [AGENTS.md](../AGENTS.md) กับ [Contributing](../docs/CONTRIBUTING.md) และทำ Setup ด้วยเจ้าของเครื่องก่อนใช้งานจริง
