import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateQcMainDto } from './dto/create-qc-main.dto';
import { UpdateQcMainDto } from './dto/update-qc-main.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { QcMain } from './entities/qc-main.entity';
import { Repository } from 'typeorm';
import { QcScript } from '../qc-script/entities/qc-script.entity';

@Injectable()
export class QcMainService {
  private logger = new Logger()

  constructor(
    @InjectRepository(QcMain) private qcMainRepository: Repository<QcMain>,
    @InjectRepository(QcScript) private qcScriptRepository: Repository<QcScript>
  ) {}

  async create(createQcMainDto: CreateQcMainDto): Promise<Object> {
    try{
      createQcMainDto.testName = createQcMainDto.testName.trim().replaceAll(" ", "_")

      const qcMain = await this.qcMainRepository.createQueryBuilder()
      .insert()
      .into(QcMain)
      .values(createQcMainDto)
      .execute()

      if (createQcMainDto.script){
        const qcScript = await this.qcScriptRepository.createQueryBuilder()
        .insert()
        .into(QcScript)
        .values({qcMain: qcMain.identifiers[0].ID, script: createQcMainDto.script})
        .execute()

        return {error: false, message: "add qc main complete.", data: {qcMain: qcMain.identifiers, qcScript: qcScript.identifiers}}
      }
      else {
        return {error: false, message: "add qc main complete.", data: qcMain.identifiers}
      }
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async findAll(limit: number, page: number): Promise<Object> {
    try{
      const [qcMains, count] = await this.qcMainRepository.createQueryBuilder("main")
      .select(["main.ID", "main.testName", "main.detail", "type.ID", "type.name"])
      .innerJoin("main.qcType", "type")
      .take(limit)
      .skip((page-1)*limit)
      .getManyAndCount()

      return {error: false, message: "get all qc main complete.", data: qcMains, allPage: Math.ceil(count/limit)}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async findOne(qcMainID: string): Promise<Object> {
    try{
      const qcMain = await this.qcMainRepository.createQueryBuilder("main")
      .select(["main.ID", "main.testName", "main.detail", "type.ID", "type.name", "script.ID", "script.script"])
      .innerJoin("main.qcType", "type")
      .leftJoin("main.qcScript", "script")
      .where("main.ID = :qcMainID", {qcMainID})
      .getOne()

      if (!qcMain) throw new Error("invalid qc main id.")

      return {error: false, message: "get specific qc main complete.", data: qcMain}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async update(qcMainID: string, updateQcMainDto: UpdateQcMainDto): Promise<Object> {
    try{
      await this.qcMainRepository.createQueryBuilder()
      .update(QcMain)
      .set({testName: updateQcMainDto.testName, detail: updateQcMainDto.detail})
      .where("ID = :qcMainID", {qcMainID})
      .execute()

      if (updateQcMainDto.script){
        await this.qcScriptRepository.createQueryBuilder()
        .update(QcScript)
        .set({script: updateQcMainDto.script})
        .where("qcMain = :qcMainID", {qcMainID})
        .execute()
      }

      return {error: false, message: `update qc main complete.`}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async remove(qcMainID: string): Promise<Object> {
    try{
      await this.qcMainRepository.delete(qcMainID)

      return {error: false, message: `delete qc main with id#${qcMainID} complete.`}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }
}
