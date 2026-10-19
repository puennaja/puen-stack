# Skill Contract — Stateless และ Standalone (ฉบับร่าง v0.1)

**หลักการ:** ทุก Specialist Skill ใน `puen-stack` ต้อง Stateless และ Standalone โดยมี **`work-item-runner` เป็นข้อยกเว้นเพียงตัวเดียว** สำหรับ Orchestration และ Workflow State (แต่ State ต้องมีหลักฐานภายนอกที่อ่านกลับได้)

- **Stateless:** เรียกซ้ำหรือเปิด Session ใหม่แล้วต้องทำงานจาก Input, Repository และ Evidence ที่ตรวจสอบใหม่ได้ ไม่พึ่งความจำลับ/ผลข้างเคียงจาก Skill ก่อนหน้า การเขียนไฟล์หรืออัปเดต Tracker ทำได้เฉพาะที่อนุญาต และต้องรายงานเป็น Output ที่ตรวจสอบได้
- **Standalone:** เรียก Skill นั้นตรง ๆ ได้ โดยไม่ต้องรัน Skill อื่นก่อน ตัวมันต้องมี Trigger, Input, ขั้นตอน, Output, Errors, Safety และ Verification ของตัวเอง
- **ห้าม Specialist → Specialist dependency:** การอ้าง Accepted Workflow, Templates, Tools และ Passive Reference Documents ทำได้ แต่ห้ามบังคับเรียกอีก Skill เช่น `implementation` สั่ง `verify-work-item`; ให้ระบุ `acceptance/test intent` เป็น Input และทำส่วนที่จำเป็นเองเมื่อ Input ยังไม่ครบตามขอบเขตที่ได้รับอนุญาต
- **Runner เท่านั้นที่ Route:** Runner เลือก Stage, ส่ง Artifact, ตรวจ Human Gates และบันทึก Workflow State ในระบบที่อนุญาต ถ้าหา Skill ของ `puen-stack` ไม่เจอ ต้องแจ้ง Missing/Blocked ไม่สลับไป Matt/Poteto โดยพลการ
- **Human Gates:** ทุก Skill ยังต้องเคารพสิทธิ์ และไม่มีสิทธิ์อนุมัติตัวเอง

## วิธีทดสอบ
1. เรียกแต่ละ Skill ตรง ๆ ด้วย Synthetic Input ใน Session ใหม่
2. เรียกซ้ำหลังปิด Session โดยไม่มี Hidden State
3. ลองไม่ส่ง Input สำคัญ ต้องได้ Blocked แทนแอบเรียก Skill อื่น
4. ค้นหา Cross-skill Dependencies และแปลงเป็น Explicit Input/Output
5. ตรวจ Permission, Idempotency และ Evidence ของ Side Effects

Source of Truth ของ Accepted Workflow ยังคงอยู่ใน `puen-engineer`; ดู [English policy](./skill-contract.md).
