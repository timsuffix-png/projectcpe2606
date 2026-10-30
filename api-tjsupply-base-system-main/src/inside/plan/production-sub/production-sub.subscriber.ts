import { DataSource, EntitySubscriberInterface, EventSubscriber, InsertEvent, Repository, UpdateEvent } from "typeorm";
import { ProductionSub } from "./entities/production-sub.entity";
import { HttpException, HttpStatus, Logger } from "@nestjs/common";
import * as moment from "moment-timezone"
import * as cryptoJS from "crypto-js"
import { ItemModel } from "src/inside/etc/item-model/entities/item-model.entity";
import { Counter } from "src/inside/etc/counter/entities/counter.entity";
import { FormulaProject } from "src/inside/formula/formula-project/entities/formula-project.entity";
import { Construct } from "src/inside/constructs/construct/entities/construct.entity";
import { ProductionLot } from "../production-lot/entities/production-lot.entity";
import { ProductionPlan } from "../production-plan/entities/production-plan.entity";

@EventSubscriber()
export class ProductionSubSubscriber implements EntitySubscriberInterface<ProductionSub>{
  private logger = new Logger()

  constructor(private dataSource: DataSource) {
    dataSource.subscribers.push(this)
  }

  listenTo(): Function | string {
    return ProductionSub
  }

  async afterInsert(event: InsertEvent<ProductionSub>): Promise<any>{
    try{
      // var counter = await this.counterRepository.findOne({where: {ID: 1}, lock: {mode: "pessimistic_write"}})
      // let dataSource: DataSource
      await this.dataSource.transaction(async (transactionalEntityManager) => {
        /*
  
        SN         คงที่ “SN” 2 หลัก
        YYYY     ปีที่ผลิต 4 หลัก
        MM        เดือนที่ผลิต 2 หลัก
        DD         วันที่ผลิต 2 หลัก
        PP          รหัสโปรดักส์ 2 หลัก
        MO         รหัสโมเดล 2 หลัก
        RRRR      รันนิ่งนัมเบอร์ 4 หลัก
        BB           รหัสสาขา 2 หลัก
  
        */
  
        const currentTime = moment().tz("Asia/Bangkok")
  
        const SN = Number(99).toString().padStart(2, "0")
        const YYYY = (currentTime.year()).toString()
        const MM = (currentTime.month()+1).toString().padStart(2, "0")
        const DD = (currentTime.date()).toString().padStart(2, "0")
        
        // get item id then query itemID in itemModel
        const itemID = await transactionalEntityManager.getRepository(FormulaProject).createQueryBuilder("project")
        .select(["project.ID", "item.ID"])
        .innerJoin("project.toItem", "item")
        .where("project.ID = :id", {id: event.entity.formulaProject})
        .getOne()
  
        const itemModel = await transactionalEntityManager.getRepository(ItemModel).createQueryBuilder("itemModel")
        .select(["itemModel.ID"])
        .innerJoin("itemModel.item", "item")
        .where("item.ID = :itemID", {itemID: itemID.toItem["ID"]})
        .getOne()
  
        if (itemModel === null) throw new Error("PPMO is null")
  
        const PPMO = itemModel.ID.toString().padStart(4, "0")
  
        // var counter = await this.counterRepository.findOne({where: {ID: 1}})
        const counter = await transactionalEntityManager.getRepository(Counter).createQueryBuilder()
        .setLock("pessimistic_write")
        .getOne()
        const RRRR = counter.itemCountPerDay
        counter.itemCountPerDay += event.entity.amountRequire
        await transactionalEntityManager.save(counter)
  
        const BB = Number(1).toString().padStart(2, "0")
  
        var buffer = []
  
        for (let i = RRRR+1; i<=RRRR+event.entity.amountRequire; i++){
          const serialNumber = SN+YYYY+MM+DD+PPMO+i.toString().padStart(4, "0")+BB
          const encryptIDValue = cryptoJS.AES.encrypt(serialNumber, process.env.SECRET_KEY || "Please specify SECRET_KEY in .env file (this will be use by default).").toString()
          buffer.push({ID: serialNumber, encryptIDValue: encryptIDValue, item: itemID.toItem["ID"], productionSub: event.entity.ID})
        }
        await transactionalEntityManager.createQueryBuilder().insert().into(Construct).values(buffer).execute()
      })
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async afterUpdate(event: UpdateEvent<ProductionSub>): Promise<any> {
    try{
      await this.dataSource.transaction(async (transactionEntityManager) => {
        // console.log(event.entity)
        // { ID: '6e968b72-f1b5-41ce-94a1-34c30623e8df', amountCurrent: 4 }
        const productionSub = await transactionEntityManager.getRepository(ProductionSub).createQueryBuilder("sub")
        .innerJoinAndSelect("sub.productionLot", "lot")
        .innerJoinAndSelect("lot.productionPlan", "plan")
        .where("sub.ID = :id", {id: event.entity.ID})
        .getOne()
        // console.log(productionSub)
        /*
        ProductionSub {
          ID: '6e968b72-f1b5-41ce-94a1-34c30623e8df',
          amountRequire: 30,
          amountCurrent: 5,
          lot: ProductionLot {
            ID: '1fbc8f09-3bcd-4e76-a075-6d4ce44bf311',
            name: 'This is the lot name 2',
            plan: ProductionPlan {
              ID: 'ae70b54b-7453-49c9-984d-959d4ed35e46',
              planName: 'This plan use to create robot',
              startDate: 2023-09-19T17:00:00.000Z,
              endDate: 2024-09-19T17:00:00.000Z,
              detail: 'This is some detail',
              status: 'open',
              createdAt: '2024-07-20T21:33:53'
            }
          }
        }
        */
        const planID = productionSub.productionLot["productionPlan"]["ID"]
        // console.log(planID)
        const productionLot = await transactionEntityManager.getRepository(ProductionLot).createQueryBuilder("lot")
        .innerJoinAndSelect("lot.productionSub", "sub")
        .innerJoinAndSelect("lot.productionPlan", "plan")
        .where("plan.ID = :planID", {planID})
        .setLock("pessimistic_partial_write")
        .getMany()
        // console.log(productionLot)
        /*
        [
          ProductionLot {
            ID: '1fbc8f09-3bcd-4e76-a075-6d4ce44bf311',
            name: 'This is the lot name 2',
            sub: [ [ProductionSub] ],
            plan: ProductionPlan {
              ID: 'ae70b54b-7453-49c9-984d-959d4ed35e46',
              planName: 'This plan use to create robot',
              startDate: 2023-09-19T17:00:00.000Z,
              endDate: 2024-09-19T17:00:00.000Z,
              detail: 'This is some detail',
              status: 'open',
              createdAt: '2024-07-20T21:33:53'
            }
          }
        ]
        */
        if (productionLot[0].productionPlan["status"] !== "open") return

        var subsInLot = 0
        var finishCount = 0

        for (let lotData of productionLot) {
          subsInLot += lotData.productionSub.length
          /*
          [
            ProductionSub {
              ID: '6e968b72-f1b5-41ce-94a1-34c30623e8df',
              amountRequire: 30,
              amountCurrent: 11
            }
          ]
          */
          for (let productionSub of lotData.productionSub){
            if (productionSub["amountRequire"] === productionSub["amountCurrent"]) finishCount += 1
          }
        }
        // if something to update plan status
        if (subsInLot === finishCount) {
          await transactionEntityManager.createQueryBuilder()
          .update(ProductionPlan)
          .set({status: "finish"})
          .where("ID = :planID", {planID})
          .execute()
        }
      })
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }
}