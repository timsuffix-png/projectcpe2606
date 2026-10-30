/**
 * ============================================================================
 * PROJECT: IRON TESTING STATION STANDALONE FIRMWARE (CPE2606)
 * PLATFORM: Arduino UNO R3 (ATmega328P - 32KB Flash, 2KB SRAM, 1KB EEPROM)
 * 
 * DESCRIPTION:
 * ระบบทดสอบเตารีดไฟฟ้าแบบ Standalone ควบคุมกระบวนการทดสอบและประมวลผล PASS/FAIL 
 * ภายในบอร์ด Arduino UNO R3 โดยไม่ต้องพึ่งพาคอมพิวเตอร์หรือ Gateway
 * รองรับการทำงานร่วมกับ Gateway และระบบ ERP เดิม 100%
 *
 * HARDWARE WIRING:
 * ----------------------------------------------------------------------------
 * Pin D0 (RX) / D1 (TX) : Hardware Serial (USB) -> PC / Gateway (115200 baud)
 * Pin D2                : Relay 1 (Load Control 1, Active LOW)
 * Pin D3                : Relay 2 (Load Control 2, Active LOW)
 * Pin D4                : START Pushbutton (Active LOW, INPUT_PULLUP)
 * Pin D5                : STOP / RESET Pushbutton (Active LOW, INPUT_PULLUP)
 * Pin D6                : GREEN LED (Indicator: READY / PASS, Active HIGH)
 * Pin D7                : RED LED (Indicator: FAIL / ERROR / STOP, Active HIGH)
 * Pin D8                : Barcode Scanner RX (SoftwareSerial, 9600 baud)
 * Pin D9                : Barcode Scanner TX (SoftwareSerial, 9600 baud)
 * Pin D10               : Buzzer (Alerts / Feedback, Active HIGH)
 * Pin D11               : PZEM-004T TX (SoftwareSerial to PZEM RX)
 * Pin D12               : PZEM-004T RX (SoftwareSerial from PZEM TX)
 * Pin D13               : Built-in LED (Heartbeat / Activity)
 * Pin A4 (SDA)          : I2C Data (TCA9548A @ 0x70, LCD 20x4 @ 0x27 / 0x3F)
 * Pin A5 (SCL)          : I2C Clock (TCA9548A @ 0x70, LCD 20x4 @ 0x27 / 0x3F)
 * 
 * TCA9548A Channels:
 *   Channel 2           : MLX90614 Sensor 0 (Right / ขวา)
 *   Channel 3           : MLX90614 Sensor 1 (Middle / กลาง)
 *   Channel 4           : MLX90614 Sensor 2 (Left / ซ้าย)
 *   Channel 5           : MLX90614 Sensor 3 (Top / Tip / บน)
 * ============================================================================
 */

#include <Wire.h>
#include <Adafruit_MLX90614.h>
#include <PZEM004Tv30.h>
#include <SoftwareSerial.h>
#include <LiquidCrystal_I2C.h>
#include <EEPROM.h>

// ============================================================================
// 1. PIN DEFINITIONS & CONSTANTS
// ============================================================================
const uint8_t PIN_RELAY1      = 2;
const uint8_t PIN_RELAY2      = 3;
const uint8_t PIN_BTN_START   = 4;
const uint8_t PIN_BTN_STOP    = 5;
const uint8_t PIN_LED_GREEN   = 6;
const uint8_t PIN_LED_RED     = 7;
const uint8_t PIN_SCANNER_RX  = 8;
const uint8_t PIN_SCANNER_TX  = 9;
const uint8_t PIN_BUZZER      = 10;
const uint8_t PIN_PZEM_TX     = 11;
const uint8_t PIN_PZEM_RX     = 12;

#define TCAADDR               0x70
#define LCD_ADDR_PRIMARY      0x27
#define LCD_ADDR_SECONDARY    0x3F

#define EEPROM_MAGIC          0x51433331 // "QC31"
#define MAX_PRESET_MODELS     3
#define MAX_OFFLINE_RECORDS   12

// ============================================================================
// 2. FINITE STATE MACHINE (FSM) STATES
// ============================================================================
enum SystemState {
  STATE_BOOT,        // 1. ตรวจสอบอุปกรณ์ฮาร์ดแวร์ Power-on Self Test
  STATE_IDLE,        // 2. รออ่านบาร์โค้ด / สแตนด์บาย
  STATE_IDENTIFY,    // 3. ระบุรุ่นผลิตภัณฑ์และ Serial Number
  STATE_READY,       // 4. แสดงข้อมูลบน LCD พร้อมเริ่มทดสอบ
  STATE_TESTING,     // 5. เปิด Relay จ่ายไฟ วัดค่าอุณหภูมิและกระแสแบบ Real-time
  STATE_EVALUATING,  // 6. ประมวลผลและตัดสินเกณฑ์ PASS / FAIL
  STATE_RESULT,      // 7. แสดงผลลัพธ์ผ่าน LCD, LED, Buzzer
  STATE_SAVE_RESULT, // 8. บันทึกผลลง EEPROM (Offline Ring Buffer)
  STATE_SYNC,        // 9. ส่งข้อมูลผลทดสอบไปยัง Gateway เมื่อเชื่อมต่อได้
  STATE_ERROR        // 10. ข้อผิดพลาด / หยุดฉุกเฉิน ตัดไฟทันทีเพื่อความปลอดภัย
};

SystemState currentState = STATE_BOOT;

// ============================================================================
// 3. DATA STRUCTURES & EEPROM MANAGEMENT
// ============================================================================
struct CalibrationBlock {
  float m1, c1, m2, c2, k, x0;
};

struct ModelProfile {
  char modelName[10];     // เช่น "CB-95", "JP-87", "DEFAULT"
  float tempMin;          // อุณหภูมิต่ำสุดที่ปลายเตารีดขณะตัด (°C)
  float tempLimit;        // อุณหภูมิสูงสุดที่ยอมรับได้ (°C)
  float currentLimit;     // กระแสสูงสุดที่ยอมรับได้ (A)
  uint16_t startMoment;   // เวลาต่ำสุดที่ยอมรับให้ตัด (วินาที)
  uint16_t endMoment;     // เวลาสูงสุดที่ยอมรับให้ตัด / Timeout (วินาที)
  CalibrationBlock cal[4];// พารามิเตอร์คาลิเบรต 4 เซนเซอร์
};

struct EEPROMHeader {
  uint32_t magic;
  uint8_t modelCount;
  uint8_t activeModelIdx;
  uint8_t recordHead;     // ตำแหน่งบันทึกล่าสุดใน Ring Buffer
  uint8_t recordCount;    // จำนวนประวัติที่บันทึกไว้
};

