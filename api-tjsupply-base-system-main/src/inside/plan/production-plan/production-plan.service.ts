import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateProductionPlanDto } from './dto/create-production-plan.dto';
import { UpdateProductionPlanDto } from './dto/update-production-plan.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductionPlan } from './entities/production-plan.entity';
import { Repository } from 'typeorm';
import { ProductionLot } from '../production-lot/entities/production-lot.entity';
import { ProductionSub } from '../production-sub/entities/production-sub.entity';
import { Construct } from 'src/inside/constructs/construct/entities/construct.entity';

@Injectable()
export class ProductionPlanService {
  private logger = new Logger()

  constructor(
    @InjectRepository(ProductionPlan) private productionPlanRepository: Repository<ProductionPlan>,
    @InjectRepository(ProductionLot) private productionLotRepository: Repository<ProductionLot>,
    @InjectRepository(ProductionSub) private productionSubRepository: Repository<ProductionSub>,
    @InjectRepository(Construct) private constructRepository: Repository<Construct>
  ) {}

  async create(createProductionPlanDto: CreateProductionPlanDto): Promise<Object> {
    try{
      const productionPlan = await this.productionPlanRepository.createQueryBuilder()
      .insert()
      .into(ProductionPlan)
      .values(createProductionPlanDto)
      .execute()

      if (!createProductionPlanDto.productionLot) return {error: false, message: "add plan complete."}

      const lotData = createProductionPlanDto.productionLot.map(data=>({...data, productionPlan: productionPlan.identifiers[0].ID}))
      
      const productionLot = await this.productionLotRepository.createQueryBuilder()
      .insert()
      .into(ProductionLot)
      .values(lotData)
      .execute()

      var productionSubData = []

      for (let lot of lotData){
        for (let subData of lot.productionSub.map(data=>({...data, productionLot: lot.ID}))){
          productionSubData.push(subData)
        }
      }

      const productionSub = await this.productionSubRepository.createQueryBuilder()
      .insert()
      .into(ProductionSub)
      .values(productionSubData)
      .execute()

      return {error: false, message: "add plan complete.", data: {
        productionPlan: productionPlan.identifiers, 
        productionLot: productionLot.identifiers, 
        productionSub: productionSub.identifiers
      }}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async findAll(): Promise<Object> {
    try{
      const productionPlans = await this.productionPlanRepository.createQueryBuilder("plan")
      .leftJoinAndSelect("plan.productionLot", "lot")
      .leftJoinAndSelect("lot.productionSub", "sub")
      .leftJoinAndSelect("sub.formulaProject", "formula")
      .leftJoinAndSelect("formula.toItem", "item")
      .where(`plan.status = 'open'`)
      .orderBy("plan.startDate", "ASC")
      .addOrderBy("lot.name", "ASC")
      .addOrderBy("item.name", "ASC")
      .getMany()

      return {error: false, message: "get current plan complete.", data: productionPlans}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async findAllHistory(limit: number, page: number): Promise<Object> {
    try{
      const [productionPlans, count] = await this.productionPlanRepository.createQueryBuilder("plan")
      .where("plan.status = 'finish'")
      .orderBy("plan.createdAt", "DESC")
      .take(limit)
      .skip((page-1)*limit)
      .getManyAndCount()

      return {error: false, message: "get current plan complete.", data: productionPlans, allPage: Math.ceil(count/limit)}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async findBarcodeByPlanID(planID: string, limit: number, page: number): Promise<Object> {
    try{
      const [constructs, count] = await this.constructRepository.createQueryBuilder("construct")
      .select(["construct.ID", "construct.encryptIDValue"])
      .innerJoin("construct.productionSub", "sub")
      .innerJoin("sub.productionLot", "lot")
      .innerJoin("lot.productionPlan", "plan")
      .where("plan.ID = :planID", {planID})
      .take(limit)
      .skip((page-1)*limit)
      .getManyAndCount()

      if (!constructs.length) throw new Error("invalid plan id")

      return {error: false, message: "Get all serial number in planID complete.", data: constructs, allPage: Math.ceil(count/limit)}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async findOne(id: string): Promise<Object> {
    try{
      const productionPlan = await this.productionPlanRepository.createQueryBuilder("plan")
      .leftJoinAndSelect("plan.productionLot", "lot")
      .leftJoinAndSelect("lot.productionSub", "sub")
      .leftJoinAndSelect("sub.formulaProject", "formula")
      .leftJoinAndSelect("formula.toItem", "item")
      .where("plan.ID = :id", {id})
      .getOne()

      if (!productionPlan) throw new Error("Invalid production plan id.")
      
      return {error: false, message: "get current plan complete.", data: productionPlan}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async remove(id: string): Promise<Object> {
    try{
      await this.productionPlanRepository.delete(id)

      return {error: false, message: "delete plan complete."}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }
}
