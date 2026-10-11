# คู่มือเริ่ม Pilot (Tooling Guide)

Playbook หลักถูกย้ายไป [puen-engineer](https://github.com/puennaja/puen-engineer/blob/master/playbooks/idea-to-outcome.th.md) เพื่อให้ Workflow มี Source of Truth เดียว

**สถานะ Pilot ปัจจุบัน:** ใช้ Git + GitHub สำหรับ Code/PR; GitLab เป็นทางเลือก, Codex Config ตั้งแล้วและ Skills ลงแบบ Global แล้ว (ยังต้องตรวจ Discovery). อย่ารัน Installer ซ้ำโดยไม่จำเป็น; ใช้ GitHub Draft PR แทน GitLab Draft MR เมื่อ Remote เป็น GitHub

## เริ่มใช้งาน

1. อ่าน [Canonical Playbook](https://github.com/puennaja/puen-engineer/blob/master/playbooks/idea-to-outcome.th.md)
2. ตรวจว่า Codex เรียก Skills ที่ติดตั้งแบบ Global ได้; ถ้ามีอยู่แล้วข้าม Installer; มิฉะนั้นจึงใช้ `npm run setup` จาก root ของ puen-stack
3. ตั้งค่า Codex ตาม [Codex Setup](../setup/codex-model-routing.th.md) และตั้งค่า Work Tracker ที่เลือกตาม Setup Guide
4. ทำตาม Human Gates ใน Playbook และบันทึกเหตุการณ์/ปัญหา/ผลลัพธ์จริงใน `docs/pilot/` ของ Product Repo

> ไฟล์นี้เป็นคู่มือสำหรับการใช้งานเครื่องมือ ไม่ใช่ Workflow ชุดที่สอง
