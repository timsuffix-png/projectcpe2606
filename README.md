# Project CPE 2606 (TJ Supply System)

โปรเจกต์รวมระบบทั้งหมดสำหรับการพัฒนาและส่งมอบงาน

## 📁 โครงสร้างโปรเจกต์ (Project Structure)

```text
projectcpe2606/
├── api-tjsupply-base-system-main/   # Backend API (NestJS / TypeScript)
├── TJ-supply-gateway/               # Desktop Gateway / Electron Application
├── gateway_temp/                    # Gateway Temporary / Next.js / Electron App
└── arduinotemp/                     # Arduino Firmware (temp.ino)
```

## 🚀 วิธีการเริ่มต้นใช้งาน (Getting Started)

### 1. Clone โปรเจกต์
```bash
git clone git@github.com:timsuffix-png/projectcpe2606.git
cd projectcpe2606
```

### 2. โมดูลแต่ละส่วน
- **Backend API**: ดูวิธีรันและการตั้งค่าใน `api-tjsupply-base-system-main/README.md`
- **TJ-supply-gateway**: ระบบ Gateway หน้าบ้าน ดูใน `TJ-supply-gateway/`
- **gateway_temp**: ดูใน `gateway_temp/README.md`
- **Arduino**: โค้ดไมโครคอนโทรลเลอร์อยู่ใน `arduinotemp/temp.ino`
