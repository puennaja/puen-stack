# Real Work Template — Feature / Enhancement (TH)

> **Draft v0.1; ทดลองกับงานจริงภายในขอบเขตที่ได้รับอนุญาต** ไม่ใช่การอนุมัติ Workflow ใหม่. Canonical policies อยู่ที่ [puen-engineer](https://github.com/puennaja/puen-engineer/tree/master/workflows); ไฟล์นี้เป็น **prompt + routing template** สำหรับ Codex หรือ Claude Code เท่านั้น.

## ก่อนเริ่ม (สำคัญกับงานบริษัท)
- เปิด **เฉพาะ Repo ที่ได้รับอนุญาต** และตรวจ `AGENTS.md`, Git status, branch, existing changes, PR policies. หากหลาย Repo ให้แยก workspace/scope ชัด; ห้ามให้ Agent เดาว่า Repo อื่นเปิดอยู่.
- เก็บ Jira/Plane, Figma, internal requirements, endpoints, code, secrets และ screenshots **เฉพาะระบบบริษัทที่อนุญาต**; อย่า paste หรือ commit เนื้อหาจริงลง public `puen-stack`, `puen-engineer`, หรือ public pilot. ใช้ placeholders ใน template นี้.
- เช็กนโยบายบริษัทก่อนส่งข้อมูลให้อุปกรณ์/บริการ AI ภายนอก; ถ้าอนุญาตไม่ได้ ให้ใช้ข้อมูลสังเคราะห์หรือหยุดที่แผนงาน.
- `pilot-recorder` เหมาะกับ **approved pilot repo**; ไม่บังคับสร้าง `docs/pilot` ในโปรเจกต์บริษัท. ใช้ Jira/MR/internal docs ที่ได้รับอนุญาต และไม่ duplicate artifacts.
- ถ้าเลือก tracker write ต้องอนุญาต **provider/project/scope** แยกจากสิทธิ์ code edits, commit, Push, Draft PR/MR, Merge และ Release.
- เริ่มโหมด `ASSESS` / read-only ก่อนทุกครั้ง; ห้ามสั่ง Agent ลงมือแก้โค้ดตั้งแต่ Prompt แรก.

## 1) Copy/paste — รับ Feature / Enhancement จริง (โหมด Assess)

```text
$work-item-runner

Mode: ASSESS ONLY (read-only; no edits, tracker writes, commits, pushes or PR/MR).

Request type: Feature / Enhancement / Bugfix (choose actual)
Work item: <internal Jira/Plane URL or ID — provide only to approved company AI>
Original requirement: <paste approved source or point to authorized tracker>
Desired outcome: <what behavior/business result should change; Unknown is OK>
Acceptance / Figma: <approved links or Unknown>
Current repository: <actual open repo path/name>
Other affected services: <known BE/BFF/FE/repos; mark unconfirmed boundaries>
Allowed scope: <repo(s), files, environment, read-only vs approved writes>
Human owner: <PO/Tech decision owner and reviewer; Unknown if not assigned>
Git host: <GitHub/GitLab as verified by remote>
Constraints: <security/privacy, backward compatibility, migration, rollout>

Follow accepted My Engineer workflows from puen-engineer; treat repo AGENTS.md
and company policy as higher-priority local constraints.

1. Read the actual issue, approved internal references and accessible repo first.
2. State Confirmed / Assumed / Unknown / contradictory facts with sources.
3. Recommend the next relevant skill and explain why; do not force every skill.
4. If discovery is needed, use requirement-discovery grilling-style: ask ONE
   high-impact question per turn, give options and a grounded recommendation,
   and wait for my answer. Do not invent a PO approval.
5. Show current stage, proposed affected files/services, risks, evidence gaps,
   required human decision, and the smallest safe next action.
6. Stop before writes; request specific authorization for each bounded action.
7. Keep internal information within authorized company systems only.
```

### ตัวอย่างแบบสังเคราะห์ (ไม่ใช่ Requirement บริษัท)
- Feature: เพิ่ม Operation History ให้หน้ารายละเอียดรายการธุรกรรมใน Admin UI
- คาดว่าเกี่ยวข้องกับ Admin Web, BFF และ Service แต่ต้องยืนยันจาก Code และ API จริง
- คำถามแรกที่สมควรถาม: "ใครมีสิทธิ์เห็นประวัติ?" ก่อนเลือก Schema หรือ Endpoint

## 2) Routing — เรียก Skill ไหนตอนไหน

| สถานการณ์ / Stage | Skill/ขั้นตอน | หลักฐาน / จุดหยุด |
| --- | --- | --- |
| รับ Card ยังไม่ชัด / PO ไม่ได้ระบุ Edge Cases | `work-item-runner` → `requirement-discovery` | Discovery Summary; คนรับผิดชอบยืนยันข้อสรุปก่อนออกแบบ |
| ต้อง Trace Legacy, API, DB, Side Effects | `codebase-explore` (read only) | path/line + flow + confirmed/unknown contracts |
| ตัดสินใจ Design | `solution-design` | options, trade-offs, contract, tests; **Human Design Gate (Feature)** |
| แตกงาน / จัด Dependency | `delivery-planning` | whole-feature map + next actionable Work Item; **Human Planning Gate (Feature)** |
| งานที่ได้รับอนุมัติให้แก้ | `verify-work-item` (acceptance-first) → `implementation` | developer tests/checks จริง; **Human Implementation Gate (Work Item)** |
| ตรวจอิสระ | `verify-work-item` (Formal, including independent review) | locally feasible verification; **Human Verification Gate (Work Item)** |
| Local commit → publish | [Local commit procedure](../docs/procedures/local-commit.md) → `draft-change-request` | scoped commit; separate Push approval and per-PR/MR human confirmation |
| Release & Outcome | `work-item-runner` + Accepted Release Workflow | Human release Go/No-Go, observable health and outcome; no auto-merge/deploy |

**Verify Before Publish:** Required developer checks PASS → Human Implementation Gate → feasible Formal Independent Verification → Human Verification Gate → separately authorized Push → separately confirmed Draft PR/MR. Remote CI/preview exception **only** with explicit narrow human permission; missing evidence remains Not run/Blocked. After review findings rerun impacted checks, independent verification and relevant gates.

## 3) Reusable prompts ตาม Stage

**หลัง Requirement Discovery ได้รับการยืนยัน (ยังไม่แก้โค้ด):**
```text
$work-item-runner
Resume <work-item>; use codebase-explore in this authorized repo.
Trace current behavior and impacted contracts with actual file/line evidence.
Read-only. Mark other repos Unknown unless separately authorized.
Output only the Technical Discovery summary and next design question.
```

**ขอ Design Gate:**
```text
$solution-design
Use confirmed Discovery + Technical Discovery evidence.
Show simplest viable option and realistic alternative (when consequential),
API/data contracts, backward compatibility, security, failure cases,
migration/rollout, verification plan and unresolved assumptions.
Do not implement. Ask for explicit Feature-level Human Design decision.
```

**หลัง Design ได้รับอนุมัติ:**
```text
$delivery-planning
Use the human-approved design and real tracker parent.
Map full affected feature/dependencies, then detail ONLY the next owned
Work Item: scope, repo, acceptance, negative cases, tests and done evidence.
Propose tracker child creation only after Human Planning Gate and scoped write.
```

**ทำงาน Work Item ที่ได้รับมอบหมาย (อนุมัติแก้โค้ดแยก):**
```text
$implementation
Assigned Work Item: <ID/link>
Authorized repo/branch/scope: <confirmed>
Human-approved Design/Planning evidence: <links>
First use verify-work-item in acceptance-first (non-formal) mode.
Preserve existing changes; implement minimal idiomatic behavior.
Run actual unit/regression/build/lint checks and report observed outcomes.
Stop at the per-Work-Item Human Implementation Gate.
Do not commit, push or open a PR/MR without separate authorization.
```

**หลัง Implementation Gate ผ่านจริง:**
```text
$verify-work-item
Use Formal mode only after required passing developer checks and actual
Human Implementation approval. Independently check diff, behavior,
negative cases, integration contracts and test quality.
Record Pass/Fail/Not run/Blocked + evidence. Request Human Verification Gate.
No publish or implicit approvals.
```

**ส่ง Code ขึ้น Git หลังผ่าน Gate ที่เกี่ยวข้อง:**
```text
$draft-change-request
Inspect actual git host, current source and proposed target (never guess),
commit/check/CI evidence and existing PR/MR. Propose one Draft PR/MR.
Ask separately for scoped Push authorization and explicit approval for this
exact PR/MR (repo, source, target, title, reviewer).
Do not mark Ready/Merge/Deploy.
```

## 4) Handoff Template ระหว่าง Session / Agent

```text
$work-item-runner
Mode: RESUME / STATUS (read-only).
Work item: <real authorized URL>
Repo / current branch: <actual>
Read tracker history, linked decisions, current code/diff and check evidence.
Summarize:
- Current feature stage / current Work Item:
- Confirmed / Assumed / Unknown:
- Human gates: Approved (source) / Pending:
- Changed paths, commits, CI or PR/MR (only real links):
- Tests: Pass / Fail / Not run / Blocked:
- External contract/dependency owners:
- Next smallest safe action and which skill to use:
Do not modify anything until separately authorized.
```

## 5) Preflight & Acceptance Checklist (manual)

- [ ] Evidence source is authorized, and no confidential company content was copied into public repos
- [ ] Current repo, scope and pre-existing Git changes are known
- [ ] Confirmed and assumed requirements are distinct; unresolved high-risk behavior is not silently guessed
- [ ] Each human gate has an actual decision source (not an AI status)
- [ ] Developer and Formal Verification evidence is factual; gaps are labeled
- [ ] Push/PR/MR approval is separately scoped and target branch confirmed
- [ ] Output is stored in existing authorized tracker/MR/docs, with no unnecessary duplication

**Testing status:** template review only, not live-validated on company systems or a target IDE. If policy prevents AI access to internal links, use redacted/synthetic inputs rather than unauthorized disclosure.
