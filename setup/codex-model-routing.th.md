# Codex Setup + Model Profiles (WSL2 / ChatGPT Plus)

คู่มือนี้เป็นเรื่อง **ติดตั้งและใช้งานเครื่องมือ**; ขั้นตอน Delivery จริงให้ใช้ [Canonical Playbook](https://github.com/puennaja/puen-engineer/blob/master/playbooks/idea-to-outcome.th.md) และ [Model Routing Policy](https://github.com/puennaja/puen-engineer/blob/master/guides/codex-model-routing.th.md)

## 1. ตรวจสอบก่อนแก้ไข

```bash
codex --version
codex
```

ลงชื่อเข้าใช้ด้วยบัญชี ChatGPT Plus ผ่าน Flow ของ Codex; ใช้ `/model` เพื่อตรวจ Model และ Effort ที่ใช้งานได้ และ `/status` เพื่อตรวจสถานะ/Usage หากแสดงในเวอร์ชันนั้น

**Upgrade** ให้ใช้วิธีตรงกับ Installation เดิม; ถ้าใช้ npm global และเคยเจอ `EACCES` อย่าฝืน `sudo npm install -g`: ตั้ง npm prefix ใน Home หรือใช้ Node version manager แล้วจึงอัปเดตตามคำแนะนำ Codex

## 2. สำรองและแยก Profile ตาม Codex 0.134.0+

ตั้งแต่ Codex **0.134.0** `--profile` ใช้ `~/.codex/<profile>.config.toml` แทน legacy `[profiles.<profile>]` และ top-level `profile = "..."` ใน `~/.codex/config.toml`. ดู [Official Profile Docs](https://developers.openai.com/codex/config-advanced#profiles)

```bash
mkdir -p ~/.codex
test -f ~/.codex/config.toml && cp ~/.codex/config.toml ~/.codex/config.toml.bak
```

ใน `~/.codex/config.toml` ให้ลบเฉพาะ top-level `profile = "fast"` (หรือ selector อื่น) และทุก legacy table `[profiles.fast]`, `[profiles.build]`, `[profiles.review]`, `[profiles.deep]` (รวม keys ของแต่ละ table) **อย่าลบ MCP, auth หรือ settings อื่น**. ถ้ามี profile legacy อื่น ให้ย้ายหรือจัดการทุกตัวก่อน เพื่อไม่ให้สับสนกับรูปแบบใหม่

สร้างแต่ละไฟล์ที่ WSL2 Home:

```toml
# ~/.codex/fast.config.toml
model = "gpt-6-luna"
model_reasoning_effort = "low"
```

```toml
# ~/.codex/build.config.toml
model = "gpt-6.1-sol"
model_reasoning_effort = "medium"
```

```toml
# ~/.codex/review.config.toml
model = "gpt-6.1-sol"
model_reasoning_effort = "high"
sandbox_mode = "read-only"
```

```toml
# ~/.codex/deep.config.toml
model = "gpt-6-astra"
model_reasoning_effort = "high"
```

แต่ละไฟล์ใช้ **top-level keys** ไม่ใส่ `[profiles.<name>]`. ไม่ commit secret หรือ user config ลง Repo; Model/Effort เป็นข้อเสนอให้ตรวจใน `/model` ทุกครั้ง หาก override จาก project configuration หรือ policy ให้ใช้ค่าที่ระบบแสดงจริง

## 3. ใช้ตาม Stage

| ประเภทงาน | คำสั่ง |
| --- | --- |
| งานเล็ก/Documentation | `codex --profile fast` |
| Design และ Implementation ปกติ | `codex --profile build` |
| Independent Review | `codex --profile review` |
| High-risk Architecture | `codex --profile deep` |

ตรวจ Model/Effort ใน `/model` หลังเปิดทุก Profile ก่อนนับว่า Setup ผ่าน **อย่าใช้ Astra โดยอัตโนมัติ**

## 4. Pilot Smoke Test

1. เปิด Codex จาก **Repo Product ที่ได้รับอนุญาต** ไม่ใช่ Home; ตรวจ `pwd`, `git status`, `git branch --show-current`
2. Run Profile `fast`; ยืนยัน Model ใน `/model` แล้วสั่งอ่านไฟล์สั้นๆ โดย **ไม่แก้ไฟล์**
3. Run Profile `build`; ตรวจ Model และสร้าง Plan แบบ Read-only
4. เปิด Profile `review` ใน **Session ใหม่**; ตรวจว่า Read-only จริง โดยไม่แก้ Git/Files
5. Run `/status` ก่อน/หลังเท่าที่แสดงได้ และบันทึกเวอร์ชัน, Model, Effort, Result, Evidence และ Failure ใน `pilot-projects/docs`
6. ทำ Plane Cloud Setup แยกตาม [Guide](./plane-cloud.th.md), ติดตั้ง Skills ด้วย `node scripts/setup.mjs`, และทำตาม Human Gates ใน Playbook

หาก Profile/Model/Effort ไม่รองรับ อย่าเดาว่าทดสอบผ่าน ให้บันทึก `Blocked` แล้วแก้ Configuration ตามคู่มือ Codex เวอร์ชันที่ติดตั้ง
