import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateConstructDto } from './dto/create-construct.dto';
import { UpdateConstructPerPieceDto } from './dto/update-construct-per-piece.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Construct } from './entities/construct.entity';
import { DataSource, Repository } from 'typeorm';
import { UsersProducer } from '../../user/entities/usersProducer.entity';
import { UpdateConstructPerLotDto } from './dto/update-construct-per-lot.dto';
import { ProductionLot } from '../../plan/production-lot/entities/production-lot.entity';
import * as moment from 'moment-timezone';
import { Item } from '../../items/item/entities/item.entity';
import { Bank } from 'src/inside/etc/bank/entities/bank.entity';

@Injectable()
export class ConstructService {
  private logger = new Logger()

  constructor(
    @InjectRepository(Construct) private constructRepository: Repository<Construct>,
    @InjectRepository(UsersProducer) private usersProducerRepository: Repository<UsersProducer>,
    @InjectRepository(ProductionLot) private productionLot: Repository<ProductionLot>,
    @InjectRepository(Item) private itemRepository: Repository<Item>,
    @InjectRepository(Bank) private bankRepository: Repository<Bank>,
    private dataSource: DataSource
  ) {}

  async findAll(limit: number, page: number, like: string): Promise<Object> {
    try{
      const [constructs, count] = await this.constructRepository.createQueryBuilder("con")
      .select(["con.ID", "con.createdAt", "con.updatedAt", "con.status", "item.ID", "item.name", "producedBy.ID", "sub.ID", "lot.ID", "lot.name", "plan.ID", "plan.planName"])
      .innerJoin("con.item", "item")
      .leftJoin("con.producedBy", "producedBy")
      .innerJoin("con.productionSub", "sub")
      .innerJoin("sub.productionLot", "lot")
      .innerJoin("lot.productionPlan", "plan")
      .where("con.ID ILIKE :like", {like: like?`%${like}%`:`%`})
      .orderBy("con.updatedAt", "DESC")
      .take(limit)
      .skip((page-1)*limit)
      .getManyAndCount()

      return {error: false, message: "get construct list complete.", data: constructs, allPage: Math.ceil(count/limit)}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async findAllByCurrentDate(limit: number, page: number, like: string): Promise<Object> {
    try{
      const [constructs, count] = await this.constructRepository.createQueryBuilder("con")
      .select(["con.ID", "con.createdAt", "con.updatedAt", "con.status", "item.ID", "item.name", "producedBy.ID", "sub.ID", "lot.ID"])
      .innerJoin("con.item", "item")
      .leftJoin("con.producedBy", "producedBy")
      .innerJoin("con.productionSub", "sub")
      .innerJoin("sub.productionLot", "lot")
      .innerJoin("lot.productionPlan", "plan")
      .where(":currentTime BETWEEN plan.startDate AND plan.endDate", {currentTime: moment().tz("Asia/Bangkok").format("YYYY-MM-DDTHH:mm:ss")})
      .orderBy("con.updatedAt", "ASC")
      .take(limit)
      .skip((page-1)*limit)
      .getManyAndCount()

      const waitingCount = await this.constructRepository.createQueryBuilder("con")
      .select(["con.ID", "con.createdAt", "con.updatedAt", "con.status", "item.ID", "item.name", "producedBy.ID", "sub.ID", "lot.ID"])
      .innerJoin("con.item", "item")
      .leftJoin("con.producedBy", "producedBy")
      .innerJoin("con.productionSub", "sub")
      .innerJoin("sub.productionLot", "lot")
      .innerJoin("lot.productionPlan", "plan")
      .where(`con.status = 'waiting'`)
      .andWhere(":currentTime BETWEEN plan.startDate AND plan.endDate", {currentTime: moment().tz("Asia/Bangkok").format("YYYY-MM-DDTHH:mm:ss")})
      .getCount()

      return {error: false, message: "get construct list complete.", data: constructs, count: {waiting: waitingCount, finish: count-waitingCount}, allPage: Math.ceil(count/limit)}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async findOne(serialNumber: string): Promise<Object> {
    try{
      const construct = await this.constructRepository.createQueryBuilder("con")
      .select(["con.ID", "sub.ID", "lot.ID", "lot.name", "toItem.ID", "toItem.itemType", "toItem.costPrice", "toItem.insurancePeriod", "toItem.name", "toItem.detail", "formula.ID",
        "formula.name", "formula.costFormula", "formulaItem.ID", "formulaItem.amount", "fromItem.ID", "fromItem.name"
      ])
      .innerJoin("con.productionSub", "sub")
      .innerJoin("sub.productionLot", "lot")
      .innerJoin("sub.formulaProject", "formula")
      .innerJoin("formula.formulaItem", "formulaItem")
      .innerJoin("formulaItem.item", "fromItem")
      .innerJoin("con.item", "toItem")
      .where("con.ID = :serialNumber", {serialNumber})
      .getOne()
      
      if (!construct) throw new Error("serial number invalid.")

      return {error: false, message: "get construct detail complete.", data: construct}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async findOneByEncrypt(encryptSerialNumber: string): Promise<Object> {
    try{
      const construct = await this.constructRepository.createQueryBuilder("con")
      .select(["con.ID", "sub.ID", "lot.ID", "lot.name", "toItem.ID", "toItem.itemType", "toItem.costPrice", "toItem.insurancePeriod", "toItem.name", "toItem.detail", "formula.ID",
        "formula.name", "formula.costFormula", "formulaItem.ID", "formulaItem.amount", "fromItem.ID", "fromItem.name"
      ])
      .innerJoin("con.productionSub", "sub")
      .innerJoin("sub.productionLot", "lot")
      .innerJoin("sub.formulaProject", "formula")
      .innerJoin("formula.formulaItem", "formulaItem")
      .innerJoin("formulaItem.item", "fromItem")
      .innerJoin("con.item", "toItem")
      .where("con.encryptIDValue = :encryptSerialNumber", {encryptSerialNumber})
      .getOne()
      
      if (!construct) throw new Error("serial number invalid.")

      return {error: false, message: "get construct detail complete.", data: construct}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async registerProduct(encryptSerialNumber: string): Promise<Object> {
    try{
      const construct = await this.constructRepository.createQueryBuilder("con")
      .select(["con.ID", "con.encryptIDValue", "con.status", "sub.ID", "lot.ID", "lot.name", "toItem.ID", "toItem.amount", "toItem.costPrice", "toItem.salePrice", 
        "toItem.insurancePeriod", "toItem.name", "toItem.detail", "formula.ID", "formula.name", "formula.costFormula", "formulaItem.ID", "formulaItem.amount", 
        "fromItem.ID", "fromItem.name"
      ])
      .innerJoin("con.productionSub", "sub")
      .innerJoin("sub.productionLot", "lot")
      .innerJoin("sub.formulaProject", "formula")
      .innerJoin("formula.formulaItem", "formulaItem")
      .innerJoin("formulaItem.item", "fromItem")
      .innerJoin("con.item", "toItem")
      .where("con.encryptIDValue = :encryptSerialNumber", {encryptSerialNumber})
      .getOne()
      
      if (!construct) throw new Error("serial number invalid.")
      if (construct.status === "sale") throw new Error("This product is already sold out.")

      await this.itemRepository.createQueryBuilder()
      .update(Item)
      .set({amount: construct.item.amount-1})
      .where("ID = :itemID", {itemID: construct.item.ID})
      .execute()

      await this.constructRepository.createQueryBuilder()
      .update(Construct)
      .set({status: "sale"})
      .where("ID = :constructID", {constructID: construct.ID})
      .execute()

      await this.bankRepository.createQueryBuilder()
      .insert()
      .into(Bank)
      .values({type: 1, value: construct.item.salePrice})
      .execute()

      return {error: false, message: "get construct detail complete.", data: construct}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async updatePerPiece(updateConstructDto: UpdateConstructPerPieceDto): Promise<any> {
    try{
      // const construct = await this.constructRepository.findOne({where: {ID: updateConstructDto.serialNumber.ID}})
      // const construct = await this.constructRepository.createQueryBuilder()
      // .where("con.ID = :id", {id: updateConstructDto.serialNumber.ID})
      // .setLock("pessimistic_partial_write")
      // .getOne()
      await this.dataSource.transaction(async (transactionEntityManager)=>{
        const construct = await transactionEntityManager.getRepository(Construct).createQueryBuilder("con")
        .where("con.ID = :id", {id: updateConstructDto.serialNumber})
        .getOne()
        if (!construct) throw new Error("invalid serial number")
      
        const producedBy = await this.usersProducerRepository.findOne({where: {ID: updateConstructDto.producedBy.ID}})
        if (!producedBy) throw new Error("invalid producedBy id")
          
        construct.producedBy = updateConstructDto.producedBy
        construct.status = "finish"
        await this.constructRepository.save(construct)
      })
      return {error: false, message: "Add producedBy complete."}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async updatePerLot(updateConstructDto: UpdateConstructPerLotDto): Promise<Object> {
    try{
      const productionLot = await this.productionLot.findOne({where: {ID: String(updateConstructDto.lot)}})
      if (!productionLot) throw new Error("invalid production lot id")

      const producedBy = await this.usersProducerRepository.findOne({where: {ID: String(updateConstructDto.producedBy)}})
      if (!producedBy) throw new Error("invalid producedBy id")

      const construct = await this.constructRepository.createQueryBuilder("con")
      .innerJoin("con.productionSub", "sub")
      .innerJoin("sub.productionLot", "lot")
      .where("lot.ID = :lotID", {lotID: String(updateConstructDto.lot)})
      .andWhere("con.status != 'finish'")
      .getMany()

      /*
      [
        Construct {
          ID: '99202407230001029001',
          createdAt: '2024-07-23T14:19:29',
          updatedAt: '2024-07-23T14:19:29',
          status: 'waiting'
        }
      ]
      */
      // const something = construct.map(async data => {
      //   await this.constructRepository.createQueryBuilder()
      //   .update(Construct)
      //   // send id through this statement will pass to trigger
      //   .set({ID: data.ID, status: "finish", producedBy: updateConstructDto.producedBy})
      //   .where("ID = :serialNumber", {serialNumber: data.ID})
      //   .execute()
      // })
      // await Promise.all(something)
      // const something = construct.map(async data => {
      //   await this.constructRepository.createQueryBuilder()
      //   .update(Construct)
      //   .set({ID: data.ID, status: "finish", producedBy: updateConstructDto.producedBy})
      //   .where("ID = :serialNumber", {serialNumber: data.ID})
      //   .execute()
      // })
      // for (let i=0; i<construct.length; i+=5){
      //   const batch = construct.slice(i, i+5)
      //   const result = batch.map(async data=>{
      //     await this.constructRepository.createQueryBuilder()
      //     .update(Construct)
      //     .set({ID: data.ID, status: "finish", producedBy: updateConstructDto.producedBy})
      //     .where("ID = :serialNumber", {serialNumber: data.ID})
      //     .execute()
      //   })
        // while (batch[0])
        // console.log(result[0])


        
      //            VERY SLOW
      //      1000 PIECES TOOK ~5 SEC
      //      AND 2000 PIECES TOOK ~8 SEC
      //      THIS TEST ON INTEL CORE I7-11800H NB 2.3GHz
      //          CPU ~15-20% USAGE
      for (let data of construct){
        await this.constructRepository.createQueryBuilder()
        .update(Construct)
        .set({ID: data.ID, status: "finish", producedBy: updateConstructDto.producedBy})
        .where("ID = :serialNumber", {serialNumber: data.ID})
        .execute()
      }
      return {error: false, message: "Add producedBy per lot complete."}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async remove(serialNumber: string): Promise<Object> {
    try{
      await this.constructRepository.delete(serialNumber)
      
      return {error: false, message: "delete construct complete."}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }
}