struct TestRecord {
  char serialNumber[16];  // หมายเลขเครื่อง (Serial Number)
  char modelName[8];      // ชื่อรุ่น
  float avgTemp;          // อุณหภูมิเฉลี่ยสุดท้าย
  float tipTemp;          // อุณหภูมิปลายเตารีดสุดท้าย (Sensor 3)
  float current;          // กระแสไฟฟ้าขณะตัด
  uint16_t durationSec;   // ระยะเวลาที่ใช้ทดสอบ (วินาที)
  uint16_t detailCode;    // รหัสผลการทดสอบ (888, 020, 021, 030, 031, 040, 777, 000, 010)
  uint8_t status;         // 1=Passed, 0=Failed, 2=stop
  uint8_t synced;         // 0=รอส่ง, 1=ส่งเรียบร้อยแล้ว
};

EEPROMHeader sysHeader;
ModelProfile activeProfile;

const uint16_t ADDR_HEADER  = 0;
const uint16_t ADDR_MODELS  = sizeof(EEPROMHeader);
const uint16_t ADDR_RECORDS = ADDR_MODELS + (sizeof(ModelProfile) * MAX_PRESET_MODELS);

// ============================================================================
// 4. HARDWARE OBJECTS & GLOBAL VARIABLES
// ============================================================================
Adafruit_MLX90614 mlx = Adafruit_MLX90614();
SoftwareSerial pzemSerial(PIN_PZEM_RX, PIN_PZEM_TX); // 12=RX, 11=TX
PZEM004Tv30 pzem(pzemSerial);

SoftwareSerial scannerSerial(PIN_SCANNER_RX, PIN_SCANNER_TX); // 8=RX, 9=TX
LiquidCrystal_I2C lcd(LCD_ADDR_PRIMARY, 20, 4);

struct TempResult {
  float objectTemp;
  float ambientTemp;
};

// ตัวแปรวัดค่าและประมวลผล (ใช้ float เพื่อความประหยัด RAM บน AVR)
float tempObjArr[4] = {0, 0, 0, 0};
float tempAmbArr[4] = {0, 0, 0, 0};
float T_corrected[4] = {-999, -999, -999, -999};
float temp_avg = 0.0f;
float current = 0.0f;
uint8_t sIdx = 0;

// ตัวแปรสถานะ
unsigned long sec = 0;
unsigned long last_sec_time = 0;
unsigned long state_timer = 0;
bool ironWasOn = false;
bool calibrateMode = false;
bool calibrateFinished = false;

char detailCode[6] = "000";
char statusStr[10] = "off";
char currentSerial[18] = "SAMPLE-000000";
char scannerBuffer[24];
uint8_t scannerBufIdx = 0;

char lastErrorMsg[17] = "";

// Streaming Parser Buffer สำหรับ Serial Commands (ประหยัด RAM สูงสุด)
char tokenBuf[24];
uint8_t tokenBufIdx = 0;
uint8_t commandTokenIndex = 0;
bool isParsingOnCommand = false;

// TinyML / Sensor Drift Detection (EWMA Baseline Tracking)
float ewmaAmbient[4] = {25.0f, 25.0f, 25.0f, 25.0f};
const float EWMA_ALPHA = 0.05f;

// ============================================================================
// 5. FUNCTION DECLARATIONS
// ============================================================================
void tcaselect(uint8_t i);
TempResult readTemp(uint8_t n);
void controlRelay(bool turnOn);
void setStatus(const char* d, const char* s);
void showdata();
void beep(uint16_t freq, uint16_t durationMs);
void alertPassSound();
void alertFailSound();
void alertStopSound();
void updateIndicators();
void initDefaultEEPROM();
void loadActiveModel(uint8_t idx);
void saveTestRecordToEEPROM();
void syncRecordsToGateway();
void processSerialStream();
void handleCommandToken(const char* token, uint8_t tokenIdx, bool isFinal);
void processScannerInput();
bool checkStartButton();
bool checkStopButton();
void lcdPrintCenter(uint8_t row, const __FlashStringHelper* text);
void lcdPrintCenterStr(uint8_t row, const char* text);
void updateLiveLCD();
void checkSensorDrift();
void startTestExecution();

// ============================================================================
// 6. SETUP ROUTINE
// ============================================================================
void setup() {
  // 1. ความปลอดภัยสูงสุด: ตั้งค่า Relay เป็น OFF ทันทีเมื่อเปิดบอร์ด (Active LOW)
  pinMode(PIN_RELAY1, OUTPUT);
  pinMode(PIN_RELAY2, OUTPUT);
  controlRelay(false);

  // 2. ตั้งค่าขา I/O สำหรับปุ่มกดและไฟเตือน
  pinMode(PIN_BTN_START, INPUT_PULLUP);
  pinMode(PIN_BTN_STOP, INPUT_PULLUP);
  pinMode(PIN_LED_GREEN, OUTPUT);
  pinMode(PIN_LED_RED, OUTPUT);
  pinMode(PIN_BUZZER, OUTPUT);
  pinMode(13, OUTPUT);

  digitalWrite(PIN_LED_GREEN, HIGH);
  digitalWrite(PIN_LED_RED, HIGH);
  tone(PIN_BUZZER, 2000, 100);
  delay(120);
  digitalWrite(PIN_LED_GREEN, LOW);
  digitalWrite(PIN_LED_RED, LOW);

  // 3. เริ่มต้นพอร์ตสื่อสาร
  Serial.begin(115200);
  pzemSerial.begin(9600);
  scannerSerial.begin(9600);
  scannerSerial.listen(); // เริ่มต้นรอรับข้อมูลจากบาร์โค้ดสแกนเนอร์

  // 4. เริ่มต้น I2C และจอ LCD 20x4
  Wire.begin();
  Wire.setClock(100000); // 100 kHz Standard Mode เพื่อความเสถียรของบัส I2C

  // ตรวจจับที่อยู่ของจอ LCD (0x27 หรือ 0x3F)
  Wire.beginTransmission(LCD_ADDR_PRIMARY);
  if (Wire.endTransmission() != 0) {
    lcd = LiquidCrystal_I2C(LCD_ADDR_SECONDARY, 20, 4);
  }
  lcd.init();
  lcd.backlight();
  lcd.clear();
  lcdPrintCenter(0, F("QC IRON TESTER V3.0"));
  lcdPrintCenter(1, F("STANDALONE SYSTEM"));
  lcdPrintCenter(2, F("Self-Testing HW..."));
  lcdPrintCenter(3, F("Relays: SAFE OFF"));

  // 5. โหลดค่าเกณฑ์และโมเดลจาก EEPROM
  EEPROM.get(ADDR_HEADER, sysHeader);
  if (sysHeader.magic != EEPROM_MAGIC) {
    lcdPrintCenter(2, F("Init EEPROM Defaults"));
    initDefaultEEPROM();
  } else {
    loadActiveModel(sysHeader.activeModelIdx);
  }

  // 6. ตรวจสอบฮาร์ดแวร์เซนเซอร์ (Self-Test)
  Wire.beginTransmission(TCAADDR);
  if (Wire.endTransmission() != 0) {
    strncpy_P(lastErrorMsg, PSTR("TCA9548A Mux Err"), sizeof(lastErrorMsg));
    setStatus("010", "Failed");
    currentState = STATE_ERROR;
    return;
  }

  mlx.begin();
  bool sensorFail = false;
  for (uint8_t i = 0; i < 4; i++) {
    TempResult tr = readTemp(i + 2);
    if (isnan(tr.objectTemp) || tr.objectTemp <= -900.0f) {
      sensorFail = true;
      snprintf_P(lastErrorMsg, sizeof(lastErrorMsg), PSTR("Sensor %d Failed"), i);
      char errCode[4];
      snprintf_P(errCode, sizeof(errCode), PSTR("01%d"), i);
      setStatus(errCode, "Failed");
      break;
    }
  }

  if (sensorFail) {
    currentState = STATE_ERROR;
    return;
  }

  delay(600);
  lcd.clear();
  currentState = STATE_IDLE;
  Serial.println(F(">>> IRON TESTER BOOT OK. READY."));
}

