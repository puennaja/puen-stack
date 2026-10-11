# gitlab-draft-mr — เปิด GitLab Draft MR แบบ Human Confirm ราย MR (v0.1 Draft)

> คู่มือไทยของ [SKILL.md](./SKILL.md) ซึ่งเป็น Entry Point เดียวของ Codex/Claude ไม่ใช่ Skill คนละตัว และไม่ได้ให้ GitLab Token หรือสิทธิ์ Push

อ้างอิง [Implementation v1.0 (Accepted)](https://github.com/puennaja/puen-engineer/blob/master/workflows/implementation.th.md) และ [Synthetic Tests](./TESTS.md)

## Trigger / Inputs

ใช้เมื่อผู้ใช้ขอ **เตรียมหรือสร้าง Draft MR** ต้องรู้ Jira Work Item, GitLab Host/Repo จริง, **Human Implementation Gate ที่ Approved**, Source Branch, **Target Branch ที่สืบ Git Flow แล้ว**, Publish Permission ของ Source, Commits, MR Description และ Cross-repo Dependencies

## Mandatory Preflight

1. อ่าน `AGENTS.md`, Git Flow/Contributing/Review Rules, `git status --short --branch`, `git branch -vv`, `git remote -v` และ Source/Target Refs ที่เกี่ยวข้อง **ห้ามเดา Target เป็น master/main/default**
2. ยืนยัน **GitLab Host และ Namespace/Project** จาก Git Remote ตรวจ Existing MRs/CI/Review Policies ด้วย `glab` แบบ Read-only หรือ Integration ที่อนุญาต VS Code เปิด Repo เดียวไม่ได้แปลว่าเห็น Sibling Repos
3. ตรวจ **Human Implementation Gate Approved** และ **Scoped Push Approval แยกต่างหาก** หาก Source ยังไม่ Push ให้ถามก่อน ห้าม Force Push หรือแตะ Protected Branch
4. ถ้า Repo/Host/Target ไม่ชัด, MR ซ้ำ, Commit/Required CI ขาด, Contract Dependency ไม่พร้อม, Permission ไม่พอ, พบ Secret → **หยุด ไม่เปิด MR**
5. เตรียม Proposal: **Host/Project, Source → Target, เหตุผล Target ของ Work Item นี้**, Jira Link, Draft Title/Description, Tests ตามผลจริง Pass/Fail/Not run, Risks, Dependencies และ Reviewer

## Human Checkpoint — ทุก MR ต้องถามใหม่

**ก่อน Create Draft MR ทุกครั้งต้องแสดง Proposal ให้ Human ยืนยันเฉพาะ MR นั้น** ทั้ง Project/Source/Target, เหตุผล, Description, Dependencies ห้ามเอา Approval ของ Implementation Gate, Push, CI, MR เก่า หรือ Blanket Approval มาแทน หาก Source/Target/Scope เปลี่ยนต้องยืนยันใหม่ ต้องทำแยกแม้ Work Item มีหลาย Repos

## Execute เฉพาะหลัง Human Confirm

1. Recheck Host/Project, Approved Source/Target, Published Source ที่ Push อย่างถูกสิทธิ์ และ Confirmation ว่ายังใช้ได้
2. ใช้ `glab` ที่ Authenticate กับ Host นั้น หรือ GitLab Tool ที่ได้รับอนุญาต ตัวอย่าง **โครงคำสั่งเท่านั้น**:
   ```text
   glab mr create --repo <group/project> --source-branch <approved-source> --target-branch <approved-target> --title "<approved-title>" --description-file <approved-file> --draft --yes
   ```
3. ตรวจ **MR URL จริง / Draft State / Source-Target** ที่ Tool คืนมา พร้อม CI/Errors จริง ห้ามเดาหรือแต่ง Link
4. Multi-repo / Stacked MRs ต้องวน Preflight + Human Confirm ใหม่ทุก MR

## Output / Failure Handling

รายงาน Project, Source/Target และ Rationale, Jira/Approval Evidence, MR URL ที่เกิดจริง **หรือ Blocked/Not executed**, Tests/CI, Reviewer, Dependencies และ Next Action

**Human เท่านั้น Mark Draft→Ready, Merge หรือ Approve Production** Skill ไม่เปิดสิทธิ์ Push/Force Push/Protected Branch/Deploy/Feature Exposure ไม่ขอ Token ลง Chat หรือ Commit Secrets **v0.1 ยังไม่ Live-tested กับ GitLab/Codex/Claude**
