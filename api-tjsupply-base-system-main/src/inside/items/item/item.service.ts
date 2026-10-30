import { HttpException, HttpStatus, Injectable, Logger, StreamableFile } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Item } from './entities/item.entity';
import * as moment from "moment-timezone"
import { ItemModel } from 'src/inside/etc/item-model/entities/item-model.entity';
import { Construct } from 'src/inside/constructs/construct/entities/construct.entity';
import { ItemType } from '../item-type/entities/item-type.entity';
import { createReadStream, promises } from 'fs';
import { join } from 'path';

@Injectable()
export class ItemService {
  private logger = new Logger()

  constructor(
    @InjectRepository(Item) private itemRepository: Repository<Item>,
    @InjectRepository(ItemModel) private itemModelRepository: Repository<ItemModel>,
    @InjectRepository(Construct) private constructRepository: Repository<Construct>,
    @InjectRepository(ItemType) private itemTypeRepository: Repository<ItemType>
  ) {}

  async create(createItemDto: CreateItemDto): Promise<Object> {
    try{
      const item = await this.itemRepository.createQueryBuilder()
      .insert()
      .into(Item)
      .values(createItemDto)
      .execute()

      const itemType = await this.itemTypeRepository.createQueryBuilder("itemType")
      .where("itemType.ID = :id", {id: createItemDto.itemType})
      .getOne()
      
      if (itemType.name === "สินค้า"){
        const itemModel = await this.itemModelRepository.createQueryBuilder()
        .insert()
        .into(ItemModel)
        .values({item: item.identifiers[0].ID})
        .execute()
      }

      return {error: false, message: "add item complete.", data: item.identifiers}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async findOne(itemID: string): Promise<Object> {
    try{
      const item = await this.itemRepository.createQueryBuilder("item")
      .innerJoinAndSelect("item.itemType", "itemType")
      .where("item.ID = :itemID", {itemID})
      .getOne()

      if (!item) throw new Error("Invalid itemID.")

      return {error: false, message: `get item list complete.`, data: item}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async findAll(limit: number, page: number, like: string, material: string): Promise<Object> {
    try{
      const [items, count] = await this.itemRepository.createQueryBuilder("item")
      .innerJoinAndSelect("item.itemType", "type")
      .where("item.name ILIKE :like", {like: like?`%${like}%`:`%`})
      .andWhere("type.name NOT ILIKE :typeName1", {typeName1: (material != undefined)?`%สินค้า%`:``})
      .andWhere("type.name NOT ILIKE :typeName2", {typeName2: (material != undefined)?`%ผลิตภัณฑ์%`:``})
      .andWhere("type.name NOT ILIKE :typeName3", {typeName3: (material != undefined)?`%product%`:``})
      .orderBy("item.isFavourite", "DESC")
      .addOrderBy("item.name", "ASC")
      .take(limit)
      .skip((page-1)*limit)
      .getManyAndCount()

      return {error: false, message: `get item list complete.`, data: items, allPage: Math.ceil(count/limit)}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async constructListByItemID(itemID: string, limit: number, page: number, status: string, like: string): Promise<Object> {
    try{
      if (!["waiting", "finish", "sale", "all"].includes(status)) throw new Error("invalid status type.")

      const [constructs, count] = await this.constructRepository.createQueryBuilder("construct")
      .select(["construct.ID", "construct.updatedAt", "construct.status", "sub.ID", "lot.ID", "lot.name", "plan.ID", "plan.planName"])
      .innerJoin("construct.item", "item")
      .innerJoin("construct.productionSub", "sub")
      .innerJoin("sub.productionLot", "lot")
      .innerJoin("lot.productionPlan", "plan")
      .where("item.ID = :itemID", {itemID})
      .andWhere("construct.ID ILIKE :like", {like: like?`%${like}%`:`%`})
      .andWhere("construct.status LIKE :status", {status: status==="waiting"?status:status==="finish"?status:status==="sale"?status:"%"})
      .orderBy("construct.status", "DESC")
      .addOrderBy("construct.updatedAt", "DESC")
      .addOrderBy("construct.ID", "DESC")
      .take(limit)
      .skip((page-1)*limit)
      .getManyAndCount()

      return {error: false, message: `get construct list per item id complete.`, data: constructs, allPage: Math.ceil(count/limit)}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async update(itemID: string, updateItemDto: UpdateItemDto): Promise<Object> {
    try{
      await this.itemRepository.createQueryBuilder()
      .update(Item)
      .set(updateItemDto)
      .where("ID = :itemID", {itemID})
      .execute()

      return {error: false, message: `update item detail complete.`}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async remove(id: string): Promise<Object> {
    try{
      await this.itemRepository.delete(id)

      return {error: false, message: `delete item complete.`}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async waitingForConstructList(like: string): Promise<Object>{
    try{
      const constructs = await this.constructRepository.createQueryBuilder("construct")
      .select(["item.ID", "item.name", "item.amount", "item.costPrice", "item.salePrice", "item.isFavourite"])
      .innerJoin("construct.item", "item")
      .where("item.name ILIKE :like", {like: like?`%${like}%`:`%`})
      .groupBy("item.name")
      .addGroupBy("item.ID")
      .getRawMany()
      
      return {error: false, message: "get all items that waiting for construct complete.", data: constructs}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async favourite(id: string): Promise<Object> {
    try{
      // Find item with id
      const item = await this.itemRepository.findOne({ where: {ID: id} })

      // Validation
      if (!item) throw new Error("Invalid item id")
      
      // update item favourite status
      item.isFavourite = !item.isFavourite

      // save new item update
      await this.itemRepository.save(item)

      return {error: false, message: `update favorite status for item complete.`}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async uploadItemImage(file: Express.Multer.File, itemID: string): Promise<Object>{
    try{
      if (!file) throw new Error("File not found.")
      
      const item = await this.itemRepository.findOne({where: {ID: itemID}})
      if (!item) throw new Error("Invalid item ID.")
      if (item.path2picture !== null){
        try{
          await promises.unlink(item.path2picture)
        }
        catch(err){
          // Error if file on server not found
        }
      }
      
      item.path2picture = file.path
      await this.itemRepository.save(item)

      return {error: false, message: `Upload item image complete.`}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async getItemImage(itemID: string): Promise<StreamableFile>{
    try{
      const itemImagePath = await this.itemRepository.createQueryBuilder("item")
      .select("path2picture")
      .where("item.ID = :itemID", {itemID})
      .getRawOne()

      if (!itemImagePath) throw new Error("Invalid item ID.")

      if (!itemImagePath.path2picture) throw new Error("Item has no profile picture.")

      return new StreamableFile(createReadStream(join(process.cwd(), itemImagePath.path2picture)))
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }
}
