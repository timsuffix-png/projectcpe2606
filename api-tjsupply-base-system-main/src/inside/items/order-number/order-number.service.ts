import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateOrderNumberDto } from './dto/create-order-number.dto';
import { UpdateOrderNumberDto } from './dto/update-order-number.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderNumber } from './entities/order-number.entity';
import { Item } from '../item/entities/item.entity';
import { UsersProducer } from 'src/inside/user/entities/usersProducer.entity';
import { Bank } from 'src/inside/etc/bank/entities/bank.entity';

@Injectable()
export class OrderNumberService {
  private logger = new Logger()

  constructor(
    @InjectRepository(OrderNumber) private orderRepository: Repository<OrderNumber>,
    @InjectRepository(Item) private itemRepository: Repository<Item>,
    @InjectRepository(UsersProducer) private usersProducerRepository: Repository<UsersProducer>,
    @InjectRepository(Bank) private bankRepository: Repository<Bank>
  ) {}

  async create(createOrderNumberDto: CreateOrderNumberDto): Promise<Object>{
    try{
      const user = await this.usersProducerRepository.findOne({where: { ID: createOrderNumberDto.buyByID }})
      const item = await this.itemRepository.findOne({where: { ID: createOrderNumberDto.itemID }})
      const orderNumber = await this.orderRepository.createQueryBuilder()
      .insert()
      .into(OrderNumber)
      .values({item: item, buyBy: user, costPerItem: createOrderNumberDto.costPerItem, amount: createOrderNumberDto.amount})
      .execute()
      
      return {error: false, message: `add order buy item complete.`, data: orderNumber.identifiers}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async findAll(type: string, limit: number, page: number): Promise<Object>{
    try{
      if (!["waiting", "allow", "done"].includes(type)) throw new Error("Want to buy type invalid format")

      const [orders, count] = await this.orderRepository.createQueryBuilder("order")
      .select(["order.ID", "order.costPerItem", "order.amount", "order.createdAt", "order.updatedAt", "order.status", "item.ID", "item.name", "user.ID", "user.name", "user.surname"])
      .innerJoin("order.item", "item")
      .innerJoin("order.buyBy", "user")
      .where("order.status LIKE :status", {status: type==="done" ? "%ed":type})
      .orderBy("order.updatedAt", "DESC")
      .take(limit)
      .skip((page-1)*limit)
      .getManyAndCount()

      return {
        error: false, 
        message: `get order buy item status -${type}- complete.`, 
        data: orders, 
        allPage: Math.ceil(count/limit)}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async remove(id: string): Promise<Object>{
    try{
      await this.orderRepository.delete(id)
      return {error: false, message: `delete order buy item complete.`}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async update(id: string, type: string): Promise<Object> {
    try{
      if (!["allow", "denied", "finished"].includes(type)) throw new Error("Invalid orderNumber status")
      
      const order = await this.orderRepository.createQueryBuilder("orderNumber")
      .innerJoinAndSelect("orderNumber.item", "item")
      .where("orderNumber.ID = :id", {id})
      .getOne()

      if (!order) throw new Error(`Invalid order number ID#${id}.`)

      // approve
      if (order.status === "waiting"){
        order.status = type
        delete order.updatedAt
        await this.orderRepository.save(order)
      }

      // finished
      else if (order.status === "allow"){
        order.status = type
        delete order.updatedAt
        await this.orderRepository.save(order)

        // increase item in storage
        await this.itemRepository.createQueryBuilder()
        .update(Item)
        .set({
          amount: ()=>`amount + ${order.amount}`
        })
        .where("ID = :id", {id: order.item.ID})
        .execute()

        await this.bankRepository.createQueryBuilder()
        .insert()
        .into(Bank)
        .values({type: 0, value: order.costPerItem * order.amount})
        .execute()
      }
      return {error: false, message: `update status order number item -> ${type} complete.`}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }
}
