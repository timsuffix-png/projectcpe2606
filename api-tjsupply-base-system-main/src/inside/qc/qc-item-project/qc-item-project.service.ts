import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateQcItemProjectDto } from './dto/create-qc-item-project.dto';
import { UpdateQcItemProjectDto } from './dto/update-qc-item-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { QcItemProject } from './entities/qc-item-project.entity';
import { Repository } from 'typeorm';
import { CreateQcItemProjectMultiDto } from './dto/create-qc-item-project-multi.dto';
import { QcProject } from '../qc-project/entities/qc-project.entity';

@Injectable()
export class QcItemProjectService {
  private logger = new Logger()

  constructor (
    @InjectRepository(QcItemProject) private qcItemProjectRepository: Repository<QcItemProject>,
    @InjectRepository(QcProject) private qcProjectRepository: Repository<QcProject>
  ) {}

  async create(createQcItemProjectDto: CreateQcItemProjectDto): Promise<Object> {
    try{
      const qcItemProject = await this.qcItemProjectRepository.createQueryBuilder()
      .insert()
      .into(QcItemProject)
      .values(createQcItemProjectDto)
      .execute()
      
      return {error: false, message: "map qc project to qc main complete.", data: qcItemProject.identifiers}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async createMulti(createQcItemProjectMultiDto: CreateQcItemProjectMultiDto): Promise<Object> {
    try{
      const qcProject = await this.qcProjectRepository.createQueryBuilder()
      .insert()
      .into(QcProject)
      .values({projectName: createQcItemProjectMultiDto.projectName, detail: createQcItemProjectMultiDto.detail})
      .execute()

      const data = createQcItemProjectMultiDto.qcMainID.map(data=>({qcMain: data, qcProject: qcProject.identifiers[0].ID}))

      const qcItemProject = await this.qcItemProjectRepository.createQueryBuilder()
      .insert()
      .into(QcItemProject)
      .values(data)
      .execute()
      
      return {error: false, message: "map qc project to qc main complete.", data: {qcProject: qcProject.identifiers, qcItemProject: qcItemProject.identifiers}}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async findOne(qcProjectID: string): Promise<Object> {
    try{
      const qcItemProjects = await this.qcItemProjectRepository.createQueryBuilder("itemProject")
      .leftJoinAndSelect("itemProject.qcMain", "main")
      .innerJoinAndSelect("main.qcType", "type")
      .leftJoinAndSelect("main.qcScript", "script")
      .leftJoinAndSelect("itemProject.qcProject", "project")
      .where("project.ID = :qcProjectID", {qcProjectID})
      .getMany()

      return {error: false, message: "get map qc project and qc main by qcProjectID complete.", data: qcItemProjects}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async remove(qcItemProjectID: string): Promise<Object> {
    try{
      await this.qcItemProjectRepository.delete(qcItemProjectID)
      
      return {error: false, message: `delete mapper with ID#${qcItemProjectID} complete.`}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }
}
