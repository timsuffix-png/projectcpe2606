import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateQcProjectDto } from './dto/create-qc-project.dto';
import { UpdateQcProjectDto } from './dto/update-qc-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { QcProject } from './entities/qc-project.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QcProjectService {
  private logger = new Logger()

  constructor (
    @InjectRepository(QcProject) private qcProjectRepository: Repository<Object>
  ) {}

  async create(createQcProjectDto: CreateQcProjectDto): Promise<Object> {
    try{
      const qcProject = await this.qcProjectRepository.createQueryBuilder()
      .insert()
      .into(QcProject)
      .values(createQcProjectDto)
      .execute()
      
      return {error: false, message: "Add new qc project complete.", data: qcProject.identifiers}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async findAll(limit: number, page: number): Promise<Object> {
    try{
      const [qcProjects, count] = await this.qcProjectRepository.createQueryBuilder()
      .take(limit)
      .skip((page-1)*limit)
      .getManyAndCount()

      return {error: false, message: "get all qc project complete.", data: qcProjects, allPage: Math.ceil(count/limit)}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async findAllExtend(limit: number, page: number): Promise<Object> {
    try{
      const [qcProjects, count] = await this.qcProjectRepository.createQueryBuilder("project")
      .leftJoinAndSelect("project.qcItemProject", "itemProject")
      .leftJoinAndSelect("itemProject.qcMain", "main")
      .take(limit)
      .skip((page-1)*limit)
      .getManyAndCount()

      return {error: false, message: "get all qc project with qc main complete.", data: qcProjects, allPage: Math.ceil(count/limit)}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async update(qcProjectID: string, updateQcProjectDto: UpdateQcProjectDto): Promise<Object> {
    try{
      await this.qcProjectRepository.createQueryBuilder()
      .update(QcProject)
      .set(updateQcProjectDto)
      .where("ID = :qcProjectID", {qcProjectID})
      .execute()
      
      return {error: false, message: "Update qc project complete."}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async remove(qcProjectID: string): Promise<Object> {
    try{
      await this.qcProjectRepository.delete(qcProjectID)

      return {error: false, message: `delete qc project with ID#${qcProjectID} complete.`}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }
}