// ============================================================================
// 7. MAIN STATE MACHINE LOOP
// ============================================================================
void loop() {
  // รับคำสั่งและข้อมูลจาก Serial (Gateway / PC) และ Scanner ตลอดเวลา
  processSerialStream();
  processScannerInput();
  updateIndicators();

  // ป้องกัน Relay เผลอเปิดในสถานะที่ไม่ใช่ STATE_TESTING
  if (currentState != STATE_TESTING) {
    controlRelay(false);
  }

  // ตรวจสอบปุ่มฉุกเฉิน STOP ในทุกสถานะ (Emergency Stop)
  if (checkStopButton()) {
    if (currentState == STATE_TESTING || currentState == STATE_EVALUATING) {
      controlRelay(false);
      setStatus("777", "stop");
      alertStopSound();
      currentState = STATE_RESULT;
      return;
    } else if (currentState == STATE_ERROR || currentState == STATE_RESULT) {
      controlRelay(false);
      lcd.clear();
      currentState = STATE_IDLE;
      beep(1500, 80);
      return;
    } else if (currentState == STATE_READY) {
      currentState = STATE_IDLE;
      lcd.clear();
      return;
    }
  }

  // ดำเนินการตามสถานะใน FSM
  switch (currentState) {

    // ------------------------------------------------------------------------
    // STATE 1: IDLE (สแตนด์บาย รอสแกนบาร์โค้ด)
    // ------------------------------------------------------------------------
    case STATE_IDLE: {
      controlRelay(false);

      static unsigned long lastIdleDisplay = 0;
      if (millis() - lastIdleDisplay >= 1000) {
        lastIdleDisplay = millis();
        lcd.setCursor(0, 0);
        lcd.print(F("=== STANDALONE QC =="));
        lcd.setCursor(0, 1);
        lcd.print(F("Model: "));
        lcd.print(activeProfile.modelName);
        for (int k = strlen(activeProfile.modelName) + 7; k < 20; k++) lcd.print(' ');

        lcd.setCursor(0, 2);
        lcd.print(F("Scan Barcode / QR..."));
        lcd.setCursor(0, 3);
        lcd.print(F("Ready for Product   "));
      }

      // หากกดปุ่ม START ขณะ IDLE โดยยังไม่ได้สแกน ให้แจ้งเตือนผู้ใช้
      if (checkStartButton()) {
        tone(PIN_BUZZER, 1000, 80);
        delay(100);
        tone(PIN_BUZZER, 1000, 80);
        lcd.setCursor(0, 3);
        lcd.print(F("PLEASE SCAN FIRST!  "));
        delay(600);
      }
      break;
    }

    // ------------------------------------------------------------------------
    // STATE 2: IDENTIFY (วิเคราะห์บาร์โค้ด เลือกรุ่นและ Serial Number)
    // ------------------------------------------------------------------------
    case STATE_IDENTIFY: {
      controlRelay(false);
      beep(2400, 80);

      // ค้นหาชื่อรุ่นในบาร์โค้ดเพื่อเลือกเกณฑ์ทดสอบที่ถูกต้อง
      bool modelMatched = false;
      EEPROMHeader hdr;
      EEPROM.get(ADDR_HEADER, hdr);

      for (uint8_t m = 0; m < hdr.modelCount; m++) {
        ModelProfile prof;
        EEPROM.get(ADDR_MODELS + (m * sizeof(ModelProfile)), prof);
        if (strstr(scannerBuffer, prof.modelName) != NULL) {
          activeProfile = prof;
          sysHeader.activeModelIdx = m;
          EEPROM.put(ADDR_HEADER, sysHeader);
          modelMatched = true;
          break;
        }
      }

      // หากไม่พบชื่อรุ่นที่ระบุ ให้ใช้โมเดล DEFAULT
      if (!modelMatched) {
        loadActiveModel(0);
      }

      // บันทึก Serial Number
      strncpy(currentSerial, scannerBuffer, sizeof(currentSerial) - 1);
      currentSerial[sizeof(currentSerial) - 1] = '\0';

      Serial.print(F(">>> IDENTIFIED PRODUCT | Model: "));
      Serial.print(activeProfile.modelName);
      Serial.print(F(" | SN: "));
      Serial.println(currentSerial);

      lcd.clear();
      currentState = STATE_READY;
      break;
    }

    // ------------------------------------------------------------------------
    // STATE 3: READY (แสดงเกณฑ์ทดสอบ รอผู้ปฏิบัติงานกด START)
    // ------------------------------------------------------------------------
    case STATE_READY: {
      controlRelay(false);

      static unsigned long lastReadyDisplay = 0;
      if (millis() - lastReadyDisplay >= 500) {
        lastReadyDisplay = millis();
        lcd.setCursor(0, 0);
        lcd.print(F("M:"));
        lcd.print(activeProfile.modelName);
        lcd.print(F(" SN:"));
        char shortSN[10];
        strncpy(shortSN, currentSerial, 9);
        shortSN[9] = '\0';
        lcd.print(shortSN);
        for (int k = 2 + strlen(activeProfile.modelName) + 4 + strlen(shortSN); k < 20; k++) lcd.print(' ');

        lcd.setCursor(0, 1);
        lcd.print(F("Tlim:<"));
        lcd.print((int)activeProfile.tempLimit);
        lcd.print(F("C I<"));
        lcd.print(activeProfile.currentLimit, 1);
        lcd.print(F("A  "));

        lcd.setCursor(0, 2);
        lcd.print(F("Cut:"));
        lcd.print(activeProfile.startMoment);
        lcd.print(F("-"));
        lcd.print(activeProfile.endMoment);
        lcd.print(F("s T>"));
        lcd.print((int)activeProfile.tempMin);
        lcd.print(F("C "));

        lcd.setCursor(0, 3);
        lcd.print(F("PRESS [START] BUTTON"));
      }

      // กดปุ่ม START เพื่อเริ่มการทดสอบ
      if (checkStartButton()) {
        startTestExecution();
      }
      break;
    }

    // ------------------------------------------------------------------------
    // STATE 4: TESTING (เปิด Relay จ่ายไฟ และอ่านเซนเซอร์วนลูป)
    // ------------------------------------------------------------------------
    case STATE_TESTING: {
      // 1. อ่านกระแสไฟฟ้าจาก PZEM
      current = pzem.current();
      if (isnan(current)) current = 0;
      if (current > 0.50f) ironWasOn = true;

      // 2. อ่านอุณหภูมิเซนเซอร์ MLX90614 ตัวปัจจุบันผ่าน TCA9548A
      TempResult r = readTemp(sIdx + 2);
      tempObjArr[sIdx] = r.objectTemp;
      tempAmbArr[sIdx] = r.ambientTemp;

      // อัปเดต EWMA Ambient สำหรับตรวจจับ Sensor Drift
      if (r.ambientTemp > -40.0f && r.ambientTemp < 120.0f) {
        ewmaAmbient[sIdx] = (EWMA_ALPHA * r.ambientTemp) + ((1.0f - EWMA_ALPHA) * ewmaAmbient[sIdx]);
      }

      // 3. คำนวณอุณหภูมิที่ปรับแก้ด้วยสมการ Sigmoid Combination ดั้งเดิม
      if (calibrateMode) {
        T_corrected[sIdx] = r.objectTemp; // โหมดคาลิเบรตใช้ค่า Raw
      } else {
        float x = tempObjArr[sIdx];
        if (isnan(x) || x <= -900.0f) {
          T_corrected[sIdx] = -999.0f;
        } else {
          float m1 = activeProfile.cal[sIdx].m1;
          float c1 = activeProfile.cal[sIdx].c1;
          float m2 = activeProfile.cal[sIdx].m2;
          float c2 = activeProfile.cal[sIdx].c2;
          float k  = constrain(activeProfile.cal[sIdx].k, 0.01f, 0.5f);
          float x0 = activeProfile.cal[sIdx].x0;

          float expVal = constrain(-k * (x - x0), -60.0f, 60.0f);
          float s = 1.0f / (1.0f + exp(expVal));
          T_corrected[sIdx] = constrain((m1 * x + c1) * (1.0f - s) + (m2 * x + c2) * s, 0.0f, 400.0f);
        }
      }

      sIdx = (sIdx + 1) % 4;

      // ส่งสถานะต่อไปยังการประเมินผล
      currentState = STATE_EVALUATING;
      break;
    }

    // ------------------------------------------------------------------------
    // STATE 5: EVALUATING (ประมวลผลเงื่อนไข PASS / FAIL ตามเกณฑ์มาตรฐาน)
    // ------------------------------------------------------------------------
    case STATE_EVALUATING: {
      bool faultDetected = false;

      // 1. ตรวจสอบความผิดปกติของเซนเซอร์ MLX90614 (ห้ามตัดสิน PASS หากเซนเซอร์ผิดพลาด)
      for (uint8_t i = 0; i < 4; i++) {
        if (tempObjArr[i] <= -900.0f || isnan(tempObjArr[i])) {
          controlRelay(false);
          char code[4];
          snprintf_P(code, sizeof(code), PSTR("01%d"), i);
          setStatus(code, "Failed");
          strncpy_P(lastErrorMsg, PSTR("Sensor Fault"), sizeof(lastErrorMsg));
          faultDetected = true;
          currentState = STATE_RESULT;
          break;
        }
      }

      if (!faultDetected) {
        // 2. โหมด CALIBRATE เดิม (คงฟังก์ชันเดิมสำหรับสอบเทียบหน้างาน)
        if (calibrateMode) {
          strncpy_P(detailCode, PSTR("666"), sizeof(detailCode));
          if (current > 0.50f) ironWasOn = true;

          // เตารีดตัดวงจรเอง
          if (ironWasOn && current == 0.0f && sec > 0) {
            controlRelay(false);
            setStatus("888", "Passed");
            calibrateFinished = true;
            calibrateMode = false;
            currentState = STATE_RESULT;
          } else {
            currentState = STATE_TESTING;
          }
        }
        // 3. โหมด NORMAL TESTING (เกณฑ์การตัดสินคุณภาพ)
        else {
          // ก. ตรวจสอบกระแสไฟฟ้าเกิน (Over-current)
          if (activeProfile.currentLimit > 0 && current >= activeProfile.currentLimit) {
            controlRelay(false);
            setStatus("040", "Failed");
            strncpy_P(lastErrorMsg, PSTR("Over Current"), sizeof(lastErrorMsg));
            currentState = STATE_RESULT;
          }
          // ข. ตรวจสอบอุณหภูมิเกินพิกัดความปลอดภัย (Over-temperature)
          else {
            bool overTemp = false;
            for (uint8_t i = 0; i < 4; i++) {
              if (activeProfile.tempLimit > 0 && T_corrected[i] > activeProfile.tempLimit) {
                controlRelay(false);
                setStatus("020", "Failed");
                strncpy_P(lastErrorMsg, PSTR("Over Temperature"), sizeof(lastErrorMsg));
                overTemp = true;
                currentState = STATE_RESULT;
                break;
              }
            }

            if (!overTemp) {
              // ค. ตรวจสอบสถานะการตัดของเทอร์โมสตัท (Thermostat Cut-off)
              if (current == 0.0f && sec > 0) {
                controlRelay(false);
                // ไม่พบการกินกระแสไฟฟ้าเลยตั้งแต่แรก
                if (!ironWasOn) {
                  setStatus("000", "Failed");
                  strncpy_P(lastErrorMsg, PSTR("Iron No Power"), sizeof(lastErrorMsg));
                }
                // เทอร์โมสตัทตัดเร็วเกินไป
                else if (sec < activeProfile.startMoment) {
                  setStatus("030", "Failed");
                  strncpy_P(lastErrorMsg, PSTR("Cut Too Early"), sizeof(lastErrorMsg));
                }
                // เทอร์โมสตัทตัดช้าเกินไป
                else if (sec > activeProfile.endMoment) {
                  setStatus("031", "Failed");
                  strncpy_P(lastErrorMsg, PSTR("Cut Too Late"), sizeof(lastErrorMsg));
                }
                // อุณหภูมิปลายเตารีด (Sensor 3) ไม่ถึงเกณฑ์ขั้นต่ำ
                else if (T_corrected[3] <= activeProfile.tempMin) {
                  setStatus("021", "Failed");
                  strncpy_P(lastErrorMsg, PSTR("Tip Temp Low"), sizeof(lastErrorMsg));
                }
                // ผ่านการทดสอบสมบูรณ์ตามเกณฑ์ทุกข้อ
                else {
                  setStatus("888", "Passed");
                  strncpy_P(lastErrorMsg, PSTR("PASSED"), sizeof(lastErrorMsg));
                }
                currentState = STATE_RESULT;
              }
              // ง. หมดเวลารอการตัดของเทอร์โมสตัท (Timeout)
              else if (activeProfile.endMoment > 0 && sec > activeProfile.endMoment) {
                controlRelay(false);
                setStatus("031", "Failed");
                strncpy_P(lastErrorMsg, PSTR("Test Timeout"), sizeof(lastErrorMsg));
                currentState = STATE_RESULT;
              }
              // จ. อยู่ระหว่างดำเนินการทดสอบปกติ
              else {
                strncpy_P(detailCode, PSTR("666"), sizeof(detailCode));
                currentState = STATE_TESTING;
              }
            }
          }
        }
      }

      // แสดงผล Telemetry ส่งออก Serial ทุก 1 วินาที และอัปเดตหน้าจอ LCD
      if (millis() - last_sec_time >= 1000) {
        last_sec_time = millis();
        sec++;
        showdata();
        updateLiveLCD();
      }
      break;
    }

    // ------------------------------------------------------------------------
    // STATE 6: RESULT (แสดงผลลัพธ์ผ่าน LCD, LED และเสียงเตือน Buzzer)
    // ------------------------------------------------------------------------
    case STATE_RESULT: {
      controlRelay(false); // มั่นใจ 100% ว่าตัดไฟเตารีด

      // ส่งข้อความ Telemetry ปิดท้ายให้ Gateway ทราบสถานะจบการทดสอบ
      showdata();

      // แสดงผลผ่าน LCD
      lcd.clear();
      if (strcmp_P(statusStr, PSTR("Passed")) == 0) {
        lcdPrintCenter(0, F("*** RESULT: PASS ***"));
        alertPassSound();
      } else if (strcmp_P(statusStr, PSTR("stop")) == 0) {
        lcdPrintCenter(0, F("== TEST ABORTED =="));
        alertStopSound();
      } else {
        lcdPrintCenter(0, F("*** RESULT: FAIL ***"));
        alertFailSound();
      }

      lcd.setCursor(0, 1);
      lcd.print(F("SN: "));
      lcd.print(currentSerial);

      lcd.setCursor(0, 2);
      lcd.print(F("Tavg:"));
      lcd.print((int)temp_avg);
      lcd.print(F("C Tip:"));
      lcd.print((int)T_corrected[3]);
      lcd.print(F("C "));

      lcd.setCursor(0, 3);
      lcd.print(F("Err:"));
      lcd.print(lastErrorMsg);
      lcd.print(F(" ("));
      lcd.print(detailCode);
      lcd.print(F(")"));

      currentState = STATE_SAVE_RESULT;
      break;
    }

    // ------------------------------------------------------------------------
    // STATE 7: SAVE_RESULT (จัดเก็บบันทึกลงในหน่วยความจำ EEPROM)
    // ------------------------------------------------------------------------
    case STATE_SAVE_RESULT: {
      controlRelay(false);
      saveTestRecordToEEPROM();

      // เปลี่ยนไปสถานะ SYNC เพื่อส่งต่อข้อมูลไปยัง Gateway ทันทีหากเชื่อมต่ออยู่
      currentState = STATE_SYNC;
      state_timer = millis();
      break;
    }

    // ------------------------------------------------------------------------
    // STATE 8: SYNC (ส่งข้อมูลผลการทดสอบไปยัง Gateway เมื่อเชื่อมต่อได้)
    // ------------------------------------------------------------------------
    case STATE_SYNC: {
      controlRelay(false);

      // ส่งข้อมูลสรุปผลแบบโครงสร้างไปยัง Gateway
      Serial.print(F("RESULT_RECORD,"));
      Serial.print(currentSerial);
      Serial.print(F(","));
      Serial.print(activeProfile.modelName);
      Serial.print(F(","));
      Serial.print(statusStr);
      Serial.print(F(","));
      Serial.print(detailCode);
      Serial.print(F(","));
      Serial.print(temp_avg, 2);
      Serial.print(F(","));
      Serial.print(T_corrected[3], 2);
      Serial.print(F(","));
      Serial.print(current, 2);
      Serial.print(F(","));
      Serial.println(sec);

      // รอแสดงผลหน้าจอผลลัพธ์เป็นเวลา 4 วินาที หรือจนกว่าผู้ใช้จะกดปุ่ม START/STOP เพื่อทดสอบเครื่องถัดไป
      unsigned long holdStart = millis();
      while (millis() - holdStart < 4000) {
        processSerialStream();
        if (checkStartButton() || checkStopButton()) {
          beep(1800, 50);
          break;
        }
        delay(20);
      }

      // ตรวจสอบความคลาดเคลื่อนของเซนเซอร์ (Drift Check)
      checkSensorDrift();

      // สลับกลับมาฟัง Barcode Scanner เพื่อเตรียมทดสอบเครื่องถัดไป
      scannerSerial.listen();
      scannerBufIdx = 0;
      scannerBuffer[0] = '\0';
      lcd.clear();
      currentState = STATE_IDLE;
      break;
    }

    // ------------------------------------------------------------------------
    // STATE 9: ERROR (ข้อผิดพลาดของระบบ ตัดไฟฉุกเฉินและรอการแก้ไข)
    // ------------------------------------------------------------------------
    case STATE_ERROR: {
      controlRelay(false);

      static unsigned long lastErrorDisplay = 0;
      if (millis() - lastErrorDisplay >= 1000) {
        lastErrorDisplay = millis();
        lcd.setCursor(0, 0);
        lcd.print(F("** SYSTEM ERROR **  "));
        lcd.setCursor(0, 1);
        lcd.print(F("Code: "));
        lcd.print(detailCode);
        lcd.print(F("          "));
        lcd.setCursor(0, 2);
        lcd.print(lastErrorMsg);
        for (int k = strlen(lastErrorMsg); k < 20; k++) lcd.print(' ');
        lcd.setCursor(0, 3);
        lcd.print(F("Press STOP to Reset "));

        tone(PIN_BUZZER, 1000, 150);
      }

      // รอให้ผู้ใช้กดปุ่ม STOP เพื่อรีเซ็ตระบบ
      if (checkStopButton()) {
        beep(1500, 100);
        lcd.clear();
        currentState = STATE_BOOT;
      }
      break;
    }
  }
}

