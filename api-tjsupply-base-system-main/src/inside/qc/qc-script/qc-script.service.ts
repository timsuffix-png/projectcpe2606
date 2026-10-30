import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateQcScriptDto } from './dto/create-qc-script.dto';
import { UpdateQcScriptDto } from './dto/update-qc-script.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { QcScript } from './entities/qc-script.entity';
import { Repository } from 'typeorm';
import { QcMain } from '../qc-main/entities/qc-main.entity';

@Injectable()
export class QcScriptService {
  private logger = new Logger()

  constructor(
    @InjectRepository(QcScript) private qcScriptRepository: Repository<QcScript>,
    @InjectRepository(QcMain) private qcMainRepository: Repository<QcMain>
  ) {}

  async create(createQcScriptDto: CreateQcScriptDto): Promise<Object> {
    try{
      const qcScript = await this.qcScriptRepository.createQueryBuilder()
      .insert()
      .into(QcScript)
      .values({qcMain: createQcScriptDto.qcMainID, script: createQcScriptDto.script})
      .execute()

      return {error: false, message: "Add new script to qc main complete.", data: qcScript.identifiers}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async findOne(qcMainID: string): Promise<Object> {
    try{
      const qcMain = await this.qcMainRepository.createQueryBuilder("main")
      .select(["main.ID", "script.ID", "script.script"])
      .innerJoin("main.qcScript", "script")
      .where("main.ID = :qcMainID", {qcMainID})
      .getOne()

      if (!qcMain) throw new Error("invalid qcMainID.")
      
      return {error: false, message: "Get qc script detail complete.", data: qcMain.qcScript["script"]}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async update(qcMainID: string, updateQcScriptDto: UpdateQcScriptDto): Promise<Object> {
    try{
      const qcMain = await this.qcMainRepository.createQueryBuilder("main")
      .select(["script.ID"])
      .innerJoin("main.qcScript", "script")
      .where("main.ID = :qcMainID", {qcMainID})
      .getRawOne()

      if (!qcMain) throw new Error("invalid qcMainID.")
      
      await this.qcScriptRepository.createQueryBuilder()
      .update(QcScript)
      .set({script: updateQcScriptDto.script})
      .where("ID = :qcScriptID", {qcScriptID: qcMain.script_ID})
      .execute()
      
      return {error: false, message: `Update qc script with qc main ID#${qcMainID} complete.`}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }
}
