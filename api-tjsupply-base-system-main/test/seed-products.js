const { Client } = require('pg');
const cryptoJS = require('crypto-js');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY || "tjsupply-secret-key-2024";

async function seedProducts() {
  const client = new Client({
    host: process.env.HOSTDB || '127.0.0.1',
    port: Number(process.env.PORTDB) || 5433,
    user: process.env.USERDB || 'tjsupply',
    password: process.env.PASSWORDDB || 'tjsupply123',
    database: 'tjsupply-base-system'
  });

  await client.connect();
  console.log('Connected to PostgreSQL...');

  try {
    await client.query('BEGIN');

    // 1. Ensure item_types exist
    await client.query(`
      INSERT INTO item_type ("ID", name) VALUES (1, 'สินค้า'), (2, 'วัตถุดิบ')
      ON CONFLICT ("ID") DO NOTHING
    `);

    // 2. Check or create finished product item: "เตารีด CB95"
    let itemRes = await client.query(`SELECT "ID" FROM item WHERE name = 'เตารีด CB95' LIMIT 1`);
    let finishedItemId;
    if (itemRes.rows.length > 0) {
      finishedItemId = itemRes.rows[0].ID;
      console.log('Existing Finished Item ID:', finishedItemId);
    } else {
      finishedItemId = uuidv4();
      await client.query(`
        INSERT INTO item ("ID", "isFavourite", amount, "costPrice", "salePrice", "insurancePeriod", name, detail, "createdAt", "updatedAt", "itemTypeID")
        VALUES ($1, true, 100, 250, 590, 12, 'เตารีด CB95', 'เตารีดไอน้ำ CB95 สำหรับทดสอบ QC', NOW(), NOW(), 1)
      `, [finishedItemId]);
      console.log('Created Finished Item ID:', finishedItemId);
    }

    // 3. Check or create raw material: "แผ่นความร้อน CB95"
    let matRes = await client.query(`SELECT "ID" FROM item WHERE name = 'แผ่นความร้อน CB95' LIMIT 1`);
    let rawMatId;
    if (matRes.rows.length > 0) {
      rawMatId = matRes.rows[0].ID;
    } else {
      rawMatId = uuidv4();
      await client.query(`
        INSERT INTO item ("ID", "isFavourite", amount, "costPrice", "salePrice", "insurancePeriod", name, detail, "createdAt", "updatedAt", "itemTypeID")
        VALUES ($1, false, 500, 80, 0, 0, 'แผ่นความร้อน CB95', 'วัตถุดิบแผ่นความร้อน', NOW(), NOW(), 2)
      `, [rawMatId]);
      console.log('Created Raw Material ID:', rawMatId);
    }

    // 4. Item model
    const modelRes = await client.query(`SELECT "ID" FROM item_model WHERE "itemID" = $1 LIMIT 1`, [finishedItemId]);
    if (modelRes.rows.length === 0) {
      const maxModel = await client.query(`SELECT COALESCE(MAX("ID"), 0) + 1 AS next_id FROM item_model`);
      const nextModelId = maxModel.rows[0].next_id;
      await client.query(`INSERT INTO item_model ("ID", "itemID") VALUES ($1, $2)`, [nextModelId, finishedItemId]);
      console.log('Created Item Model:', nextModelId);
    }

    // 5. Formula Project
    let formulaRes = await client.query(`SELECT "ID" FROM formula_project WHERE "toItemID" = $1 LIMIT 1`, [finishedItemId]);
    let formulaId;
    if (formulaRes.rows.length > 0) {
      formulaId = formulaRes.rows[0].ID;
    } else {
      formulaId = uuidv4();
      await client.query(`
        INSERT INTO formula_project ("ID", name, "costFormula", detail, "createdAt", "updatedAt", "toItemID")
        VALUES ($1, 'สูตรการผลิต CB95', 250, 'สูตรการประกอบเตารีด CB95', NOW(), NOW(), $2)
      `, [formulaId, finishedItemId]);
      console.log('Created Formula Project ID:', formulaId);

      // Formula item mapping
      await client.query(`
        INSERT INTO formula_item ("ID", amount, "formulaProjectID", "itemID")
        VALUES ($1, 1, $2, $3)
      `, [uuidv4(), formulaId, rawMatId]);
    }

    // 6. Production Plan
    let planRes = await client.query(`SELECT "ID" FROM production_plan WHERE "planName" = 'แผนผลิต 2026/1' LIMIT 1`);
    let planId;
    if (planRes.rows.length > 0) {
      planId = planRes.rows[0].ID;
    } else {
      planId = uuidv4();
      await client.query(`
        INSERT INTO production_plan ("ID", "planName", "startDate", "endDate", detail, status, "createdAt")
        VALUES ($1, 'แผนผลิต 2026/1', '2026-01-01 00:00:00', '2026-12-31 23:59:59', 'แผนการผลิตเตารีดจำลองสำหรับทดสอบ QC', 'in progress', NOW())
      `, [planId]);
      console.log('Created Production Plan ID:', planId);
    }

    // 7. Production Lot
    let lotRes = await client.query(`SELECT "ID" FROM production_lot WHERE "productionPlanID" = $1 LIMIT 1`, [planId]);
    let lotId;
    if (lotRes.rows.length > 0) {
      lotId = lotRes.rows[0].ID;
    } else {
      lotId = uuidv4();
      await client.query(`
        INSERT INTO production_lot ("ID", name, "productionPlanID")
        VALUES ($1, 'ล็อตการผลิต 01', $2)
      `, [lotId, planId]);
      console.log('Created Production Lot ID:', lotId);
    }

    // 8. Production Sub
    let subRes = await client.query(`SELECT "ID" FROM production_sub WHERE "productionLotID" = $1 LIMIT 1`, [lotId]);
    let subId;
    if (subRes.rows.length > 0) {
      subId = subRes.rows[0].ID;
    } else {
      subId = uuidv4();
      await client.query(`
        INSERT INTO production_sub ("ID", "amountRequire", "amountCurrent", "productionLotID", "formulaProjectID")
        VALUES ($1, 50, 50, $2, $3)
      `, [subId, lotId, formulaId]);
      console.log('Created Production Sub ID:', subId);
    }

    // 9. Construct (Serial Numbers)
    const serials = [
      'CB95-0001',
      'CB95-0002',
      'CB95-0003',
      'CB95-0004',
      'CB95-0005',
      'SN202610210001000101',
      'SN202610210001000201',
      'SN202610210001000301',
      'SN202610210001000401',
      'SN202610210001000501'
    ];

    console.log('\n--- Creating Mock Construct / Serial Numbers ---');
    for (const sn of serials) {
      const encryptVal = cryptoJS.AES.encrypt(sn, SECRET_KEY).toString();
      await client.query(`
        INSERT INTO construct ("ID", "encryptIDValue", "createdAt", "updatedAt", status, "itemID", "productionSubID")
        VALUES ($1, $2, NOW(), NOW(), 'waiting', $3, $4)
        ON CONFLICT ("ID") DO UPDATE SET "encryptIDValue" = EXCLUDED."encryptIDValue"
      `, [sn, encryptVal, finishedItemId, subId]);
      console.log(`✓ Serial Number: ${sn} | Encrypted: ${encryptVal.substring(0, 20)}...`);
    }

    await client.query('COMMIT');
    console.log('\n Mock products & serial numbers seeded successfully!\n');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error during seeding:', err);
    throw err;
  } finally {
    await client.end();
  }
}

seedProducts().catch(console.error);