// ============================================================================
// 8. HELPER FUNCTIONS: HARDWARE CONTROL & SENSORS
// ============================================================================

void controlRelay(bool turnOn) {
  // Relay ทำงานแบบ Active LOW: LOW = เปิดไฟ (ON), HIGH = ตัดไฟ (OFF)
  if (turnOn) {
    digitalWrite(PIN_RELAY1, LOW);
    digitalWrite(PIN_RELAY2, LOW);
  } else {
    digitalWrite(PIN_RELAY1, HIGH);
    digitalWrite(PIN_RELAY2, HIGH);
  }
}

void tcaselect(uint8_t i) {
  if (i > 7) return;
  Wire.beginTransmission(TCAADDR);
  Wire.write(1 << i);
  Wire.endTransmission();
}

TempResult readTemp(uint8_t n) {
  tcaselect(n);
  TempResult r;
  r.objectTemp = mlx.readObjectTempC();
  r.ambientTemp = mlx.readAmbientTempC();
  if (isnan(r.objectTemp) || r.objectTemp < -50.0f || r.objectTemp > 380.0f) {
    r.objectTemp = -999.0f;
    r.ambientTemp = -999.0f;
  }
  return r;
}

void setStatus(const char* d, const char* s) {
  strncpy(statusStr, s, sizeof(statusStr) - 1);
  statusStr[sizeof(statusStr) - 1] = '\0';

  strncpy(detailCode, d, sizeof(detailCode) - 1);
  detailCode[sizeof(detailCode) - 1] = '\0';

  controlRelay(false);
}

