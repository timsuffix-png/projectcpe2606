import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateProductionLotDto } from './dto/create-production-lot.dto';
import { UpdateProductionLotDto } from './dto/update-production-lot.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductionLot } from './entities/production-lot.entity';
import { Repository } from 'typeorm';
import { ProductionPlan } from '../production-plan/entities/production-plan.entity';
import { ProductionSub } from '../production-sub/entities/production-sub.entity';

@Injectable()
export class ProductionLotService {
  private logger = new Logger()

  constructor(
    @InjectRepository(ProductionLot) private productionLotRepository: Repository<ProductionLot>,
    @InjectRepository(ProductionPlan) private productionPlanRepository: Repository<ProductionPlan>,
    @InjectRepository(ProductionSub) private productionSubRepository: Repository<ProductionSub>
  ) {}
  async create(createProductionLotDto: CreateProductionLotDto): Promise<Object> {    
    try{
      const productionLot = await this.productionLotRepository.createQueryBuilder()
      .insert()
      .into(ProductionLot)
      .values(createProductionLotDto)
      .execute()

      if (!createProductionLotDto.productionSub) return {error: false, message: "add lot in plan complete."}

      const productionSub = await this.productionSubRepository.createQueryBuilder()
      .insert()
      .into(ProductionSub)
      .values(createProductionLotDto.productionSub.map(data=>({...data, productionLot: productionLot.identifiers[0].ID})))
      .execute()

      return {error: false, message: "add lot in plan with detail complete.", data: {productionLot: productionLot.identifiers, productionSub: productionSub.identifiers}}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async findOneByPlan(id: string): Promise<Object> {
    try{
      const productionLots = await this.productionPlanRepository.createQueryBuilder("plan")
      .select(["plan.ID", "lot.ID", "lot.name"])
      .innerJoinAndSelect("plan.productionLot", "lot")
      .where("plan.ID = :id", {id})
      .getOne()
      
      if (!productionLots) throw new Error("Invalid plan id.")

      return {error: false, message: "get lot in plan complete.", data: productionLots}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async remove(id: string): Promise<Object> {
    try{
      await this.productionLotRepository.delete(id)

      return {error: false, message: "delete lot in plan complete."}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }
}
