# git-commit — Local Commit แบบ Scoped (v0.1 Draft)

> คู่มือภาษาไทยของ [SKILL.md](./SKILL.md) ที่เป็น Entry Point เดียวของ Codex/Claude ไม่ใช่ Skill อีกตัวหนึ่ง และไม่เปิด Permission ให้ Git

อ้างอิง [Accepted Implementation Workflow](https://github.com/puennaja/puen-engineer/blob/master/workflows/implementation.th.md) และ [Synthetic Test Scenarios](./TESTS.md)

## Trigger และ Inputs

ใช้เมื่อ Human ขอให้ **เตรียม / Review / สร้าง Local Commit** ต้องรู้ Repo/Branch จริง, Jira Work Item ที่ได้รับมอบหมาย, Approved Scope, Commit Convention ของ Repo, ไฟล์/ส่วนของไฟล์ที่จะ Commit และ **Observed Results** ของ Developer Checks การแก้โค้ดเสร็จไม่ใช่การอนุญาต Commit

## Preconditions

1. อ่าน `AGENTS.md` ของ Repo, Branch/Commit Rules, Scope ที่อนุมัติ และ Diff จริง ตรวจ `git status --short --branch`, `git diff --stat`, `git diff --cached --stat`, `git diff --check`
2. แยก **Changes ของเดิม, Untracked, Staged, Mixed Hunks และ Changes ของ Agent** ห้ามเอาไฟล์ที่คนอื่น Stage ไว้มารวมเอง ถ้าแยก Scope ไม่ได้ให้ **หยุดถาม** ห้าม Stash/Reset/Discard/Amend/Rebase/Switch Branch เพื่อให้ทำงานง่ายขึ้น
3. ตรวจ Secret/ข้อมูลบริษัท, Generated Files, Unrelated Refactor และ Contract/Schema Risks ถ้าพบให้หยุดแจ้งโดยไม่พิมพ์ค่า Secret
4. ตรวจ Unit/Regression, Build/Lint/Typecheck, Hooks ที่จำเป็น **จากผลรันจริง** แยก Pass/Fail/Not run/Blocked/Inconclusive ถ้า Required Check ไม่ผ่าน/ไม่ได้รัน ต้องมี Human/Policy Decision ก่อน Commit ห้ามใช้ `--no-verify`

## Procedure

1. เสนอ **Commit Proposal**: Work Item, Included/Excluded Paths หรือ Hunks, Evidence, Message ที่ตรง Convention ของ Repo ไม่เดา Pattern กลาง
2. ถ้าผู้ใช้ขอ Proposal อย่างเดียว **ห้าม Commit** หากคำสั่ง Commit ยังไม่ชัด ต้องถาม; แม้ผู้ใช้สั่ง Commit กว้าง ๆ ถ้ามี Pre-staged Content, Mixed Hunks หรือ Sensitive Changes ต้องขอยืนยันเนื้อหาที่แน่นอน
3. Stage **เฉพาะเนื้อหาที่อนุมัติ** `git add -- <explicit paths>` ใช้ได้ต่อเมื่อทั้งไฟล์อยู่ใน Scope; ถ้า Mixed Hunks ต้องเลือก Hunk อย่างปลอดภัยหรือถาม Human **ห้าม `git add .` / `git add -A` / `git commit -a`**
4. ตรวจ `git diff --cached --name-status`, `git diff --cached --check`, `git diff --cached` ว่าตรง Scope ทั้งหมดก่อน Commit
5. ถ้า Permission/Checks ครบ ค่อย `git commit -m "<message>"` ตามที่ตกลง ปล่อย Hooks รัน; หาก Fail ต้องหยุด ไม่ข้าม
6. รายงาน Commit SHA ที่เกิดจริงผ่าน `git show --stat --oneline HEAD`, `git status --short`, และ Remaining Changes ที่ไม่เกี่ยวข้อง

## Output / Stop Conditions

รายงาน Work Item, Repo/Branch, Included Files/Hunks, SHA/Message หรือ **Not executed**, ผล Tests จริง, Remaining Changes, Risks และ Owner หาก Dirty Tree/Permission/Hooks/Required Checks ยังไม่ปลอดภัยให้หยุดโดยไม่ลบข้อมูล

**Commit ไม่ใช่ Push Permission**; เปิด Draft MR ต้องถาม Human แยกทุก MR และ Human เท่านั้น Mark Ready/Merge หรือ Approve Production. **v0.1 ยังไม่ได้ทดสอบ Live บน Codex/Claude**