void startTestExecution() {
  beep(2200, 150);
  currentState = STATE_TESTING;
  state_timer = millis();
  last_sec_time = millis();
  sec = 0;
  ironWasOn = false;
  sIdx = 0;
  calibrateMode = false;
  statusStr[0] = 'o'; statusStr[1] = 'n'; statusStr[2] = '\0';
  strncpy_P(detailCode, PSTR("666"), sizeof(detailCode));

  for (uint8_t i = 0; i < 4; i++) {
    tempObjArr[i] = 0;
    tempAmbArr[i] = 0;
    T_corrected[i] = -999;
  }

  pzemSerial.listen();
  controlRelay(true);

  unsigned long startCheck = millis();
  while (millis() - startCheck < 2000) {
    current = pzem.current();
    if (isnan(current)) current = 0;
    if (current > 0.50f) {
      ironWasOn = true;
      break;
    }
    delay(50);
  }

  lcd.clear();
}

// ============================================================================
// 9. GATEWAY SERIAL PROTOCOL & STREAMING PARSER
// ============================================================================

/**
 * รูปแบบ Serial Telemetry ดั้งเดิม 13 คอลัมน์ (คงความเข้ากันได้ 100% กับ Gateway):
 * T0,T1,T2,T3,A0,A1,A2,A3,T_avg,Sec,Current,Status,Detail\n
 */
