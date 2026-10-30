import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreatePicknpayGoodDto } from './dto/create-picknpay-good.dto';
import { UpdatePicknpayGoodDto } from './dto/update-picknpay-good.dto';
import { PicknpayGoods } from './entities/picknpay-goods.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from '../item/entities/item.entity';
import { UsersProducer } from 'src/inside/user/entities/usersProducer.entity';
import { isUUID } from 'class-validator';

@Injectable()
export class PicknpayGoodsService {
  private logger = new Logger()

  constructor(
    @InjectRepository(PicknpayGoods) private picknpayGoodsRepository: Repository<PicknpayGoods>,
    @InjectRepository(Item) private itemRepository: Repository<Item>,
    @InjectRepository(UsersProducer) private usersProducerRepository: Repository<UsersProducer>
  ) {}

  async create(createPicknpayGoodDto: CreatePicknpayGoodDto): Promise<Object> {
    try{
      const item = await this.itemRepository.findOne({where: {ID: createPicknpayGoodDto.itemID}})
      const user = await this.usersProducerRepository.findOne({where: {ID: createPicknpayGoodDto.borrowBy}})
      const picknpayGood = await this.picknpayGoodsRepository.createQueryBuilder()
      .insert()
      .into(PicknpayGoods)
      .values({item: item, borrowBy: user, amount: createPicknpayGoodDto.amount})
      .execute()

      return {error: false, message: `Request for pick goods complete.`, data: picknpayGood.identifiers}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async findAll(type: string, limit: number, page: number): Promise<Object> {
    try{
      if (!["req", "fin"].includes(type)) throw new Error("Invalid type.")

      const [picknpayGoods, count] = await this.picknpayGoodsRepository.createQueryBuilder("picknpay")
      .select(["picknpay.ID", "picknpay.amount", "picknpay.createdAt", "picknpay.updatedAt", "picknpay.status", "item.ID", "item.name", "item.detail", "borrowBy.ID", "borrowBy.name", "borrowBy.surname", "spendBy.ID", "spendBy.name", "spendBy.surname"])
      .innerJoin("picknpay.item", "item")
      .innerJoin("picknpay.borrowBy", "borrowBy")
      .leftJoin("picknpay.spendBy", "spendBy")
      .where("picknpay.status = :status", {status: type})
      .orderBy("picknpay.updatedAt", "DESC")
      .take(limit)
      .skip((page-1)*limit)
      .getManyAndCount()

      return {error: false, message: `Get all ${type} request goods complete.`, data: picknpayGoods, allPage: Math.ceil(count/limit)}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async findOne(id: string, limit: number, page: number, type: string): Promise<Object> {
    try{
      const [picknpayGoods, count] = await this.picknpayGoodsRepository.createQueryBuilder("picknpay")
      .select(["picknpay.ID", "picknpay.amount", "picknpay.createdAt", "picknpay.updatedAt", "picknpay.status", "item.ID", "item.name", "item.detail", "borrowBy.ID", "borrowBy.name", "borrowBy.surname", "spendBy.ID", "spendBy.name", "spendBy.surname"])
      .innerJoin("picknpay.item", "item")
      .innerJoin("picknpay.borrowBy", "borrowBy")
      .leftJoin("picknpay.spendBy", "spendBy")
      .where("borrowBy.ID = :id", {id})
      .andWhere("picknpay.status = :status", {status: type})
      .orderBy("picknpay.createdAt", "DESC")
      .take(limit)
      .skip((page-1)*limit)
      .getManyAndCount()
      if (!picknpayGoods) throw new Error(`Borrower with ID#${id} not found`)

      return {error: false, message: `Get all request goods complete.`, data: picknpayGoods, allPage: Math.ceil(count/limit)}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async remove(id: string): Promise<Object> {
    try{
      await this.picknpayGoodsRepository.delete(id)
      return {error: false, message: "Delete request pick goods complete."}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async update(updatePicknpayGoodDto: UpdatePicknpayGoodDto): Promise<Object> {
    try{
      const pickGoods = await this.picknpayGoodsRepository.createQueryBuilder("picknpay")
      .innerJoinAndSelect("picknpay.item", "item")
      .where("picknpay.ID = :id", {id: updatePicknpayGoodDto.picknpayID})
      .getOne()
      if (!pickGoods) throw new Error("Invalid picknpayID")
      if (pickGoods.status !== "req") throw new Error("pick and pay goods status is not request")

      const amountInStorage = await this.itemRepository.findOne({where: {ID: pickGoods.item.ID}})
      if (amountInStorage.amount < pickGoods.amount) throw new Error("Item in storage not enough.")

      const spender = await this.usersProducerRepository.findOne({where: {ID: updatePicknpayGoodDto.spendBy}})
      if (!spender) throw new Error(`Invalid userID with ID#${updatePicknpayGoodDto.spendBy}`)
      amountInStorage.amount -= pickGoods.amount
      pickGoods.status = "fin"
      pickGoods.spendBy = spender
      delete pickGoods.updatedAt
      await this.picknpayGoodsRepository.save(pickGoods)
      await this.itemRepository.save(amountInStorage)

      return {error: false, message: "Pay goods complete."}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }
}
