import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateProductionSubDto } from './dto/create-production-sub.dto';
import { UpdateProductionSubDto } from './dto/update-production-sub.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductionPlan } from '../production-plan/entities/production-plan.entity';
import { Repository } from 'typeorm';
import { ProductionLot } from '../production-lot/entities/production-lot.entity';
import { ProductionSub } from './entities/production-sub.entity';

@Injectable()
export class ProductionSubService {
  private logger = new Logger()

  constructor(
    @InjectRepository(ProductionLot) private productionLotRepository: Repository<ProductionLot>,
    @InjectRepository(ProductionSub) private productionSubRepository: Repository<ProductionSub>
  ) {}

  async create(createProductionSubDto: CreateProductionSubDto): Promise<Object> {
    try{
      const productionSub = await this.productionSubRepository.createQueryBuilder()
      .insert()
      .into(ProductionSub)
      .values(createProductionSubDto)
      .execute()

      return {error: false, message: "add lot in plan complete.", data: productionSub.identifiers}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async findOneByLot(lotID: string): Promise<Object> {
    try{
      const productionLots = await this.productionLotRepository.createQueryBuilder("lot")
      .select(["lot.ID", "lot.name", "plan.ID", "sub.ID", "sub.amountRequire", "sub.amountCurrent", "formula.ID"])
      .leftJoin("lot.productionPlan", "plan")
      .leftJoin("lot.productionSub", "sub")
      .leftJoin("sub.formulaProject", "formula")
      .where("lot.ID = :id", {id: lotID})
      .getOne()
      
      if (!productionLots) throw new Error("Invalid lot id.")

      return {error: false, message: "get lot detail complete.", data: productionLots}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async remove(subID: string): Promise<Object> {
    try{
      await this.productionSubRepository.delete(subID)

      return {error: false, message: "delete detail in lot complete."}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }
}
