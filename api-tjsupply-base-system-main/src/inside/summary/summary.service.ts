import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Construct } from '../constructs/construct/entities/construct.entity';
import { Repository } from 'typeorm';
import { QcRecord } from '../qc/qc-record/entities/qc-record.entity';
import { Item } from '../items/item/entities/item.entity';
import { QcRecordStatus } from '../qc/qc-record-status/entities/qc-record-status.entity';
import { ProductionPlan } from '../plan/production-plan/entities/production-plan.entity';
import * as moment from "moment-timezone"
import { Bank } from '../etc/bank/entities/bank.entity';
import { PicknpayGoods } from '../items/picknpay-goods/entities/picknpay-goods.entity';

@Injectable()
export class SummaryService {
  private logger = new Logger()

  constructor (
    @InjectRepository(Construct) private constructRepository: Repository<Construct>,
    @InjectRepository(QcRecord) private qcRecordRepository: Repository<QcRecord>,
    @InjectRepository(Item) private itemRepository: Repository<Item>,
    @InjectRepository(QcRecordStatus) private qcRecordStatusRepository: Repository<QcRecordStatus>,
    @InjectRepository(ProductionPlan) private productionPlanRepository: Repository<ProductionPlan>,
    @InjectRepository(Bank) private bankRepository: Repository<Bank>,
    @InjectRepository(PicknpayGoods) private picknpayGoodsRepository: Repository<PicknpayGoods>
  ){}