void showdata() {
  static float last_T[4] = {0, 0, 0, 0};
  static float last_A[4] = {0, 0, 0, 0};

  for (uint8_t i = 0; i < 4; i++) {
    if (T_corrected[i] != -999.0f) {
      last_T[i] = T_corrected[i];
      last_A[i] = tempAmbArr[i];
    }
  }

  temp_avg = (last_T[0] + last_T[1] + last_T[2] + last_T[3]) / 4.0f;

  for (uint8_t i = 0; i < 4; i++) {
    Serial.print(last_T[i], 2);
    Serial.print(F(","));
  }
  for (uint8_t i = 0; i < 4; i++) {
    Serial.print(last_A[i], 2);
    Serial.print(F(","));
  }
  Serial.print(temp_avg, 2);
  Serial.print(F(","));
  Serial.print(sec);
  Serial.print(F(","));
  Serial.print(current, 2);
  Serial.print(F(","));
  Serial.print(statusStr);
  Serial.print(F(","));
  Serial.println(detailCode);
}

/**
 * รับคำสั่งจาก Gateway แบบ Streaming Token Parser (ประหยัด RAM สูงสุด ป้องกัน Overflow)
 */
void processSerialStream() {
  while (Serial.available() > 0) {
    char c = Serial.read();

    if (c == ',' || c == '\n' || c == '\r') {
      if (tokenBufIdx > 0) {
        tokenBuf[tokenBufIdx] = '\0';
        handleCommandToken(tokenBuf, commandTokenIndex, (c == '\n' || c == '\r'));
        commandTokenIndex++;
        tokenBufIdx = 0;
      }
      if (c == '\n' || c == '\r') {
        commandTokenIndex = 0;
        isParsingOnCommand = false;
      }
    } else if (tokenBufIdx < sizeof(tokenBuf) - 1) {
      tokenBuf[tokenBufIdx++] = c;
    }
  }
}

void handleCommandToken(const char* token, uint8_t tokenIdx, bool isFinal) {
  // Token 0: ระบุคำสั่งหลัก
  if (tokenIdx == 0) {
    if (strcmp_P(token, PSTR("calibrate")) == 0) {
      calibrateMode = true;
      calibrateFinished = false;
      ironWasOn = false;
      sec = 0;
      last_sec_time = millis();
      statusStr[0] = 'o'; statusStr[1] = 'n'; statusStr[2] = '\0';
      strncpy_P(detailCode, PSTR("666"), sizeof(detailCode));
      current = 0;
      for (int i = 0; i < 4; i++) {
        tempObjArr[i] = 0;
        tempAmbArr[i] = 0;
        T_corrected[i] = -999;
      }
      sIdx = 0;
      pzemSerial.listen();
      controlRelay(true);
      currentState = STATE_TESTING;
      Serial.println(F(">>> CALIBRATE MODE"));
      return;
    }

    if (strcmp_P(token, PSTR("stop")) == 0) {
      calibrateMode = false;
      setStatus("777", "stop");
      controlRelay(false);
      showdata();
      currentState = STATE_RESULT;
      return;
    }

    if (strcmp_P(token, PSTR("START")) == 0) {
      if (currentState == STATE_READY || currentState == STATE_IDLE) {
        startTestExecution();
      }
      return;
    }

    if (strcmp_P(token, PSTR("SYNC")) == 0 || strcmp_P(token, PSTR("GET_RECORDS")) == 0) {
      syncRecordsToGateway();
      return;
    }

    if (strcmp_P(token, PSTR("GET_CONFIG")) == 0) {
      Serial.print(F("CONFIG,"));
      Serial.print(activeProfile.modelName);
      Serial.print(F(","));
      Serial.print(activeProfile.tempMin);
      Serial.print(F(","));
      Serial.print(activeProfile.tempLimit);
      Serial.print(F(","));
      Serial.print(activeProfile.currentLimit);
      Serial.print(F(","));
      Serial.print(activeProfile.startMoment);
      Serial.print(F(","));
      Serial.println(activeProfile.endMoment);
      return;
    }

    if (strncmp_P(token, PSTR("ACK_RECORD"), 10) == 0) {
      // รอรับ token ถัดไปที่เป็น index
      return;
    }

    if (strncmp_P(token, PSTR("BC:"), 3) == 0) {
      const char* bc = token + 3;
      while (*bc == ' ') bc++;
      strncpy(scannerBuffer, bc, sizeof(scannerBuffer) - 1);
      scannerBuffer[sizeof(scannerBuffer) - 1] = '\0';
      currentState = STATE_IDENTIFY;
      return;
    }

    if (strcmp_P(token, PSTR("on")) == 0) {
      isParsingOnCommand = true;
      return;
    }
  }

  // คำสั่ง ACK_RECORD,<idx>
  if (tokenIdx == 1 && strncmp_P(tokenBuf, PSTR("ACK_RECORD"), 10) == 0) {
    int idx = atoi(token);
    if (idx >= 0 && idx < MAX_OFFLINE_RECORDS) {
      uint16_t addr = ADDR_RECORDS + (idx * sizeof(TestRecord));
      TestRecord rec;
      EEPROM.get(addr, rec);
      rec.synced = 1;
      EEPROM.put(addr, rec);
      Serial.print(F(">>> ACK_OK,"));
      Serial.println(idx);
    }
    return;
  }

  // คำสั่ง on,tempMin,tempLim,currentLim,startMoment,endMoment,p0...
  if (isParsingOnCommand) {
    if (tokenIdx == 1) activeProfile.tempMin = atof(token);
    else if (tokenIdx == 2) activeProfile.tempLimit = atof(token);
    else if (tokenIdx == 3) activeProfile.currentLimit = atof(token);
    else if (tokenIdx == 4) activeProfile.startMoment = atoi(token);
    else if (tokenIdx == 5) activeProfile.endMoment = atoi(token);
    else if (tokenIdx >= 6 && tokenIdx < 30) {
      uint8_t pIdx = tokenIdx - 6;
      uint8_t sensor = pIdx / 6;
      uint8_t param = pIdx % 6;
      float val = atof(token);
      if (sensor < 4) {
        if (param == 0) activeProfile.cal[sensor].m1 = val;
        else if (param == 1) activeProfile.cal[sensor].c1 = val;
        else if (param == 2) activeProfile.cal[sensor].m2 = val;
        else if (param == 3) activeProfile.cal[sensor].c2 = val;
        else if (param == 4) activeProfile.cal[sensor].k  = val;
        else if (param == 5) activeProfile.cal[sensor].x0 = val;
      }
    }

    if (isFinal) {
      startTestExecution();
    }
  }
}

