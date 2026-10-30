import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateRepairDto } from './dto/create-repair.dto';
import { UpdateRepairDto } from './dto/update-repair.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repair } from './entities/repair.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RepairService {
  private logger = new Logger()

  constructor (
    @InjectRepository(Repair) private repairRepository: Repository<Repair>
  ) {}

  async create(createRepairDto: CreateRepairDto): Promise<Object> {
    try{
      const repair = await this.repairRepository.createQueryBuilder()
      .insert()
      .into(Repair)
      .values({repairBy: createRepairDto.repairBy, construct: createRepairDto.construct})
      .execute()

      return {error: false, message: "Add item to be repair complete.", data: repair.identifiers}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async findAll(limit: number, page: number): Promise<Object> {
    try{
      const [repairs, count] = await this.repairRepository.createQueryBuilder("repair")
      .select(["repair.ID", "repair.createdAt", "repairBy.ID", "repairBy.name", "repairBy.surname", "con.ID"])
      .innerJoin("repair.repairBy", "repairBy")
      .innerJoin("repair.construct", "con")
      .take(limit)
      .skip((page-1)*limit)
      .getManyAndCount()
      
      return {error: false, message: "Get all repair item complete.", data: repairs, allPage: Math.ceil(count/limit)}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async findOne(repairID: string): Promise<Object> {
    try{
      const repair = await this.repairRepository.createQueryBuilder("repair")
      .select(["repair.ID", "repair.createdAt", "repairBy.ID", "repairBy.name", "repairBy.surname", "con.ID"])
      .innerJoin("repair.repairBy", "repairBy")
      .innerJoin("repair.construct", "con")
      .where("repair.ID = :repairID", {repairID})
      .getOne()

      if (!repair) throw new Error("Invalid repairID.")
      
      return {error: false, message: "Get repair item detail complete.", data: repair}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async findAllByConstructID(constructID: string): Promise<Object> {
    try{
      const repair = await this.repairRepository.createQueryBuilder("repair")
      .select(["repair.ID", "repair.createdAt", "repairBy.ID", "repairBy.name", "repairBy.surname", "con.ID"])
      .innerJoin("repair.repairBy", "repairBy")
      .innerJoin("repair.construct", "con")
      .where("con.ID = :constructID", {constructID})
      .getMany()

      if (!repair) throw new Error("Invalid constructID.")
      
      return {error: false, message: "Get repair item detail complete.", data: repair}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }
}
