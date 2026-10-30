#include <Wire.h>
#include <Adafruit_MLX90614.h>
#include <PZEM004Tv30.h>
#include <SoftwareSerial.h>

// -------------------- Hardware --------------------
Adafruit_MLX90614 mlx = Adafruit_MLX90614();
SoftwareSerial pzemSerial(12, 11);
PZEM004Tv30 pzem(pzemSerial);

#define TCAADDR 0x70

// -------------------- Relays --------------------
const int Relay1 = 2;
const int Relay2 = 3;

// -------------------- Timing --------------------
const unsigned long period = 1000;
unsigned long last_time = 0;
unsigned long sec = 0;

// -------------------- Limits --------------------
double tempLimit = 0, tempMin = 0, currentLimit = 0;
int startMoment = 0, endMoment = 0;

// -------------------- Calibration --------------------
float p[4][6];
int sensorCount = 0;

// -------------------- Mode --------------------
bool calibrateMode = false;
bool ironWasOn = false; // ติดตามว่าเคยมีกระแสเกิน 0.5A หรือไม่
bool calibrateFinished = false;

// -------------------- Vars --------------------
double tempObjArr[4], tempAmbArr[4];
double T_corrected[4];
float temp_avg = 0.0f;
String detail = "000", statusOn = "off";
float current = 0;
int sIdx = 0;

struct TempResult { float objectTemp; float ambientTemp; };

// -------------------- Prototypes --------------------
void tcaselect(uint8_t i);
void controlRelay(const String& msg);
TempResult readTemp(uint8_t n);
void showdata();
void setStatus(const String& detailfunc, const String& status);
void recalcTemp();

// =====================================================
void setup() {
  Wire.begin();
  Serial.begin(115200);
  pzemSerial.begin(9600);
  mlx.begin();

  pinMode(Relay1, OUTPUT);
  pinMode(Relay2, OUTPUT);

  controlRelay("off");
}

// =====================================================
void loop() {
  if (Serial.available() > 0) {
    String data = Serial.readStringUntil('\n');
    data.trim();

    // ----- Command: calibrate -----
if (data == "calibrate") {

  calibrateMode = true;

  calibrateFinished = false;

  ironWasOn = false;

  sensorCount = 4;

  sec = 0;

  last_time = millis();

  statusOn = "on";

  detail = "666";

  current = 0;

  for (int i = 0; i < 4; i++) {
    tempObjArr[i] = 0;
    tempAmbArr[i] = 0;
    T_corrected[i] = -999;
  }

  sIdx = 0;

  controlRelay("on");

  Serial.println(">>> CALIBRATE MODE");

  return;
}

    // ----- Command: stop -----
    if (data == "stop") {
      calibrateMode = false;
      statusOn = "stop";
      detail = "777";
      controlRelay("off");
      showdata(); // ปริ้น 777 ทันทีเมื่อกด stop
      return;
    }

    // ----- Command: on,.... (Parse Data) -----
    int idx[50]; int found = 0; int last = -1;
    while (true) {
      int pos = data.indexOf(',', last + 1);
      if (pos == -1) break;
      idx[found++] = pos; last = pos;
    }

    if (found >= 6) {
      statusOn = data.substring(0, idx[0]);
      tempMin = data.substring(idx[0]+1, idx[1]).toFloat();
      tempLimit = data.substring(idx[1]+1, idx[2]).toFloat();
      currentLimit = data.substring(idx[2]+1, idx[3]).toFloat();
      startMoment = data.substring(idx[3]+1, idx[4]).toInt();
      endMoment = data.substring(idx[4]+1, idx[5]).toInt();
      endMoment++;

      int paramCount = found - 5;
      sensorCount = paramCount / 6;
      if (sensorCount > 4) sensorCount = 4;

      // Map พารามิเตอร์: Block1→ir1, Block2→ir2, Block3→ir3, Block4→ir4
      int p_cnt = 0;
      int targetIdx[] = {0, 1, 2, 3};
      for (int i = 0; i < 4; i++) {
        int currentP = targetIdx[i];
        for (int j = 0; j < 6; j++) {
          int start = idx[5 + p_cnt];
          int end = (5 + p_cnt + 1 < found) ? idx[5 + p_cnt + 1] : data.length();
          p[currentP][j] = data.substring(start + 1, end).toFloat();
          p_cnt++;
        }
      }
      calibrateMode = false;
      ironWasOn = false; // reset ทุกครั้งที่เริ่มการทดสอบใหม่
      if (statusOn == "on") {
        for (int i = 0; i < 4; i++) {

  tempObjArr[i] = 0;

  tempAmbArr[i] = 0;

  T_corrected[i] = -999;
}

sIdx = 0;
        sec = 0;
        controlRelay("on");
        // รอ PZEM อ่านค่ากระแสได้ สูงสุด 2 วิ (เพื่อแยกเครื่องปิด vs thermostat เพิ่งตัด)
        unsigned long startCheck = millis();
        while (millis() - startCheck < 2000) {
          current = pzem.current();
          if (isnan(current)) current = 0;
          if (current > 0.50) { ironWasOn = true; break; } // พบกระแส = เตารีดเปิดอยู่
        }
        last_time = millis();
      } else { controlRelay("off"); }
    }
  }

if ((calibrateMode && !calibrateFinished)
    || statusOn == "on"){
    current = pzem.current();
    if (isnan(current)) current = 0;
    if (current > 0.50) ironWasOn = true; // ติดตามทุก iteration

    TempResult r = readTemp(sIdx + 2);
    tempObjArr[sIdx] = r.objectTemp;
    tempAmbArr[sIdx] = r.ambientTemp;

    // --- คำนวณอุณหภูมิตามโหมด ---
    if (calibrateMode) {
      T_corrected[sIdx] = r.objectTemp; // Calibrate ใช้ค่า RAW
    } else {
      float x = tempObjArr[sIdx];
      if (isnan(x) || x <= -900) { T_corrected[sIdx] = -999; }
      else {
        float m1=p[sIdx][0], c1=p[sIdx][1], m2=p[sIdx][2], c2=p[sIdx][3], k=p[sIdx][4], x0=p[sIdx][5];
        k = constrain(k, 0.01, 0.5);
        float expVal = constrain(-k * (x - x0), -60.0, 60.0);
        float s = 1.0 / (1.0 + exp(expVal));
        T_corrected[sIdx] = constrain((m1*x + c1)*(1-s) + (m2*x + c2)*s, 0, 400);
      }
    }
    sIdx = (sIdx + 1) % sensorCount;

    // --- ตรวจสอบเงื่อนไข ---
    bool sensorError = false;
   for(int i=0; i<sensorCount; i++) {

  if (tempObjArr[i] <= -900) {

    if (calibrateMode) {

      calibrateFinished = true;

      calibrateMode = false;
    }

    setStatus("01" + String(i), "Failed");

    sensorError = true;

    break;
  }
}


    if (!sensorError) {

  // ================= CALIBRATE =================

  if (calibrateMode) {

    // มีแค่สถานะกำลังทำงาน
    detail = "666";

    // เตารีดเคยกินกระแสแล้ว
    if (current > 0.50) {
      ironWasOn = true;
    }

    // เตารีดตัดเอง
    if (ironWasOn &&
        current == 0 &&
        sec > 0) {

      setStatus("888", "Passed");

calibrateFinished = true;

calibrateMode = false;
    }
  }

  // ================= NORMAL MODE =================

  else {

    // 1. เช็คกระแสเกิน
    if (currentLimit > 0 && current >= currentLimit) {
      setStatus("040", "Failed");
    }

    // 2. เช็คอุณหภูมิเกิน
    else {

      for(int i=0; i<sensorCount; i++) {

        if (tempLimit > 0 &&
            T_corrected[i] > tempLimit) {

          setStatus("020", "Failed");

          sensorError = true;

          break;
        }
      }

      if (!sensorError) {

        // 3. เช็คกระแสตัด
        if (current == 0 && sec > 0) {

          if (!ironWasOn) {

            setStatus("000", "Failed");
          }

          else {

            if (sec < (unsigned long)startMoment)
              setStatus("030", "Failed");

            else if (sec > (unsigned long)endMoment)
              setStatus("031", "Failed");

            else if (T_corrected[3] <= tempMin)
              setStatus("021", "Failed");

            else
              setStatus("888", "Passed");
          }
        }

        // 4. หมดเวลา
        else if (endMoment > 0 &&
                 sec > (unsigned long)endMoment) {

          setStatus("031", "Failed");
        }

        else {

          detail = "666";
        }
      }
    }
  }
}

    // แสดงผลทุก 1 วินาที
    if (millis() - last_time >= period) {
      last_time = millis();
      sec++;
      showdata();
    }
  }
}