/**
 * รับข้อมูล Barcode / QR Code จากเครื่องอ่านผ่าน SoftwareSerial (Pin 8)
 */
void processScannerInput() {
  if (currentState != STATE_IDLE && currentState != STATE_READY) return;

  while (scannerSerial.available() > 0) {
    char c = scannerSerial.read();
    if (c == '\r' || c == '\n') {
      if (scannerBufIdx > 0) {
        scannerBuffer[scannerBufIdx] = '\0';
        scannerBufIdx = 0;
        currentState = STATE_IDENTIFY;
        break;
      }
    } else if (scannerBufIdx < sizeof(scannerBuffer) - 1) {
      if (c >= 32 && c <= 126) { // ตัวอักษรปกติ
        scannerBuffer[scannerBufIdx++] = c;
      }
    }
  }
}

// ============================================================================
// 10. BUTTONS & UI CONTROLS
// ============================================================================

bool checkStartButton() {
  static unsigned long lastBtnTime = 0;
  if (digitalRead(PIN_BTN_START) == LOW) {
    if (millis() - lastBtnTime > 250) {
      lastBtnTime = millis();
      return true;
    }
  }
  return false;
}

bool checkStopButton() {
  static unsigned long lastStopBtnTime = 0;
  if (digitalRead(PIN_BTN_STOP) == LOW) {
    if (millis() - lastStopBtnTime > 200) {
      lastStopBtnTime = millis();
      return true;
    }
  }
  return false;
}

void beep(uint16_t freq, uint16_t durationMs) {
  tone(PIN_BUZZER, freq, durationMs);
}

void alertPassSound() {
  tone(PIN_BUZZER, 1800, 100);
  delay(120);
  tone(PIN_BUZZER, 2400, 200);
}

void alertFailSound() {
  tone(PIN_BUZZER, 800, 250);
  delay(280);
  tone(PIN_BUZZER, 600, 450);
}

void alertStopSound() {
  tone(PIN_BUZZER, 1200, 400);
}

void updateIndicators() {
  unsigned long now = millis();

  switch (currentState) {
    case STATE_IDLE:
      digitalWrite(PIN_LED_RED, LOW);
      digitalWrite(PIN_LED_GREEN, (now / 1000) % 2 == 0 ? HIGH : LOW);
      break;

    case STATE_READY:
      digitalWrite(PIN_LED_RED, LOW);
      digitalWrite(PIN_LED_GREEN, (now / 400) % 2 == 0 ? HIGH : LOW);
      break;

    case STATE_TESTING:
    case STATE_EVALUATING:
      digitalWrite(PIN_LED_GREEN, HIGH);
      digitalWrite(PIN_LED_RED, LOW);
      break;

    case STATE_RESULT:
      if (strcmp_P(statusStr, PSTR("Passed")) == 0) {
        digitalWrite(PIN_LED_GREEN, HIGH);
        digitalWrite(PIN_LED_RED, LOW);
      } else {
        digitalWrite(PIN_LED_GREEN, LOW);
        digitalWrite(PIN_LED_RED, HIGH);
      }
      break;

    case STATE_ERROR:
      digitalWrite(PIN_LED_GREEN, LOW);
      digitalWrite(PIN_LED_RED, (now / 200) % 2 == 0 ? HIGH : LOW);
      break;

    default:
      digitalWrite(PIN_LED_GREEN, LOW);
      digitalWrite(PIN_LED_RED, LOW);
      break;
  }
}

void lcdPrintCenter(uint8_t row, const __FlashStringHelper* text) {
  char buf[21];
  strncpy_P(buf, (PGM_P)text, 20);
  buf[20] = '\0';
  lcdPrintCenterStr(row, buf);
}

void lcdPrintCenterStr(uint8_t row, const char* text) {
  uint8_t len = strlen(text);
  uint8_t startCol = (len >= 20) ? 0 : (20 - len) / 2;
  lcd.setCursor(0, row);
  for (uint8_t i = 0; i < startCol; i++) lcd.print(' ');
  lcd.print(text);
  for (uint8_t i = startCol + len; i < 20; i++) lcd.print(' ');
}

void updateLiveLCD() {
  lcd.setCursor(0, 0);
  lcd.print(F("T:"));
  lcd.print((int)temp_avg);
  lcd.print(F("C I:"));
  lcd.print(current, 1);
  lcd.print(F("A s:"));
  lcd.print(sec);
  for (int k = 14 + (sec > 9 ? 2 : 1); k < 20; k++) lcd.print(' ');

  lcd.setCursor(0, 1);
  lcd.print(F("R:"));
  lcd.print((int)T_corrected[0]);
  lcd.print(F(" M:"));
  lcd.print((int)T_corrected[1]);
  lcd.print(F(" L:"));
  lcd.print((int)T_corrected[2]);
  lcd.print(F(" T:"));
  lcd.print((int)T_corrected[3]);

  lcd.setCursor(0, 2);
  lcd.print(F("M:"));
  lcd.print(activeProfile.modelName);
  lcd.print(F(" [TESTING] "));

  lcd.setCursor(0, 3);
  lcd.print(F("PRESS STOP TO ABORT "));
}

// ============================================================================
// 11. EEPROM STORAGE & OFFLINE RECORDS
// ============================================================================

