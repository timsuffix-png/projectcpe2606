const API = "http://localhost:3021/api/v1/";

async function post(endpoint, data) {
  const res = await fetch(API + endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
}

async function get(endpoint) {
  const res = await fetch(API + endpoint);
  return await res.json();
}

async function seed() {
  console.log("Seeding QC data for Local Testing...");

  // 1. QC Types
  const qcTypeSeaward = await post("qc/type", { name: "seaward" });
  const qcTypeTemp = await post("qc/type", { name: "thermostat" });
  console.log("QC Types created:", {
    seaward: qcTypeSeaward?.data?.[0]?.ID,
    thermostat: qcTypeTemp?.data?.[0]?.ID,
  });

  const thermoId = qcTypeTemp?.data?.[0]?.ID;
  const seawardId = qcTypeSeaward?.data?.[0]?.ID;

  // 2. QC Main
  let qcMainThermo, qcMainEbond, qcMainDcir, qcMainHipot;
  if (thermoId) {
    qcMainThermo = await post("qc/main", {
      qcType: thermoId,
      testName: "การทดสอบอุณหภูมิเตารีด (Thermostat)",
      detail: "ตรวจสอบอุณหภูมิเตารีดตามค่ามาตรฐาน",
    });
  }
  if (seawardId) {
    qcMainEbond = await post("qc/main", {
      qcType: seawardId,
      testName: "EBOND_50",
      detail: "ทดสอบสายดิน Earth Bond",
    });
    qcMainDcir = await post("qc/main", {
      qcType: seawardId,
      testName: "DCIR",
      detail: "ทดสอบความต้านทานฉนวน DCIR",
    });
    qcMainHipot = await post("qc/main", {
      qcType: seawardId,
      testName: "HIPOT_50",
      detail: "ทดสอบความเป็นฉนวนทางไฟฟ้า HIPOT",
    });
  }

  // 3. QC Project
  const project1 = await post("qc/project", {
    projectName: "เตารีด Class 1 (3 ขา)",
    detail: "ชุดการทดสอบสำหรับเตารีด 3 ขา พร้อมวัดอุณหภูมิ",
  });
  const project2 = await post("qc/project", {
    projectName: "เตารีด Class 2 (2 ขา)",
    detail: "ชุดการทดสอบสำหรับเตารีด 2 ขา",
  });

  const p1Id = project1?.data?.[0]?.ID;
  const p2Id = project2?.data?.[0]?.ID;

  // 4. Map items
  if (p1Id) {
    if (qcMainThermo?.data?.[0]?.ID) {
      await post("qc/itemProject", {
        qcProject: p1Id,
        qcMain: qcMainThermo.data[0].ID,
      });
    }
    if (qcMainEbond?.data?.[0]?.ID) {
      await post("qc/itemProject", {
        qcProject: p1Id,
        qcMain: qcMainEbond.data[0].ID,
      });
    }
    if (qcMainDcir?.data?.[0]?.ID) {
      await post("qc/itemProject", {
        qcProject: p1Id,
        qcMain: qcMainDcir.data[0].ID,
      });
    }
  }

  if (p2Id) {
    if (qcMainThermo?.data?.[0]?.ID) {
      await post("qc/itemProject", {
        qcProject: p2Id,
        qcMain: qcMainThermo.data[0].ID,
      });
    }
    if (qcMainDcir?.data?.[0]?.ID) {
      await post("qc/itemProject", {
        qcProject: p2Id,
        qcMain: qcMainDcir.data[0].ID,
      });
    }
  }

  console.log("Seeding completed successfully!");
}

seed().catch(console.error);
