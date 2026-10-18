# puen-stack — คู่มือ Setup Codex + Claude Code (v0.1 Draft)

**เป้าหมาย:** ติดตั้ง Skills ของ Codex/Claude จาก `puen-stack` ด้วย [Setup Script](../scripts/setup.mjs) ตัวเดียว แล้วตรวจสิทธิ์ Git/GitLab แบบ **Least Privilege** การรัน Script ต้องให้เจ้าของเครื่องยืนยันเอง และ **ไม่ใช่การอนุมัติ Permission / GitLab Login อัตโนมัติ**

[English](./README.md) · [รายการ Skills](../skills/README.md) · [Accepted Workflows — puen-engineer](https://github.com/puennaja/puen-engineer/tree/master/workflows)

**Bootstrap หลัก:** ใช้ `npm run setup` เพื่อเลือก Agent, Tracker, Git Hosting และ Skill Scope (Global/Project). คู่มือด้านล่างเป็น Manual/Skill-only fallback; ไม่บังคับ Plane หรือ GitLab.

## Quick start — ใช้ Script ติดตั้ง (แนะนำ)

ติดตั้ง **Node.js 18+** และ Clone Repo ที่ตรวจสอบแล้วก่อน ใช้คำสั่งเดียวกันได้ทั้ง Windows PowerShell และ macOS/Linux (บน Windows จะใช้ `node .\\scripts\\setup.mjs` ก็ได้):

```bash
git clone https://github.com/puennaja/puen-stack.git
cd puen-stack
node scripts/setup.mjs
node scripts/setup.mjs --check --doctor
```

เมื่อรัน **โดยไม่ใส่ Arguments จะเข้า Interactive Wizard** ให้เลือก **Global หรือ Project → Codex / Claude / Both → Skills ที่ต้องการ → Link หรือ Copy** จากนั้นแสดง **Dry-run Preview ของ Path ที่จะติดตั้งจริง** และถามยืนยันก่อนเขียนไฟล์ ค่าเริ่มต้นคือ **Global + Both + All Skills + Link** ไปยัง `~/.agents/skills` และ `~/.claude/skills` (Windows ใช้ Junction) ส่วน Project ต้องระบุ Path ที่มีจริง และค่าเริ่มต้นเป็น **Copy** ถ้ากดยกเลิกจะไม่เขียนไฟล์

กรณี CLI/Automation ใช้ `--dry-run`, `--scope project --project <path> --agent codex --yes` หรือ `--check` ได้เหมือนเดิม **ถ้าไม่มี Arguments แต่ไม่ใช่ Interactive Terminal ระบบจะไม่ติดตั้งเอง** Script รันซ้ำได้และ **ไม่ทับ Skill ที่มีอยู่**, ไม่ Login GitLab, ไม่เปิดสิทธิ์ Agent/GitLab, ไม่ Push, ไม่เปิด MR หรือ Deploy

```bash
node scripts/setup.mjs --list
node scripts/setup.mjs --dry-run
node scripts/setup.mjs --agent codex --skill draft-change-request --dry-run
node scripts/setup.mjs --scope project --project /path/to/repo --agent codex --yes
node --test scripts/setup.test.mjs
```

กรณี **Project Scope** ต้องระบุ `--project` ชัดเจน ค่าเริ่มต้นจะ **Copy** Skills ไปในโปรเจกต์ (ไม่ใช่ Link Source กลาง) และตรวจว่ารันซ้ำไม่ทับไฟล์ที่แก้เอง หากจะ Link Source กลางใน Project ให้เลือก `--mode link` เอง ระวัง `.agents/` / `.claude/` ปรากฏใน Git Status

เมื่อติดตั้งแล้ว เปิด Repo งานจริงด้วย Codex/Claude และสั่ง: **“ใช้ Skill repository readiness guide ตรวจ AGENTS.md, Git Flow, Issue Tracker และ Permission ที่จำเป็นของ Repo นี้ เสนอแผนก่อนแก้ไฟล์”** Skill นี้ช่วยถามและตรวจให้ แต่ไม่ได้เปิด Permission เอง

**สถานะ Test:** ทดสอบ Installer Logic กับ Synthetic Fixtures ภายในเครื่องแล้ว ส่วนการค้นพบ Skill บน Codex/Claude ที่ติดตั้งจริง, Junction บน Windows, GitLab Login และ Permission ของ Repo งานจริง **ยังต้อง Pilot แยก**

**Pilot ใช้ Plane Cloud แบบ Read/Write:** ดู [คู่มือเชื่อม Plane Cloud OAuth](./plane-cloud.th.md) และ [Playbook เริ่มจาก Idea จนครบ Lifecycle](../playbooks/idea-to-outcome.th.md) Script ติดตั้งแค่ Skill Directory **ไม่ได้ตั้ง Plane MCP/Login/Permissions ให้อัตโนมัติ** และจะค้นพบ Skills ทั้งเจ็ดตัวที่มีใน Repo

## 0. เตรียมก่อน

- ใช้กับเครื่องและ Repository ที่ได้รับอนุญาตเท่านั้น ตรวจ Company Policy, Branch Protection, Reviewers, Secrets และข้อห้ามการติดตั้ง Software
- ตรวจ Version: `git --version`, `codex --version`, `claude --version`, `glab --version` ติดตั้ง/อัปเดตตาม Official Docs ก่อน
- **Skill ไม่ใช่ Permission:** Read, Edit, Run Tests, Network, Git Commit, Git Push, Create Draft MR, Merge, Deploy เป็นคนละ Action/Approval
- อย่าดึง Skills เวอร์ชันใหม่เข้าเครื่อง Sensitive Project โดยไม่ Review/Pinned Version — Repo Public ที่เปลี่ยน Skill อาจเปลี่ยน Instruction ของ AI ได้
- Repo ที่เปิด VS Code คนละหน้าต่างไม่ใช่ Shared Workspace AI ห้ามอ้างว่ามองเห็น Sibling Repo
- ใช้ `AGENTS.md` เป็น Project Policy Source ที่ต้องอ่าน ตรวจด้วยว่า Version ของ Claude/Codex ที่ติดตั้งอ่านไฟล์นี้ได้จริงหรือไม่ ถ้าไม่แน่ใจให้ **สั่ง Agent อ่าน `AGENTS.md` ตรง ๆ** ไม่บังคับสร้าง `CLAUDE.md`

## 1. Clone `puen-stack` เป็น Source กลาง

ตัวอย่าง macOS/Linux (ปรับ Folder ได้ตามเครื่อง):

```bash
mkdir -p "$HOME/src"
git clone https://github.com/puennaja/puen-stack.git "$HOME/src/puen-stack"
cd "$HOME/src/puen-stack"
git status --short --branch
```

ถ้ามี Repo อยู่แล้ว **ห้าม Clone ทับ** ตรวจ Local Changes ก่อน `git pull --ff-only` ด้วยตัวเอง หากใช้กับงานจริงให้ Review/Pinned Commit ก่อนอัปเดต Skills

## 2. ติดตั้งด้วยมือ (Fallback เมื่อไม่ได้ใช้ Script)

**แนะนำให้ใช้ Setup Script ข้างบนก่อน** ส่วนนี้เป็นทางเลือกติดตั้งด้วยมือ Canonical Skill อยู่ `puen-stack/skills/<name>/SKILL.md` **ภาษาอังกฤษเท่านั้น** เพื่อให้ Codex กับ Claude อ่าน Source เดียวกัน ส่วนคู่มือ Setup มีทั้งไทย/อังกฤษ

**macOS/Linux:** ตรวจว่า Destination ยังไม่ใช้งาน ก่อนสร้าง Symlink

```bash
mkdir -p "$HOME/.agents/skills" "$HOME/.claude/skills"
for skill in draft-change-request work-item-runner codebase-explore verify-work-item; do
  ln -s "$HOME/src/puen-stack/skills/$skill" "$HOME/.agents/skills/$skill"
  ln -s "$HOME/src/puen-stack/skills/$skill" "$HOME/.claude/skills/$skill"
done
```

**Windows PowerShell:** หลัง Clone เข้า `$HOME\src\puen-stack` และตรวจว่าปลายทางไม่มี Existing Skill ซ้ำ:

```powershell
$source = Join-Path $HOME 'src\puen-stack\skills'
$codexSkills = Join-Path $HOME '.agents\skills'
$claudeSkills = Join-Path $HOME '.claude\skills'
New-Item -ItemType Directory -Force -Path $codexSkills, $claudeSkills | Out-Null
foreach ($name in @('draft-change-request', 'work-item-runner', 'codebase-explore', 'verify-work-item')) {
  $target = Join-Path $source $name
  foreach ($root in @($codexSkills, $claudeSkills)) {
    $link = Join-Path $root $name
    if (-not (Test-Path -LiteralPath $target)) { throw "Skill source missing: $target" }
    if (Test-Path -LiteralPath $link) { throw "Review existing destination; do not overwrite: $link" }
    New-Item -ItemType Junction -Path $link -Target $target | Out-Null
  }
}
```

Junction เหมาะกับ Folder ภายในเครื่อง/Filesystem ที่รองรับ Symlink อาจต้องเปิด Developer Mode หรือใช้สิทธิ์ Admin ตาม Windows Settings **อย่าลบ Existing Destination ทิ้งอัตโนมัติ** ถ้า Environment/Sandbox ตาม Link ไปไม่ได้ ให้ใช้ Manual Copy ที่มีขั้นตอน Sync/Review ชัดเจน

Codex อ่าน `~/.agents/skills/<skill>/SKILL.md` ส่วน Claude อ่าน `~/.claude/skills/<skill>/SKILL.md` ต้องทดสอบ **Version จริงของ Agent** ว่า Skill ถูกค้นพบ เพราะ Agent ที่รัน Cloud อาจไม่เห็น Folder ส่วนตัวบนเครื่อง

## 3. Sandbox และ Permission Prompts

**Codex:** เปิด `~/.codex/config.toml` บนเครื่องเอง แล้วพิจารณาค่าเริ่มต้นนี้ (Merge กับ Config เดิม):

```toml
approval_policy = "on-request"
sandbox_mode = "workspace-write"
```

นี่เป็นค่า Prompt/Sandbox ไม่ใช่ Approval ของ Jira หรือ GitLab ในบาง Version เขียน `.git` หรือเข้าถึง Network อาจต้องขอ Escalation เพิ่ม แม้เป็น Workspace-write **ห้ามเปิด `danger-full-access`, `--yolo`, หรือ `approval_policy = "never"` เพื่อข้ามปัญหา Permission**

**Claude Code:** เปิด `~/.claude/settings.json` และ Merge กับ Settings เดิม ห้าม Replace ทุกค่า:

```json
{
  "permissions": {
    "defaultMode": "default",
    "ask": [
      "Bash(git push *)",
      "Bash(glab mr create *)"
    ]
  }
}
```

Rules ข้างบน **ช่วยให้ถามก่อนรันคำสั่งที่ Match เท่านั้น** ไม่ใช่การป้องกันการสั่งคำสั่งเทียบเท่าผ่าน Script/Alias/Tool อื่น ต้องบังคับสิทธิ์ผ่าน GitLab/Protected Branch/Policy และ Human Gate จริง **อย่าเปิดกว้างทุก Bash Command เพื่อความสะดวก**

## 4. GitLab Self-managed / GitLab.com

**ห้ามส่ง Token ลง Chat, Skills, AGENTS.md หรือ Git Public** ใช้ OS Keyring/Credential Manager และหลัก Least Privilege/Expiry ตาม Admin Policy การสร้าง MR ผ่าน CLI อาจต้องใช้ API Scope ที่ค่อนข้างกว้าง จึงควรขอเฉพาะ Credential ที่องค์กรอนุญาต

1. เช็ก `git remote -v` ว่าเป็น Host ของ **Repo งานจริง** ไม่ใช่ GitHub ของ `puen-stack`
2. ให้เจ้าของเครื่อง Authenticate ผ่าน `glab` แบบ Interactive กับ **Host จริง** ตัวอย่าง:
   ```bash
   glab auth login --hostname gitlab.example.com
   glab auth status
   ```
   ตรวจ Account/Host/Project Permissions/Protected Branch ก่อนใช้จริง `git push` อาจใช้ SSH/HTTPS Credentials คนละชุดกับ `glab` API Auth
3. ทดสอบ **Read-only** ด้วย `glab mr list` หรือ `glab mr view` ภายใน Repo ที่มีสิทธิ์ก่อน
4. **Push ต้องมี Scoped Publish Approval แยก** จาก Implementation Gate; **Create Draft MR ทุกอันต้องมี Human Confirm Source/Target/Body แยก**; Mark Ready/Merge/Production ยังคง Human-only
5. ลอง Create Draft MR **เฉพาะ Sandbox GitLab Project ที่ Human อนุญาตชัดเจน** หลัง Mock Test ผ่าน

## 5. Permission Matrix

| Action | แนวทางเริ่มต้น | สิ่งที่ต้องมีจริง |
| --- | --- | --- |
| Read / Git History | Read-only ใน Workspace | Workspace Access + Sandbox |
| Edit | Scoped Files | Assigned Work Item / Repo Permission |
| Run Tests | Safe Target เท่านั้น | Execution-safety Preflight |
| Local Commit | Confirmed Files/Hunks | Human Request + Work Item Policy/Checks |
| Git Push | **ขออนุญาตแยก** | Scoped Human Publish Approval + Git Rights |
| Create Draft MR | **Human Confirm ทุก MR** | Project/Source/Target/Description Approval + GitLab Auth |
| Mark Ready / Merge | **Human Only** | GitLab Reviewer / Branch Policy |
| Production Deploy / Recovery | **ไม่ให้ AI Permission ใน v0.1** | Human Release / Incident Policy แยก |

## 6. Validation ก่อนใช้กับโปรเจกต์จริง

เริ่มด้วย `node --test scripts/setup.test.mjs` เพื่อทดสอบ Installer ก่อน แล้วให้ตรวจว่า Skill ถูกค้นพบใน Codex/Claude และอ่านไฟล์ `puen-stack` จริง ทดลอง [Commit Test Scenarios](../docs/procedures/local-commit-tests.md) และ [Draft MR Test Scenarios](../skills/draft-change-request/TESTS.md) ใน **Disposable Synthetic Repo + Mock GitLab API** ต้องเห็นว่า Agent หยุดก่อน Unrelated Changes, Push/MR ที่ไม่อนุมัติ, Wrong Host/Target และ Failed Required Checks แล้วบันทึกผลจริงว่า Pass/Fail/Not run **ตอนนี้ยังไม่ได้รัน Tests**

Official Docs: [Codex Skills](https://developers.openai.com/codex/skills) · [Codex Config](https://developers.openai.com/codex/config-basic) · [Claude Skills](https://code.claude.com/docs/en/skills) · [Claude Permissions](https://code.claude.com/docs/en/settings) · [GitLab CLI Auth](https://docs.gitlab.com/cli/authentication/) · [Draft MR](https://docs.gitlab.com/cli/mr/create/)

**สถานะ:** Commit เฉพาะ Setup Guide **ไม่ได้ติดตั้งลงเครื่องมึง ไม่ได้ Login GitLab ไม่ได้เปิด Permission หรือ Deploy จริง**
