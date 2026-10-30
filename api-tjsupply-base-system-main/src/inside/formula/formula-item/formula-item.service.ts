import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateFormulaItemDto } from './dto/create-formula-item.dto';
import { UpdateFormulaItemDto } from './dto/update-formula-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FormulaItem } from './entities/formula-item.entity';
import { Repository } from 'typeorm';
import { FormulaProject } from '../formula-project/entities/formula-project.entity';

@Injectable()
export class FormulaItemService {
  private logger = new Logger()

  constructor(
    @InjectRepository(FormulaItem) private formulaItemRepository: Repository<FormulaItem>,
    @InjectRepository(FormulaProject) private formulaProjectRepository: Repository<FormulaProject>
  ) {}

  async create(createFormulaItemDto: CreateFormulaItemDto): Promise<Object> {
    try{
      const formulaProject = await this.formulaProjectRepository.createQueryBuilder("project")
      .select("toItem.ID", "toItemID")
      .innerJoin("project.toItem", "toItem")
      .where("project.ID = :formulaProjectID", {formulaProjectID: createFormulaItemDto.formulaProject})
      .getRawOne()

      for (let material of createFormulaItemDto.material){
        if (material["item"] === formulaProject.toItemID) throw new Error("You can't use same product as material.")
      }

      const formulaItem = await this.formulaItemRepository.createQueryBuilder()
      .insert()
      .into(FormulaItem)
      .values(createFormulaItemDto.material.map(data=>({...data, formulaProject: createFormulaItemDto.formulaProject})))
      .execute()

      return {error: false, message: "add item to formula complete.", data: formulaItem.identifiers}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async remove(id: string): Promise<Object> {
    try{
      await this.formulaItemRepository.delete(id)

      return {error: false, message: "delete item from formula complete."}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }
}