// =====================================================
void recalcTemp() {
  for(int i=0; i<sensorCount; i++) {
    float x = tempObjArr[i];
    if (isnan(x) || x <= -900) { T_corrected[i] = -999; continue; }
    float m1=p[i][0], c1=p[i][1], m2=p[i][2], c2=p[i][3], k=p[i][4], x0=p[i][5];
    k = constrain(k, 0.01, 0.5);
    float exponent = constrain(-k * (x - x0), -60.0, 60.0);
    float s = 1.0 / (1.0 + exp(exponent));
    T_corrected[i] = constrain((m1*x + c1)*(1-s) + (m2*x + c2)*s, 0, 400);
  }
}

TempResult readTemp(uint8_t n) {
  tcaselect(n);
  TempResult r;
  r.objectTemp = mlx.readObjectTempC();
  r.ambientTemp = mlx.readAmbientTempC();
  if (isnan(r.objectTemp)) { r.objectTemp = -999; r.ambientTemp = -999; }
  return r;
}

void tcaselect(uint8_t i) {
  Wire.beginTransmission(TCAADDR);
  Wire.write(1 << i);
  Wire.endTransmission();
}

void controlRelay(const String& msg) {
  if (msg == "off") { digitalWrite(Relay1, HIGH); digitalWrite(Relay2, HIGH); }
  else { digitalWrite(Relay1, LOW); digitalWrite(Relay2, LOW); }
}

void showdata() {
  static float last_T[4] = {0,0,0,0}, last_A[4] = {0,0,0,0};
  for(int i=0; i<4; i++) {
    if (i < sensorCount && T_corrected[i] != -999) {
      last_T[i] = T_corrected[i];
      last_A[i] = tempAmbArr[i];
    }
  }
  temp_avg = (last_T[0] + last_T[1] + last_T[2] + last_T[3]) / 4.0f;
  for(int i=0; i<4; i++) { Serial.print(last_T[i], 2); Serial.print(","); }
  for(int i=0; i<4; i++) { Serial.print(last_A[i], 2); Serial.print(","); }
  Serial.print(temp_avg, 2); Serial.print(",");
  Serial.print(sec); Serial.print(",");
  Serial.print(current, 2); Serial.print(",");
  Serial.print(statusOn); Serial.print(",");
  Serial.println(detail);
}

void setStatus(const String& d, const String& s) {
  statusOn = s;
  detail = d;
  controlRelay("off");
  showdata();
}