void initDefaultEEPROM() {
  sysHeader.magic = EEPROM_MAGIC;
  sysHeader.modelCount = 3;
  sysHeader.activeModelIdx = 0;
  sysHeader.recordHead = 0;
  sysHeader.recordCount = 0;
  EEPROM.put(ADDR_HEADER, sysHeader);

  // โมเดลที่ 1: DEFAULT
  ModelProfile defModel;
  strncpy_P(defModel.modelName, PSTR("DEFAULT"), sizeof(defModel.modelName));
  defModel.tempMin = 150.0f;
  defModel.tempLimit = 240.0f;
  defModel.currentLimit = 6.0f;
  defModel.startMoment = 20;
  defModel.endMoment = 120;
  CalibrationBlock cbDefault0 = {3.000000f, -107.215175f, 1.303553f, 150.000000f, 0.025162f, 54.910754f};
  CalibrationBlock cbDefault1 = {3.000000f, -147.789114f, 0.789323f, 149.999916f, 0.036467f, 30.000000f};
  defModel.cal[0] = cbDefault0;
  defModel.cal[1] = cbDefault1;
  defModel.cal[2] = cbDefault0;
  defModel.cal[3] = cbDefault1;
  EEPROM.put(ADDR_MODELS + (0 * sizeof(ModelProfile)), defModel);

  // โมเดลที่ 2: CB-95
  ModelProfile cb95;
  strncpy_P(cb95.modelName, PSTR("CB-95"), sizeof(cb95.modelName));
  cb95.tempMin = 150.0f;
  cb95.tempLimit = 230.0f;
  cb95.currentLimit = 5.5f;
  cb95.startMoment = 25;
  cb95.endMoment = 110;
  cb95.cal[0] = cbDefault0;
  cb95.cal[1] = cbDefault1;
  cb95.cal[2] = cbDefault0;
  cb95.cal[3] = cbDefault1;
  EEPROM.put(ADDR_MODELS + (1 * sizeof(ModelProfile)), cb95);

  // โมเดลที่ 3: JP-87
  ModelProfile jp87;
  strncpy_P(jp87.modelName, PSTR("JP-87"), sizeof(jp87.modelName));
  jp87.tempMin = 145.0f;
  jp87.tempLimit = 235.0f;
  jp87.currentLimit = 5.8f;
  jp87.startMoment = 20;
  jp87.endMoment = 100;
  CalibrationBlock cbJp0 = {3.000000f, -150.000000f, 1.619975f, 128.621183f, 0.049001f, 30.000000f};
  CalibrationBlock cbJp1 = {3.000000f, -132.004825f, 1.011612f, 150.000000f, 0.080216f, 30.000000f};
  jp87.cal[0] = cbJp0;
  jp87.cal[1] = cbJp1;
  jp87.cal[2] = cbJp0;
  jp87.cal[3] = cbJp1;
  EEPROM.put(ADDR_MODELS + (2 * sizeof(ModelProfile)), jp87);

  activeProfile = defModel;
}

void loadActiveModel(uint8_t idx) {
  if (idx >= MAX_PRESET_MODELS) idx = 0;
  EEPROM.get(ADDR_MODELS + (idx * sizeof(ModelProfile)), activeProfile);
}

void saveTestRecordToEEPROM() {
  TestRecord rec;
  strncpy(rec.serialNumber, currentSerial, sizeof(rec.serialNumber));
  rec.serialNumber[sizeof(rec.serialNumber) - 1] = '\0';

  strncpy(rec.modelName, activeProfile.modelName, sizeof(rec.modelName));
  rec.modelName[sizeof(rec.modelName) - 1] = '\0';

  rec.avgTemp = temp_avg;
  rec.tipTemp = (T_corrected[3] != -999.0f) ? T_corrected[3] : 0.0f;
  rec.current = current;
  rec.durationSec = (uint16_t)sec;
  rec.detailCode = (uint16_t)atoi(detailCode);

  if (strcmp_P(statusStr, PSTR("Passed")) == 0) rec.status = 1;
  else if (strcmp_P(statusStr, PSTR("stop")) == 0) rec.status = 2;
  else rec.status = 0;

  rec.synced = 0; // ยังไม่ได้ซิงค์

  uint8_t writeIdx = sysHeader.recordHead;
  uint16_t addr = ADDR_RECORDS + (writeIdx * sizeof(TestRecord));
  EEPROM.put(addr, rec);

  sysHeader.recordHead = (sysHeader.recordHead + 1) % MAX_OFFLINE_RECORDS;
  if (sysHeader.recordCount < MAX_OFFLINE_RECORDS) {
    sysHeader.recordCount++;
  }
  EEPROM.put(ADDR_HEADER, sysHeader);

  Serial.print(F(">>> SAVED RECORD ["));
  Serial.print(writeIdx);
  Serial.print(F("] | SN: "));
  Serial.print(rec.serialNumber);
  Serial.print(F(" | Code: "));
  Serial.println(rec.detailCode);
}

void syncRecordsToGateway() {
  Serial.print(F(">>> BEGIN_RECORDS,"));
  Serial.println(sysHeader.recordCount);

  for (uint8_t i = 0; i < sysHeader.recordCount; i++) {
    uint16_t addr = ADDR_RECORDS + (i * sizeof(TestRecord));
    TestRecord rec;
    EEPROM.get(addr, rec);

    Serial.print(F("REC,"));
    Serial.print(i);
    Serial.print(F(","));
    Serial.print(rec.serialNumber);
    Serial.print(F(","));
    Serial.print(rec.modelName);
    Serial.print(F(","));
    Serial.print(rec.status == 1 ? F("Passed") : (rec.status == 2 ? F("stop") : F("Failed")));
    Serial.print(F(","));
    Serial.print(rec.detailCode);
    Serial.print(F(","));
    Serial.print(rec.avgTemp, 2);
    Serial.print(F(","));
    Serial.print(rec.tipTemp, 2);
    Serial.print(F(","));
    Serial.print(rec.current, 2);
    Serial.print(F(","));
    Serial.print(rec.durationSec);
    Serial.print(F(","));
    Serial.println(rec.synced);
  }

  Serial.println(F(">>> END_RECORDS"));
}

void checkSensorDrift() {
  // คำนวณค่าเฉลี่ยของ Ambient ทั้ง 4 จุด
  float ambAvg = (ewmaAmbient[0] + ewmaAmbient[1] + ewmaAmbient[2] + ewmaAmbient[3]) / 4.0f;

  for (uint8_t i = 0; i < 4; i++) {
    float diff = fabs(ewmaAmbient[i] - ambAvg);
    // หากเซนเซอร์ตัวใดเบี่ยงเบนจากกลุ่มเกิน 6 องศาเซลเซียส ให้แจ้งเตือน Sensor Drift
    if (diff > 6.0f) {
      Serial.print(F(">>> WARN: SENSOR DRIFT DETECTED ON SENSOR "));
      Serial.print(i);
      Serial.print(F(" | Diff: "));
      Serial.println(diff, 2);
    }
  }
}
