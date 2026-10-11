# My Engineer Playbooks (ภาษาไทย)

Playbook บอกว่า **ต้องทำอะไร ใช้ Skill ไหน และต้องเห็น Evidence อะไรจึงไปต่อได้** โดยยึด [Accepted Workflows ใน puen-engineer](https://github.com/puennaja/puen-engineer/tree/master/workflows) ไม่ Copy การ Auto-run/Approve แบบ Cursor-specific ของ pstack มาใช้ตรง ๆ

[English](./README.md)

## เริ่มตรงนี้

**[คู่มือ Pilot จาก Idea → Feature ที่ทำงานจริง → Outcome (ครบทุก Step)](./idea-to-outcome.th.md)**

หรือ [English Playbook](./idea-to-outcome.md)

รองรับ Idea แบบ Greenfield เริ่มจาก Repo เปล่า, Feature Requirement จาก Repo เดิม และการ Resume งานวันถัดไปจาก Plane Work Item/Comments/Commit/MR จริง

## เรียก Skills ตามงาน

| ช่วง | Skill | หลักฐานและขอบเขต |
| --- | --- | --- |
| รับ Idea, จัด Stage, อ่าน/เขียน Plane, Resume | [work-item-runner](../skills/work-item-runner/SKILL.md) | Routine Tracker Writes ที่มีสิทธิ์ / ห้ามอนุมัติ Human Gate เอง |
| สำรวจ Source, Data Flow, Greenfield Feasibility | [codebase-explore](../skills/codebase-explore/SKILL.md) | Evidence จริง + Unknown ของ Repo ที่เข้าไม่ถึง |
| Acceptance ก่อนโค้ด, Developer/Independent Checks | [verify-work-item](../skills/verify-work-item/SKILL.md) | Formal Verification หลัง Developer-green + Human Implementation Gate |
| Review Diff, Risks และ Integration | [review-change](../skills/review-change/SKILL.md) | Human Verification Gate แยก |
| Local Commit ตาม `[WORK-123] feat: ...` | [git-commit](../skills/git-commit/SKILL.md) | ใช้ Plane/Jira ID จริง; Commit ไม่ใช่ Push |
| เปิด Draft MR | [gitlab-draft-mr](../skills/gitlab-draft-mr/SKILL.md) | ขอ Human Confirm ทุก MR; Ready/Merge Human เท่านั้น |
| ตรวจ Setup ของ Repo | [setup-puen-stack](../skills/setup-puen-stack/SKILL.md) | ไม่เปิดสิทธิ์/Login ให้เอง |

**Setup ก่อน Pilot:** [Wizard ติดตั้ง Skills Global/Project](../scripts/README.md) + [คู่มือ Plane Cloud OAuth/Read/Write ภาษาไทย](../setup/plane-cloud.th.md)

## เราจะรู้ได้อย่างไรว่าเกิดอะไรขึ้น

ใช้ **Plane Parent Work Item เป็น Index** และ Plane Activity/Comments + GitLab MRs/Commits/CI ที่เกิดจริงเป็น Timeline ไม่สร้าง Ticket/Markdown Log ซ้ำทุก Phase ต้องแยกข้อความ AI, Human Decision, Executed Tests, Blockers และ Business Outcomes ออกจากกัน

**สถานะ:** ยังเป็น Pilot Draft จนกว่าจะทดสอบ End-to-end ด้วย Plane/Codex/Claude/GitLab จริง การทดสอบ Local/Staging ไม่ได้อนุมัติหรือพิสูจน์ Production
