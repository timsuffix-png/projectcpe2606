import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateQcRecordDto } from './dto/create-qc-record.dto';
import { UpdateQcRecordDto } from './dto/update-qc-record.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { QcRecord } from './entities/qc-record.entity';
import { Repository } from 'typeorm';
import { Construct } from 'src/inside/constructs/construct/entities/construct.entity';
import * as moment from "moment-timezone"

@Injectable()
export class QcRecordService {
  private logger = new Logger()

  constructor (
    @InjectRepository(QcRecord) private qcRecordRepository: Repository<QcRecord>,
    @InjectRepository(Construct) private constructRepository: Repository<Construct>
  ) {}

  async create(createQcRecordDto: CreateQcRecordDto): Promise<Object> {
    try{
      const construct = await this.constructRepository.createQueryBuilder("con")
      .where("con.ID = :serialNumber", {serialNumber: createQcRecordDto.serialNumber})
      .orWhere("con.encryptIDValue = :serialNumber", {serialNumber: createQcRecordDto.serialNumber})
      .getOne()

      const qcRecord = await this.qcRecordRepository.createQueryBuilder()
      .insert()
      .into(QcRecord)
      .values({
        testBy: createQcRecordDto.testBy, qcProject: createQcRecordDto.qcProjectID, construct: construct
      })
      .execute()
      
      return {error: false, message: "add new test result complete.", data: qcRecord.identifiers}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async findAll(limit: number, page: number, like: string): Promise<Object> {
    try{
      const [qcRecords, count] = await this.qcRecordRepository.createQueryBuilder("record")
      .select(["record.ID", "construct.ID", "project.ID", "testBy.ID", "record.createdAt", "record.updatedAt", "record.statusOverView"])
      .innerJoin("record.construct", "construct")
      .innerJoin("record.testBy", "testBy")
      .innerJoin("record.qcProject", "project")
      .where("construct.ID ILIKE :like", {like: like?`%${like}%`:`%`})
      .orderBy("record.updatedAt", "DESC")
      .take(limit)
      .skip((page-1)*limit)
      .getManyAndCount()
      
      return {error: false, message: "get all record result complete.", data: qcRecords, allPage: Math.ceil(count/limit)}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async findAllAndSerial(limit: number, page: number, like: string): Promise<Object> {
    try{
      const [qcRecords, count] = await this.qcRecordRepository.createQueryBuilder("record")
      .select(["record.ID", "construct.ID", "project.ID", "testBy.ID", "testBy.name", "testBy.surname", "record.createdAt", "record.updatedAt", "record.statusOverView", "sub.ID", "lot.ID", "lot.name", "project.projectName"])
      .innerJoin("record.construct", "construct")
      .innerJoin("construct.productionSub", "sub")
      .innerJoin("sub.productionLot", "lot")
      .innerJoin("record.testBy", "testBy")
      .innerJoin("record.qcProject", "project")
      .where("construct.ID ILIKE :like", {like: like?`%${like}%`:`%`})
      .orderBy("record.updatedAt", "DESC")
      .take(limit)
      .skip((page-1)*limit)
      .getManyAndCount()
      
      return {error: false, message: "get all record result complete.", data: qcRecords, allPage: Math.ceil(count/limit)}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async findOne(serialNumber: string): Promise<Object> {
    try{
      const construct = await this.constructRepository.createQueryBuilder("con")
      .select(["con.ID", "record.ID", "record.createdAt", "record.updatedAt", "record.statusOverView", "repair.ID", "repair.createdAt", "repairBy.ID", "repairBy.name", 
        "repairBy.surname", "testBy.ID", "testBy.name", "testBy.surname", "project.ID", "project.projectName"])
      .leftJoin("con.repair", "repair")
      .leftJoin("repair.repairBy", "repairBy")
      .leftJoin("con.qcRecord", "record")
      .leftJoin("record.qcProject", "project")
      .leftJoin("record.testBy", "testBy")
      .where("con.ID = :serialNumber", {serialNumber})
      .orWhere("con.encryptIDValue = :serialNumber", {serialNumber})
      .orderBy("record.updatedAt", "DESC")
      .addOrderBy("repair.createdAt", "DESC")
      .getOne()

      // sorting
      let sortingData: any[]
      if (moment(construct.repair[construct.repair.length-1]?.createdAt || 0).unix() >= moment(construct.qcRecord[construct.qcRecord.length-1]?.updatedAt || 0).unix()){
        sortingData = construct.qcRecord.map(data=>({...data, tag: "qcRecord"}))
        if (sortingData.length === 0) return {error: false, message: "get all record result complete.", data: construct.repair.map(data=>({...data, tag: "repair"}))}
        
        for (let repair in construct.repair){
          for (let record in sortingData){
            if (moment(construct.repair[repair]?.createdAt || 0).unix() >= moment(sortingData[record]?.updatedAt || 0).unix()){
              sortingData.splice(Number(record), 0, {...construct.repair[repair], tag: "repair"})
              break
            }
          }
        }
      }
      else {
        sortingData = construct.repair.map(data=>({...data, tag: "repair"}))
        if (sortingData.length === 0) return {error: false, message: "get all record result complete.", data: construct.qcRecord.map(data=>({...data, tag: "qcRecord"}))}

        for (let qcRecord in construct.qcRecord){
          for (let repair in sortingData){
            if (moment(construct.qcRecord[qcRecord]?.updatedAt || 0).unix() >= moment(sortingData[repair]?.createdAt || 0).unix()){
              sortingData.splice(Number(repair), 0, {...construct.qcRecord[qcRecord], tag: "qcRecord"})
              break
            }
          }
        }
      }
      
      return {error: false, message: "get all record result complete.", data: sortingData}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async remainingQc(qcRecordID: string): Promise<Object> {
    try{
      const records = await this.qcRecordRepository.createQueryBuilder("record")
      .select(["record.ID", "status.ID", "currentMain.ID", "project.ID", "itemProject.ID", "allMain.ID", "currentType.ID", "currentType.name", "allType.ID", 
        "allType.name", "currentMain.testName", "allMain.testName", "allScript.ID", "allScript.script", "currentScript.ID", "currentScript.script"])
      .leftJoin("record.qcRecordStatus", "status")
      .innerJoin("record.qcProject", "project")
      .innerJoin("project.qcItemProject", "itemProject")
      .innerJoin("itemProject.qcMain", "allMain")
      .leftJoin("status.qcMain", "currentMain")
      .leftJoin("currentMain.qcType", "currentType")
      .innerJoin("allMain.qcType", "allType")
      .leftJoin("allMain.qcScript", "allScript")
      .leftJoin("currentMain.qcScript", "currentScript")
      .orderBy("record.updatedAt", "DESC")
      .where("record.ID = :qcRecordID", {qcRecordID})
      .getMany()

      let remaining = []
      for (let record of records){
        for (let allTest of record.qcProject.qcItemProject){
          let skip = false
          for (let currentTest of record.qcRecordStatus){
            if (skip) break
            if (allTest.qcMain.ID === currentTest.qcMain.ID) skip = true
          }
          if (!skip) remaining.push(allTest.qcMain)
        }
      }
      
      return {error: false, message: "get all record result complete.", data: remaining}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async remove(qcRecordID: string): Promise<Object> {
    try{
      await this.qcRecordRepository.delete(qcRecordID)

      return {error: false, message: `delete record result with ID#${qcRecordID} complete.`}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }
}
