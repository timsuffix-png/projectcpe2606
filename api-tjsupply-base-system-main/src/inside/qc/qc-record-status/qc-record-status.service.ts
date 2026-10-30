import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateQcRecordStatusDto } from './dto/create-qc-record-status.dto';
import { UpdateQcRecordStatusDto } from './dto/update-qc-record-status.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { QcRecordStatus } from './entities/qc-record-status.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QcRecordStatusService {
  private logger = new Logger()

  constructor (
    @InjectRepository(QcRecordStatus) private qcRecordStatusRepository: Repository<QcRecordStatus>
  ) {}

  async create(createQcRecordStatusDto: CreateQcRecordStatusDto): Promise<Object> {
    try{
      const qcRecordStatus = await this.qcRecordStatusRepository.createQueryBuilder()
      .insert()
      .into(QcRecordStatus)
      .values({
        qcRecord: createQcRecordStatusDto.qcRecordID, 
        qcMain: createQcRecordStatusDto.qcMainID, 
        result: createQcRecordStatusDto.result, 
        status: createQcRecordStatusDto.status,
        detail: createQcRecordStatusDto.detail
      })
      .execute()
      
      return {error: false, message: "add test status complete.", data: qcRecordStatus.identifiers}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async findAll(qcRecordID: string, limit: number, page: number, type: string): Promise<Object> {
    try{
      if (!["pass", "fail", "both"].includes(type)) throw new Error("invalid type.")

      const [qcRecordStatus, count] = await this.qcRecordStatusRepository.createQueryBuilder("status")
      .select(["record.ID", "main.ID", "main.testName", "main.detail", "status.ID", "status.result", "status.status", "status.detail", "status.createdAt"])
      .innerJoin("status.qcRecord", "record")
      .innerJoin("status.qcMain", "main")
      .where("record.ID = :qcRecordID", {qcRecordID})
      .andWhere("status.status LIKE :status", {status: type==="pass"?"Passed":type==="fail"?"Failed":"%"})
      .take(limit)
      .skip((page-1)*limit)
      .getManyAndCount()
      
      return {error: false, message: "get detail record status by qcProjectID complete.", data: qcRecordStatus, allPage: Math.ceil(count/limit)}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async remove(qcRecordStatusID: string): Promise<Object> {
    try{
      await this.qcRecordStatusRepository.delete(qcRecordStatusID)
      
      return {error: false, message: `delete qc detail result with ID#${qcRecordStatusID} complete.`}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }
}
