import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateItemTypeDto } from './dto/create-item-type.dto';
import { UpdateItemTypeDto } from './dto/update-item-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemType } from './entities/item-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ItemTypeService {
  private logger = new Logger()

  constructor(@InjectRepository(ItemType) private itemTypeRepository: Repository<ItemType>){}

  async create(createItemTypeDto: CreateItemTypeDto): Promise<Object> {
    try{
      const itemType = await this.itemTypeRepository.createQueryBuilder()
      .insert()
      .into(ItemType)
      .values(createItemTypeDto)
      .execute()

      return {error: false, message: "add item type complete.", data: itemType.identifiers}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async findOne(itemTypeID: string): Promise<Object> {
    try{
      const itemType = await this.itemTypeRepository.createQueryBuilder("itemType")
      .select(["itemType.name"])
      .where("itemType.ID = :id", {id: itemTypeID})
      .getOne() 

      if (!itemType) throw new Error("Invalid itemTypeID.")

      return {error: false, message: "item type detail complete.", data: itemType}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async findAll(limit: number, page: number): Promise<Object> {
    try{
      const [itemTypes, count] = await this.itemTypeRepository.createQueryBuilder()
      .take(limit)
      .skip((page-1)*limit)
      .getManyAndCount()

      return {error: false, message: "get all item type complete.", data: itemTypes, allPage: Math.ceil(count/limit)}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async update(itemTypeID: string, updateItemTypeDto: UpdateItemTypeDto): Promise<Object> {
    try{
      await this.itemTypeRepository.createQueryBuilder()
      .update(ItemType)
      .set(updateItemTypeDto)
      .where("ID = :id", {id: itemTypeID})
      .execute()

      return {error: false, message: "update item type complete."}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async remove(itemTypeID: string): Promise<Object> {
    try{
      await this.itemTypeRepository.delete(itemTypeID)

      return {error: false, message: "delete item type complete."}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }
}
