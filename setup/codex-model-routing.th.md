# Codex Setup + Model Profiles (WSL2 / ChatGPT Plus)

คู่มือนี้เป็นเรื่อง **ติดตั้งและใช้งานเครื่องมือ**; ขั้นตอน Delivery จริงให้ใช้ [Canonical Playbook](https://github.com/puennaja/puen-engineer/blob/master/playbooks/idea-to-outcome.th.md) และ [Model Routing Policy](https://github.com/puennaja/puen-engineer/blob/master/guides/codex-model-routing.th.md)

## 1. ตรวจสอบก่อนแก้ไข

```bash
codex --version
codex
```

ลงชื่อเข้าใช้ด้วยบัญชี ChatGPT Plus ผ่าน Flow ของ Codex; ใช้ `/model` เพื่อตรวจ Model และ Effort ที่ใช้งานได้ และ `/status` เพื่อตรวจสถานะ/Usage หากแสดงในเวอร์ชันนั้น

**Upgrade** ให้ใช้วิธีตรงกับ Installation เดิม; ถ้าใช้ npm global และเคยเจอ `EACCES` อย่าฝืน `sudo npm install -g`: ตั้ง npm prefix ใน Home หรือใช้ Node version manager แล้วจึงอัปเดตตามคำแนะนำ Codex

## 2. สำรอง Configuration เดิม

```bash
mkdir -p ~/.codex
test -f ~/.codex/config.toml && cp ~/.codex/config.toml ~/.codex/config.toml.bak
```

ผสานเฉพาะ Section ที่ยังไม่มีใน `~/.codex/config.toml`; ห้ามทับ MCP, auth หรือ sandbox config เดิม และอย่าใส่ Token/Secret ลง Repository

```toml
# Example only. Existing global settings take precedence where appropriate.
[profiles.fast]
model = "gpt-6-luna"
model_reasoning_effort = "low"

[profiles.build]
model = "gpt-6.1-sol"
model_reasoning_effort = "medium"

[profiles.review]
model = "gpt-6.1-sol"
model_reasoning_effort = "high"
sandbox_mode = "read-only"

[profiles.deep]
model = "gpt-6-astra"
model_reasoning_effort = "high"
```

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
