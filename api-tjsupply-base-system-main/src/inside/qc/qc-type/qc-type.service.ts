import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateQcTypeDto } from './dto/create-qc-type.dto';
import { UpdateQcTypeDto } from './dto/update-qc-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { QcType } from './entities/qc-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QcTypeService {
  private logger = new Logger()

  constructor(
    @InjectRepository(QcType) private qcTypeRepository: Repository<QcType>
  ) {}
  
  async create(createQcTypeDto: CreateQcTypeDto): Promise<Object> {
    try{
      const qcType = await this.qcTypeRepository.createQueryBuilder()
      .insert()
      .into(QcType)
      .values(createQcTypeDto)
      .execute()

      return {error: false, message: "Add qc type complete.", data: qcType.identifiers}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async findAll(limit: number, page: number): Promise<Object> {
    try{
      const [qcTypes, count] = await this.qcTypeRepository.createQueryBuilder()
      .take(limit)
      .skip((page-1)*limit)
      .getManyAndCount()

      return {error: false, message: "Get all qc type complete.", data: qcTypes, allPage: Math.ceil(count/limit)}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async findOne(qcTypeID: string): Promise<Object> {
    try{
      const qcType = await this.qcTypeRepository.createQueryBuilder("qcType")
      .where("qcType.ID = :qcTypeID", {qcTypeID})
      .getOne()
    
      if (!qcType) throw new Error("Invalid qc type ID.")

      return {error: false, message: "Get qc type detail complete.", data: qcType}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async update(qcTypeID: string, updateQcTypeDto: UpdateQcTypeDto): Promise<Object> {
    try{
      await this.qcTypeRepository.createQueryBuilder()
      .update(QcType)
      .set(updateQcTypeDto)
      .where("ID = :qcTypeID", {qcTypeID})
      .execute()

      return {error: false, message: "Update qc type complete."}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async remove(qcTypeID: string): Promise<Object> {
    try{
      await this.qcTypeRepository.delete(qcTypeID)

      return {error: false, message: `delete qc type with ID#${qcTypeID} complete.`}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }
}