  async buildAverage(): Promise<Object>{
    try{
      const construct = await this.itemRepository.query(`
        SELECT 
            "i"."ID", "t1"."formulaProjectID", "i".name AS "itemName", "i"."amount" AS "currentAmount", 
            (
                CASE
                        WHEN "t1"."canProduct" IS NULL
                            THEN 0
                        ELSE FLOOR(AVG("t1"."canProduct"))
                END 
            ) AS "averageCanProductFromAllFormula"
        FROM
            item "i"
        LEFT JOIN ( 
                SELECT "fi"."formulaProjectID", 
                    (
                    SELECT "fp"."toItemID" 
                    FROM formula_project fp 
                    WHERE "fp"."ID" = "fi"."formulaProjectID"
                    ) AS "toItemID",
                    MIN("_i".amount/fi.amount) AS "canProduct"
                FROM item "_i"
                INNER JOIN formula_item "fi"
                ON "fi"."itemID" = "_i"."ID"
                GROUP BY "fi"."formulaProjectID") t1
        ON "t1"."toItemID" = "i"."ID"
        GROUP BY "i"."ID", "t1"."formulaProjectID", "t1"."canProduct"
      `)

      return {error: false, message: `get item build average complete.`, data: construct}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async constructLastUpdate(limit: number): Promise<Object>{
    try{
      const construct = await this.constructRepository.createQueryBuilder("construct")
      .select(["construct.ID", "construct.updatedAt"])
      .take(limit)
      .orderBy("construct.updatedAt", "DESC")
      .getMany()

      return {error: false, message: `get last update ${limit} record complete.`, data: construct}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async constructOverAll(): Promise<Object>{
    try{
      var construct = await this.constructRepository.query("SELECT status, COUNT(status) AS amount FROM construct GROUP BY status")

      construct = Array.from(construct).map((data: any)=>({status: data.status, amount: parseInt(data.amount)}))

      return {error: false, message: `get overall status count from construct complete.`, data: construct}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async qcOverAll(): Promise<Object>{
    try{
      var qcRecord = await this.qcRecordRepository.query(
        `SELECT "QcRecord"."statusOverView" AS "statusOverView", COUNT("QcRecord"."statusOverView") AS "amount" 
        FROM "qc_record" "QcRecord"
        GROUP BY "QcRecord"."statusOverView"`
      )

      qcRecord = Array.from(qcRecord).map((data: any)=>({statusOverView: data.statusOverView, amount: parseInt(data.amount)}))

      return {error: false, message: `get overall status count from qcRecord complete.`, data: qcRecord}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async qcLastUpdate(limit: number): Promise<Object>{
    try{
      const qcRecord = await this.qcRecordRepository.createQueryBuilder("record")
      .select([
        "record.ID AS \"qcRecordID\"", "construct.ID AS \"serialNumber\"", "producedBy.ID AS \"producedBy\"", 
        "CONCAT(producedBy.name, ' ', producedBy.surname) AS \"producedByName\"", "record.statusOverView AS \"statusOverView\""
      ])
      .innerJoin("record.construct", "construct")
      .innerJoin("construct.producedBy", "producedBy")
      .take(limit)
      .getRawMany()

      return {error: false, message: `get last update ${limit} record complete.`, data: qcRecord}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async qcLessFail(limit: number): Promise<Object>{
    try{
      if (!limit) throw new Error("invalid limit data.")

      var qcRecord = await this.qcRecordRepository.query(`
        SELECT "pass"."producedByID" AS "userID_usersProducer", COALESCE(passCount, 0) AS "passAmount", COALESCE(failCount, 0) AS "failAmount", (CASE WHEN passCount IS NULL THEN 0 ELSE passCount END+CASE WHEN failCount IS NULL THEN 0 ELSE failCount END) AS "allAmount", (SELECT CONCAT(name, ' ', surname) FROM users_producer WHERE "users_producer"."ID"="pass"."producedByID") AS "nameSur" FROM (
          (SELECT "a"."producedByID", passCount FROM ((SELECT DISTINCT "construct"."producedByID" FROM construct GROUP BY "construct"."producedByID" HAVING "construct"."producedByID" IS NOT NULL) a
          LEFT JOIN
          (SELECT "con"."producedByID", COUNT("qcRec"."ID") AS passCount FROM qc_record "qcRec" INNER JOIN construct "con" ON "qcRec"."constructID"="con"."ID" WHERE "con"."producedByID" IS NOT NULL AND "qcRec"."statusOverView" LIKE 'Passed' GROUP BY "con"."producedByID") p
          ON "a"."producedByID"="p"."producedByID"
          )) pass
          
          INNER JOIN
          
          (SELECT "a"."producedByID", failCount FROM ((SELECT DISTINCT "construct"."producedByID" FROM construct GROUP BY "construct"."producedByID" HAVING "construct"."producedByID" IS NOT NULL) a
          LEFT JOIN
          (SELECT "con"."producedByID", COUNT("qcRec"."ID") AS failCount FROM qc_record "qcRec" INNER JOIN construct "con" ON "qcRec"."constructID"="con"."ID" WHERE "con"."producedByID" IS NOT NULL AND "qcRec"."statusOverView" LIKE 'Failed' GROUP BY "con"."producedByID") f
          ON "a"."producedByID"="f"."producedByID"
          )) fail
          ON "pass"."producedByID"="fail"."producedByID"
          ) ORDER BY COALESCE(failCount, 0)/(CASE WHEN passCount IS NULL THEN 1 ELSE passCount END+CASE WHEN failCount IS NULL THEN 0 ELSE failCount END) ASC LIMIT ${limit}
      `)
      
      qcRecord = Array.from(qcRecord).map((data: any)=>({
        userID_usersProducer: data.userID_usersProducer, 
        passAmount: parseInt(data.passAmount), 
        failAmount: parseInt(data.failAmount), 
        allAmount: parseInt(data.allAmount), 
        nameSur: data.nameSur
      }))

      return {error: false, message: `get qc less fail ${limit} record complete.`, data: qcRecord}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async qcMostFail(limit: number): Promise<Object>{
    try{
      if (!limit) throw new Error("invalid limit data.")

      var qcRecord = await this.qcRecordRepository.query(`
        SELECT "pass"."producedByID" AS "userID_usersProducer", COALESCE(passCount, 0) AS "passAmount", COALESCE(failCount, 0) AS "failAmount", (CASE WHEN passCount IS NULL THEN 0 ELSE passCount END+CASE WHEN failCount IS NULL THEN 0 ELSE failCount END) AS "allAmount", (SELECT CONCAT(name, ' ', surname) FROM users_producer WHERE "users_producer"."ID"="pass"."producedByID") AS "nameSur" FROM (
          (SELECT "a"."producedByID", passCount FROM ((SELECT DISTINCT "construct"."producedByID" FROM construct GROUP BY "construct"."producedByID" HAVING "construct"."producedByID" IS NOT NULL) a
          LEFT JOIN
          (SELECT "con"."producedByID", COUNT("qcRec"."ID") AS passCount FROM qc_record "qcRec" INNER JOIN construct "con" ON "qcRec"."constructID"="con"."ID" WHERE "con"."producedByID" IS NOT NULL AND "qcRec"."statusOverView" LIKE 'Passed' GROUP BY "con"."producedByID") p
          ON "a"."producedByID"="p"."producedByID"
          )) pass
          
          INNER JOIN
          
          (SELECT "a"."producedByID", failCount FROM ((SELECT DISTINCT "construct"."producedByID" FROM construct GROUP BY "construct"."producedByID" HAVING "construct"."producedByID" IS NOT NULL) a
          LEFT JOIN
          (SELECT "con"."producedByID", COUNT("qcRec"."ID") AS failCount FROM qc_record "qcRec" INNER JOIN construct "con" ON "qcRec"."constructID"="con"."ID" WHERE "con"."producedByID" IS NOT NULL AND "qcRec"."statusOverView" LIKE 'Failed' GROUP BY "con"."producedByID") f
          ON "a"."producedByID"="f"."producedByID"
          )) fail
          ON "pass"."producedByID"="fail"."producedByID"
          ) ORDER BY COALESCE(failCount, 0)/(CASE WHEN passCount IS NULL THEN 1 ELSE passCount END+CASE WHEN failCount IS NULL THEN 0 ELSE failCount END) DESC LIMIT ${limit}
      `)
      
      qcRecord = Array.from(qcRecord).map((data: any)=>({
        userID_usersProducer: data.userID_usersProducer, 
        passAmount: parseInt(data.passAmount), 
        failAmount: parseInt(data.failAmount), 
        allAmount: parseInt(data.allAmount), 
        nameSur: data.nameSur
      }))

      return {error: false, message: `get qc most fail ${limit} record complete.`, data: qcRecord}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async productTopSale(limit: number): Promise<Object>{
    try{
      if (!limit) throw new Error("invalid limit data.")

      const construct = await this.constructRepository.createQueryBuilder("con")
      .select("COUNT(con.ID)", "count")
      .addSelect("item.ID", "itemID")
      .addSelect("item.name", "itemName")
      .innerJoin("con.item", "item")
      .where("con.status = :status", {status: "sale"})
      .groupBy("item.ID")
      .orderBy("count", "DESC")
      .take(limit)
      .getRawMany()

      return {error: false, message: `get product top sale ${limit} record complete.`, data: construct.map(data=>({...data, count: parseInt(data.count)}))}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async eachQcPassFailCount(): Promise<Object>{
    try{
      const passed = await this.qcRecordStatusRepository.createQueryBuilder("status")
      .select("COUNT(status.ID)", "count")
      .addSelect("main.testName", "qcMainName")
      .innerJoin("status.qcMain", "main")
      .where("status.status = :status", {status: "Passed"})
      .groupBy("main.ID")
      .orderBy("count", "DESC")
      .getRawMany()

      const failed = await this.qcRecordStatusRepository.createQueryBuilder("status")
      .select("COUNT(status.ID)", "count")
      .addSelect("main.testName", "qcMainName")
      .innerJoin("status.qcMain", "main")
      .where("status.status = :status", {status: "Failed"})
      .groupBy("main.ID")
      .orderBy("count", "DESC")
      .getRawMany()

      const all = await this.qcRecordStatusRepository.createQueryBuilder("status")
      .select("COUNT(status.ID)", "count")
      .addSelect("main.testName", "qcMainName")
      .innerJoin("status.qcMain", "main")
      .groupBy("main.ID")
      .orderBy("count", "DESC")
      .getRawMany()

      let passValue = {}, failValue = {}, allValue = {}
      for (let data of passed){
        passValue[data.qcMainName] = parseInt(data.count)
      }
      for (let data of failed){
        failValue[data.qcMainName] = parseInt(data.count)
      }
      for (let data of all){
        allValue[data.qcMainName] = parseInt(data.count)
      }

      return {error: false, message: `get each QC pass fail count complete.`, data: {passed: passValue, failed: failValue, all: allValue}}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async productDemand(): Promise<Object>{
    try{

      const demands = await this.productionPlanRepository.createQueryBuilder("plan")
      .select(["plan.ID", "lot.ID", "sub.ID", "fmProject.ID", "toItem.ID", "fmItem.ID", "item.ID", "toItem.name", "sub.amountRequire", "sub.amountCurrent", 
        "item.name", "fmItem.amount"])
      .innerJoin("plan.productionLot", "lot")
      .innerJoin("lot.productionSub", "sub")
      .innerJoin("sub.formulaProject", "fmProject")
      .innerJoin("fmProject.toItem", "toItem")
      .innerJoin("fmProject.formulaItem", "fmItem")
      .innerJoin("fmItem.item", "item")
      .where(":today BETWEEN plan.startDate AND plan.endDate", {today: moment().tz("Asia/Bangkok").format("YYYY-MM-DDTHH:mm:ss")})
      .getMany()

      let productDemand = {}
      let materialDemand = {}
      for (let demand of demands){
        for (let lot of demand.productionLot){
          for (let sub of lot.productionSub){
            // console.log(sub.amountRequire, sub.amountCurrent, "=", sub.amountRequire - sub.amountCurrent, sub.formulaProject.toItem.name)
            if (productDemand[sub.formulaProject.toItem.ID]?.name) productDemand[sub.formulaProject.toItem.ID] = {
              name: sub.formulaProject.toItem.name,
              amount: productDemand[sub.formulaProject.toItem.ID].amount + sub.amountRequire - sub.amountCurrent
            }
            else productDemand[sub.formulaProject.toItem.ID] = {
              name: sub.formulaProject.toItem.name,
              amount: sub.amountRequire - sub.amountCurrent
            }

            for (let fmItem of sub.formulaProject.formulaItem) {
              // console.log(fmItem.item.name, fmItem.amount, fmItem.item.ID)
              if (materialDemand[fmItem.item.ID]?.name) materialDemand[fmItem.item.ID] = {
                name: fmItem.item.name,
                amount: materialDemand[fmItem.item.ID].amount + (fmItem.amount * (sub.amountRequire - sub.amountCurrent))
              }
              else materialDemand[fmItem.item.ID] = {
                name: fmItem.item.name,
                amount: fmItem.amount * (sub.amountRequire - sub.amountCurrent)
              }
            }
          }
        }
      }

      return {error: false, message: `get product and material demand complete.`, data: {product: productDemand, material: materialDemand}}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async statement(): Promise<Object>{
    try{
      const expense = await this.bankRepository.createQueryBuilder("bank")
      .select(`SUM(bank.value)`, "value")
      .addSelect(`DATE_PART('year', bank.createdAt)`, "year")
      .addSelect(`DATE_PART('month', bank.createdAt)`, "month")
      .addSelect(`DATE_PART('day', bank.createdAt)`, "day")
      .where("bank.type = :type", {type: 0})
      .orderBy("year", "ASC")
      .addOrderBy("month", "ASC")
      .addOrderBy("day", "ASC")
      .groupBy(`DATE_PART('year', bank.createdAt)`)
      .addGroupBy(`DATE_PART('month', bank.createdAt)`)
      .addGroupBy(`DATE_PART('day', bank.createdAt)`)
      .getRawMany()

      const income = await this.bankRepository.createQueryBuilder("bank")
      .select(`SUM(bank.value)`, "value")
      .addSelect(`DATE_PART('year', bank.createdAt)`, "year")
      .addSelect(`DATE_PART('month', bank.createdAt)`, "month")
      .addSelect(`DATE_PART('day', bank.createdAt)`, "day")
      .where("bank.type = :type", {type: 1})
      .orderBy("year", "ASC")
      .addOrderBy("month", "ASC")
      .addOrderBy("day", "ASC")
      .groupBy(`DATE_PART('year', bank.createdAt)`)
      .addGroupBy(`DATE_PART('month', bank.createdAt)`)
      .addGroupBy(`DATE_PART('day', bank.createdAt)`)
      .getRawMany()

      const newExpense = {}
      const newIncome = {}
      
      for (let data of expense){
        if (!newExpense[data.year]) newExpense[data.year] = {[data.month]: {[data.day]: parseFloat(data.value)}}
        else newExpense[data.year][data.month] = {...newExpense[data.year][data.month], [data.day]: parseFloat(data.value)}
      }
      for (let data of income){
        if (!newIncome[data.year]) newIncome[data.year] = {[data.month]: {[data.day]: parseFloat(data.value)}}
        else newIncome[data.year][data.month] = {...newIncome[data.year][data.month], [data.day]: parseFloat(data.value)}
      }
      const total = JSON.parse(JSON.stringify(newIncome))
      for (let y of Object.keys(newExpense)){
        for (let m of Object.keys(newExpense[y])){
          for (let d of Object.keys(newExpense[y][m])){
            total[y][m] = total[y][m] ? {...total[y][m], [d]: total[y][m][d] || 0 - newExpense[y][m][d]} : {[d]: 0 - newExpense[y][m][d]}
          }
        }
      }

      return {error: false, message: `get statement complete.`, data: {expense: newExpense, income: newIncome, total: total}}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async picknpayCount(limit: number, filter: string): Promise<Object>{
    try{
      if (!["month", "year", "all"].includes(filter)) filter = "month"
      const currentTime = new Date()
      const past = new Date()
      if (filter === "month") past.setMonth(past.getMonth()-1)
      else if (filter === "year") past.setFullYear(past.getFullYear()-1)
      else past.setTime(0)

      const picknpay = await this.picknpayGoodsRepository.createQueryBuilder("picknpay")
      .select("item.ID", "itemID")
      .addSelect("item.name", "itemName")
      .addSelect("SUM(picknpay.amount)", "amount")
      .innerJoin("picknpay.item", "item")
      .where("picknpay.status = :status", {status: "fin"})
      .andWhere("picknpay.updatedAt BETWEEN :past AND :current", {past: past, current: currentTime})
      .groupBy("item.ID")
      .orderBy("amount", "DESC")
      .limit(limit)
      .getRawMany()
      
      return {error: false, message: "get pick&pay count complete", data: picknpay}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async topWorker(limit: number): Promise<Object>{
    try{
      const construct = await this.constructRepository.createQueryBuilder("con")
      .select("COUNT(con.ID)", "count")
      .addSelect("producedBy.ID", "ID")
      .addSelect("producedBy.name", "name")
      .addSelect("producedBy.surname", "surname")
      .innerJoin("con.producedBy", "producedBy")
      .groupBy("producedBy.ID")
      .orderBy("count", "DESC")
      .limit(limit)
      .getRawMany()
      
      return {error: false, message: "get top worker complete", data: construct}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }
}
