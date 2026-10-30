import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateFormulaProjectDto } from './dto/create-formula-project.dto';
import { UpdateFormulaProjectDto } from './dto/update-formula-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FormulaProject } from './entities/formula-project.entity';
import { Repository } from 'typeorm';
import { FormulaItem } from '../formula-item/entities/formula-item.entity';

@Injectable()
export class FormulaProjectService {
  private logger = new Logger()

  constructor(
    @InjectRepository(FormulaProject) private formulaProjectRepository: Repository<FormulaProject>,
    @InjectRepository(FormulaItem) private formulaItemRepository: Repository<FormulaItem>
  ) {}

  async create(createFormulaProjectDto: CreateFormulaProjectDto): Promise<Object> {
    try{
      for (let material of createFormulaProjectDto.material){
        if (material["item"] === createFormulaProjectDto.toItem) throw new Error("You can't use same product as material")
      }

      const formulaProject = await this.formulaProjectRepository.createQueryBuilder()
      .insert()
      .into(FormulaProject)
      .values(createFormulaProjectDto)
      .execute()

      const formulaItem = await this.formulaItemRepository.createQueryBuilder()
      .insert()
      .into(FormulaItem)
      .values(createFormulaProjectDto.material.map(data=>({...data, formulaProject: formulaProject.identifiers[0].ID})))
      .execute()

      return {error: false, message: "add formula complete.", data: {formulaProject: formulaProject.identifiers, formulaItem: formulaItem.identifiers}}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async findAll(limit: number, page: number): Promise<Object> {
    try{
      const [formulaProjects, count] = await this.formulaProjectRepository.createQueryBuilder("project")
      .select(["project.ID", "project.name", "project.costFormula", "item.ID", "item.name", "item.amount"])
      .innerJoin("project.toItem", "item")
      .take(limit)
      .skip((page-1)*limit)
      .getManyAndCount()

      return {error: false, message: "get formula list complete.", data: formulaProjects, allPage: Math.ceil(count/limit)}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async findOne(id: string): Promise<Object> {
    try{
      const formulaProject = await this.formulaProjectRepository.createQueryBuilder("project")
      .select(["project.ID", "project.name", "project.costFormula", "project.detail", "item.ID", "item.name"])
      .innerJoin("project.toItem", "item")
      .where("project.ID = :id", {id})
      .getOne()

      if (!formulaProject) throw new Error("formula id invalid.")

      const materials = await this.formulaItemRepository.createQueryBuilder("formulaItem")
      .select(["formulaItem.ID", "formulaItem.amount", "item.ID", "item.name", "item.amount", "formulaProject.ID"])
      .innerJoin("formulaItem.item", "item")
      .innerJoin("formulaItem.formulaProject", "formulaProject")
      .where("formulaItem.formulaProject = :id", {id})
      .getMany()

      return {error: false, message: "get formula detail complete.", data: {detail: formulaProject, materials: materials}}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async update(id: string, updateFormulaProjectDto: UpdateFormulaProjectDto): Promise<Object> {
    try{
      await this.formulaProjectRepository.createQueryBuilder()
      .update(FormulaProject)
      .set(updateFormulaProjectDto)
      .where("ID = :id", {id})
      .execute()

      return {error: false, message: "update formula detail complete."}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async remove(id: string): Promise<Object> {
    try{
      await this.formulaProjectRepository.delete(id)

      return {error: false, message: "delete formula complete."}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }
}
