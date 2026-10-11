# My Engineer Pilot Playbook — จาก Idea สู่ Product ที่พิสูจน์ผลได้ (ภาษาไทย)

**สถานะ:** v0.1 Pilot Guide ออกแบบแนว Playbook แบบ [pstack](https://github.com/cursor/plugins/tree/main/pstack) แต่ปรับให้เป็นกลางระหว่าง **Codex / Claude** และอิง [7 Accepted Workflows ใน puen-engineer](https://github.com/puennaja/puen-engineer/tree/master/workflows) โดยตรง **Human Gates และ Policy จริงมีลำดับความสำคัญเหนือ Skill เสมอ**

[English](./idea-to-outcome.md) · [Plane Cloud Setup ภาษาไทย](../setup/plane-cloud.th.md) · [Skills](../skills/README.th.md) · [Artifact Templates ภาษาไทย](https://github.com/puennaja/puen-engineer/blob/master/artifacts/workflows/README.th.md)

## เรากำลังพิสูจน์อะไร

เริ่มจาก **Idea สั้น ๆ หรือ Requirement ของ Feature** แล้วให้ AI ช่วยเปลี่ยนเป็นปัญหาและ Acceptance ที่ยืนยันได้ → สำรวจระบบ → ออกแบบ → วางแผน → เขียนโค้ดที่ได้รับมอบหมาย → ทดสอบพฤติกรรมจริง → Independent Review → Draft MR → Release Readiness → Outcome & Learning

Pilot จะผ่านในขอบเขตที่เราทดลองได้ก็ต่อเมื่อ **มีหลักฐานว่าทำจริง** และมนุษย์สามารถเปิด Plane แล้วตอบได้ว่า:
- Idea ถูกตีความถูกต้องหรือไม่ และเปลี่ยนจาก Hypothesis เป็น Requirement ได้อย่างไร?
- ตอนนี้อยู่ Stage ไหน ใครเป็น Owner และ **ติด Human Gate ไหนอยู่**?
- AI สร้าง/แก้ Work Items, Code, Tests หรือ MR อะไรบ้าง? มีลิงก์จริงไหม?
- อะไรคือ `Pass`, `Fail`, `Not run`, `Blocked` หรือ `Inconclusive`?
- ผลลัพธ์ที่ผู้ใช้ต้องการเกิดขึ้นจริงหรือยัง? ถ้ายัง ใครต้องทำอะไรต่อ?

**เลือก Pilot รอบแรกให้เล็ก:** Product แบบ Greenfield หนึ่ง Repo, Data สมมติ, รัน Local/Staging ที่ปลอดภัยก่อน แล้วค่อยทดสอบ Feature ของ Legacy ที่ข้ามหลาย Repos เป็น Pilot รอบสอง การรัน Local ผ่าน **ไม่เท่ากับ Production Release Healthy** และไม่ใช่หลักฐานว่าผู้ใช้จริงได้รับคุณค่าแล้ว

## ใครรับผิดชอบอะไร

- **Human Operator/Product Owner:** ยืนยัน Problem, Scope, Design, Plan และ Acceptance; ถ้าทำคนเดียวอาจเป็น Owner หลายด้านได้ แต่ต้องตัดสินใจและบันทึก **แต่ละ Gate แยกจริง** ถ้า Policy บังคับ Peer Review ก็ยังต้องมี Reviewer ที่มีคุณสมบัติ
- **`work-item-runner`:** ตัว Coordinator ดึง/เขียน Plane Work Item ที่ได้รับสิทธิ์ เลือก Workflow ตาม Stage และอัปเดต Progress ที่อ้างหลักฐาน **ไม่ใช่ตัวอนุมัติ Gate**
- **`codebase-explore`:** สำรวจ Codebase แบบ Read-only / Greenfield Feasibility
- **`verify-work-item`:** เตรียม Expected Behavior ก่อนโค้ด, Developer Checks, และ Formal Verification เมื่อถึงเงื่อนไขจริง
- **`review-change`:** Review Diff อย่างเป็นอิสระ พร้อม Risks/Test Quality
- **`git-commit` / `gitlab-draft-mr`:** Commit แบบ Scoped และเปิด Draft MR โดยแยก Human Permission สำหรับ Push กับแต่ละ MR
- **Plane OAuth Role, GitLab Permissions และ Sandbox:** เป็นสิทธิ์เชิงเทคนิคจริง; Skills ไม่สามารถแจกสิทธิ์เอง

## Step 0 — Setup ตั้งแต่ไม่มีอะไรเลย (ทำครั้งเดียว)

1. **Plane Cloud:** เข้า [app.plane.so](https://app.plane.so) สร้าง Workspace และ Project สำหรับ Pilot ด้วยตัวเอง กำหนด Project Identifier (เช่น `PILOT` เป็นตัวอย่างเท่านั้น), ให้บัญชีที่เชื่อมมี Project Role **Contributor/Admin** เพื่อ Create/Update/Comment ได้ ไม่ต้องใช้สิทธิ์ Admin กว้างเกินจำเป็น
2. **Repository:** เตรียม Git Repo ของ Product ที่ได้รับอนุญาต (เลือก Private ถ้ามีข้อมูลส่วนตัว/บริษัท) Greenfield เริ่มต้น Repo เปล่าได้ ไม่ต้องบังคับสร้างสถาปัตยกรรมก่อน Discovery
3. **Skills:** Clone/Update [puen-stack](https://github.com/puennaja/puen-stack) แล้วรัน `node scripts/setup.mjs` เลือก **Global หรือ Project → Codex/Claude/Both → Skills → Link/Copy → Dry-run Preview → Confirm**; ต้องมี Node.js 18+
4. **Plane MCP:** ติดตั้งและ Login Official Plane Cloud MCP แบบ OAuth แยกสำหรับ Codex และ Claude ตาม [Setup Guide ภาษาไทย](../setup/plane-cloud.th.md) ตัว Skill Installer **ไม่ได้ Login Plane หรือเปิด Write Permission ให้อัตโนมัติ**
5. **ทดสอบ Connection:** ใช้ `work-item-runner` ทำ Read-only ตรวจ Workspace/Project แล้วขออนุญาตสร้าง **Synthetic Pilot Work Item 1 รายการ** จากนั้น Create → Read Back → Update → Comment → Read Back ต้องเห็น ID/URL จริงใน Plane
6. **Human & Safety:** กำหนด Owner ของ Gate, Scope ที่ Agent แก้ Code ได้, Safe Test Fixtures และเลือก Local/Staging ก่อน **ไม่ต้องเปิด Production Access** เพื่อให้ Pilot ครบวงจรตัดสินใจ

**Setup ถือว่าพร้อมเมื่อ:** Skills ถูกค้นพบจริง, Plane MCP Authenticate ได้กับ Project ที่ตั้งใจ, การทดสอบ Create/Update/Comment สำเร็จพร้อมหลักฐาน และมี Repo/Owner/Test Environment ที่ชัดเจน ถ้าไม่ผ่านให้บันทึก `Setup Blocked` ไม่เดา

## Step 1 — โยน Idea ให้ AI

ตัวอย่าง Kickoff Prompt (คัดลอกไป Codex/Claude แล้วใส่ Idea จริง):

```text
Use work-item-runner to start the My Engineer v0.1 Pilot.

IDEA / REQUIREMENT:
<ไอเดีย Product หรือ Requirement ที่อยากทำ>

Tracker: Plane Cloud. Ask me to confirm the exact workspace/project.
Before writing, inspect existing work items and propose one parent
Feature/Idea Work Item. After I approve that project and initial creation,
you may create/update/comment on the authorized parent and approved child
work items for routine progress and evidence tracking.

Follow the Accepted My Engineer Workflows and use minimal Artifacts.
Separate Confirmed / Assumed / Unknown. Ask one important question at a time.
Show actual evidence, pending Human Gates, and Plane changes with real URLs.
Do not delete, merge, deploy Production, or self-approve Human Gates.
```

เมื่อ User ยืนยัน Project/ขอบเขตการเขียนแล้ว AI สามารถ **Write Routine Updates** (เช่น สร้าง Work Item ที่ตกลงแล้ว, ปรับ Description, Comment Evidence) ได้ภายใน Scope นี้โดยไม่ต้องขออนุมัติซ้ำทุก Comment **แต่การขยาย Scope, Human Gate, Push, Draft MR แต่ละอัน, Merge, Deploy ต้องแยกอนุมัติ**

## Step 2–13 — เดิน Lifecycle ตาม Stage และเรียก Skill ให้ถูก

| Step | ใช้ Skill ไหน | AI ต้องทำอะไร / Evidence ที่เห็น | เขียนอะไรลง Plane | จุดที่ Human ต้องตัดสินใจ |
| --- | --- | --- | --- | --- |
| **2. Requirement Discovery** | `work-item-runner` | Clarify Problem, Users, Desired Outcome, Acceptance Examples, Non-goals, แยก Assumed/Unknown | **Parent Work Item** + Discovery Summary ใน Description/Comment เดิม | Problem พอให้ Explore, Prototype, Clarify หรือ Defer? |
| **3. Technical Discovery** | `codebase-explore` | ถ้า Greenfield ให้ตรวจ Feasibility/Constraints; ถ้า Brownfield ให้ Trace Code Flow พร้อม Path/Line, Contracts, Risks | Technical Discovery Summary พร้อม Evidence/Unknown | Evidence พอไป Design หรือทำ Spike อีก? |
| **4. Solution Design** | `work-item-runner` + `codebase-explore` เมื่อจำเป็น | เปรียบเทียบ Options, To-be Flow, API/Data Contracts, Negative Cases, Rollout Risks | Design Proposal พร้อมลิงก์ Decision | **Human Solution Design Gate ระดับ Feature** |
| **5. Delivery Planning** | `work-item-runner` | มอง **Whole-feature Scope + Dependencies** ก่อน แล้วลงรายละเอียด **Next Work Item** แบบ Progressive | Delivery Plan ใน Parent; **สร้าง Child Work Items หลัง Human Planning Gate** | **Human Delivery Planning Gate ระดับ Feature** |
| **6. Acceptance-first** | `verify-work-item` (Preparation) | Test Scenarios / Expected Behavior ที่ยึด Requirement ก่อน Code, Edge/Negative Cases | Expected Behavior ใน Child / Note | ถ้ายัง Ambiguous ให้ Human ตัดสิน Expected |
| **7. Implementation** | Coding Agent + `work-item-runner` | เขียนเฉพาะ Scope ที่มอบหมาย, รักษา Existing Changes, รัน Developer Unit/Lint/Build, เก็บผลจริง | Child Status + Diff/Checks Evidence | **Human Implementation Gate ราย Work Item** เมื่อ Checks ผ่านจริง |
| **8. Independent Verification** | `review-change` + `verify-work-item` | เข้า **Formal** ได้หลัง Developer Checks ที่เกี่ยวข้องผ่านจริง + Human Implementation Gate แล้ว; ตรวจ Fixed Diff, Behavior, Test Quality, Integration | Findings/Pass/Fail/Not run/Blocked พร้อม Evidence; แก้แล้ว Reverify | **Human Verification Gate ราย Work Item** |
| **9. Local Commit** | `git-commit` | Scoped Stage, Commit ตาม `[WORK-123] feat: ...` โดยใช้ **Plane Work Item ID จริง**, ทดสอบ Hooks และบันทึก SHA | Link Branch/Commit กลับ Child | ต้องมี Scoped Commit Authorization; **Commit ไม่ใช่ Push** |
| **10. Push + Draft MR** | `gitlab-draft-mr` | ตรวจ GitLab Host/Project, Source/Target จริง ไม่เดา `master`; ขอ Push Permission แยก แล้ว Draft MR | Link MR URL จริง + CI/Gaps | **Human Confirm ทุก Draft MR แยก**; Ready/Merge **Human เท่านั้น** |
| **11. Release Readiness** | `work-item-runner` | ระบุ Immutable Build, Environment, Deployment Scope, Smoke Checks, Monitoring, Recovery Owner | Release Evidence / Stage Outcome | **Human Go/No-Go ก่อน Production ทุก Release** |
| **12. Observe** | `work-item-runner` | แยก Deploy สำเร็จจาก Service Health, Changed Behavior และ Users/Business Outcome | Actual Result: Local/Staging/Production พร้อมหลักฐาน | Anomaly-driven Intervention ทุก Action ต้อง **Human Confirm ใหม่** |
| **13. Outcome & Learning** | `work-item-runner` | สรุป Success Signal, Residual Risks, Defects, Human Corrections, Runtime, Next Experiment | Outcome Note + Follow-up Owner/Date | Human รับรอง Outcome หรือเลือก Iterate ใหม่ |

**ไม่ใช่ Waterfall ที่ต้องรอทุก Phase ตามตารางเสมอ:** ถ้า Low-risk อาจรวมบาง Artifact ใน Work Item เดียว แต่ห้ามข้าม Human Decision ที่จำเป็น; หากพบ Requirement/Contract ใหม่ที่เปลี่ยน Design ให้ย้อนเฉพาะ Gate ที่ใช้ไม่ได้

**ย้ำ:** Work Item ผ่าน Verification ไม่เท่ากับ Feature ทั้งหมดผ่าน / MR Ready / Merge / Production Healthy ส่วน Release ที่ทำแค่ Local/Staging ต้องเขียนว่า `Production not tested`

## ตัวอย่าง Pilot Greenfield (ข้อมูลสมมติ)

Idea: *"อยากมี Web App เล็ก ๆ จดรายจ่ายแต่ละวัน แล้วรู้ว่าสัปดาห์นี้เหลือเงินเท่าไร"*

1. Discovery: User ต้องการรู้ **เงินที่เหลือใช้** ไม่ใช่ Dashboard สวยอย่างเดียว กำหนด Acceptance ของการเพิ่ม Expense และยอดคงเหลือ
2. Technical Discovery: ถ้ายังไม่มี Code ให้ประเมิน Storage/Stack/Privacy Constraints จากข้อมูลจริง โดยไม่แต่ง As-is Flow
3. Design: เสนอ Option A: Local-first / Option B: Backend + Database และให้ Human เลือกตาม Risk/Outcome
4. Planning: Parent Work Item เก็บ Whole-feature Scope แล้วแตก **Child แรก** แค่ "เพิ่ม Expense แล้วสรุปยอดคงเหลือ" (หลัง Human Planning Gate)
5. Implementation + Verification: Test จำนวนเงินติดลบ, Input ผิด, ความถูกต้องของยอดรวม ใช้ Harness ที่รันได้จริง
6. Commit/MR: `[PILOT-<real-id>] feat: record expenses` (ID ต้องมาจาก Plane จริง) เปิด Draft MR หลัง Human Confirm
7. Release/Outcome: ถ้า Run ใน Local อย่างเดียว → `Local behavior verified; production not deployed; user outcome not yet measured`

**อย่าแต่ง Plane ID, Git Commit SHA, Test Output หรือ MR URL เพื่อให้ตัวอย่างดูจบ**

## วิธีดูว่า Pilot เกิดอะไรขึ้น — ไม่ต้องไล่อ่าน Chat

ใช้ **Parent Plane Work Item เป็น Dashboard/Index** โดย AI อัปเดต Description ที่จำเป็นและเขียน Comment เมื่อมี Milestone สำคัญ (ไม่ Spam ทุกคำสั่ง) ตัวอย่าง:

```text
[My Engineer | AI progress, NOT HUMAN APPROVAL]
Stage: Verification — Work Item <real-id>
Observed evidence: commit/diff/test/CI/MR links ที่เกิดจริง พร้อมเวลา
Actual checks: Pass / Fail / Not run / Blocked / Inconclusive
Human decision: Pending / link ไปยัง Human-authored Approval จริง
Risks / unanswered questions:
Next safe action: <Owner + Action + Checkpoint>
```

ใช้ Plane Activity/Comments ที่มีอยู่เป็น Timeline ไม่สร้าง Issue ใหม่ทุก Stage และไม่บังคับ Log TSV เพิ่ม ถ้า AI ที่ Login ผ่าน OAuth ใช้ Account ของ User ให้ Comment ระบุว่าเป็น **AI Progress ไม่ใช่ Human Approval**; ห้าม AI แอบเขียน "Approved by Human" แทนมนุษย์โดยไม่มี Evidence ต้นทาง

**Prompt สำหรับกลับมาดูสถานะวันรุ่งขึ้น:**

```text
Use work-item-runner in RESUME / STATUS mode for <Plane Parent URL>.
Read the real parent, children, latest activities/comments and linked
Git commit, MR, CI and test evidence. Show what is Completed, what
is Pending Human Approval, Blocked or Not executed. Identify the last
real action, its owner, and the smallest safe next action. Do not write.
```

## เกณฑ์ประเมินว่าตรง Concept ของ My Engineer หรือไม่

| สิ่งที่วัด | หลักฐานที่ต้องเห็น | ถ้าขาดให้บันทึก |
| --- | --- | --- |
| **Correct Requirement** | Human ยืนยัน Problem/Scope และ Acceptance ที่เทียบกับ Behavior จริง | Unknown / Needs Discovery |
| **Human-controlled Workflow** | Human Gate แต่ละระดับมี Decision ต้นทาง พร้อม Owner/เวลา | Pending / Blocked |
| **Actual Code Quality** | Diff/Review Findings/Tests ที่มีประโยชน์ และ Retry ที่ตรวจซ้ำ | Not run / Inconclusive |
| **Traceability** | Plane Idea → Child → Commit → Draft MR → Release/Outcome Links จริง | Partial |
| **Safety** | ไม่มี Write/Push/Merge/Deploy ที่ข้ามสิทธิ์ ไม่มี Duplicate/Secret Leak | Fail + Root Cause |
| **Observability** | เปิด Plane แล้วรู้ Stage, Actor, Checks, Decision, Blocker, Next Owner | Needs Improvement |
| **Value & Efficiency** | Success Signal ที่ยืนยันได้, เวลา/จำนวนรอบแก้/Token Cost เมื่อมีข้อมูลจริง | Not measured / No baseline |

สรุปผล Pilot ว่า `Demonstrated (bounded scope)`, `Partial`, `Blocked` หรือ `Inconclusive` ตาม Evidence จริง ห้ามเขียนว่า Full Production Success ถ้าไม่ได้ผ่าน Human Release Gate และ Observe Production จริง

## จุดหยุดที่สำคัญ

- Plane Project/Role/MCP ไม่พร้อม → บันทึก Blocker; ถ้ายังไม่มี Write Tool ให้เสนอ Payload สำหรับทำเอง ห้ามอ้างว่า Create สำเร็จ
- Requirement/Owner/Risk สำคัญยัง Unknown → ถามเฉพาะคำถามที่ต้องตัดสินใจ
- Required Tests ล้มเหลว → **ไม่เข้า Formal Verification** และไม่เคลม Pass
- Test ต้องยุ่ง Production/DB/Payment จริง → หยุดก่อน Side Effect; หา Safe Alternative
- Branch/Target หรือ GitLab Permissions ไม่ชัด → ห้าม Push/MR มั่ว
- ไม่มี Production Authorization → Pilot ทำ Local/Staging ต่อได้ แต่ Status Production ต้องเป็น `Not deployed / Not tested`

**สถานะ:** Playbook นี้และ Skills ยังไม่ได้ทดสอบ End-to-end ด้วย Plane + Codex/Claude + GitLab ของมึงจริง ต้องทำ Pilot และเก็บ Observed Results ก่อนยืนยันประสิทธิภาพ
