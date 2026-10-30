import { DataSource, EntitySubscriberInterface, EventSubscriber, Repository } from "typeorm";
import { ItemType } from "./entities/item-type.entity";
import { HttpException, HttpStatus, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

@EventSubscriber()
export class ItemTypeSubscriber implements EntitySubscriberInterface<ItemType> {
  private logger = new Logger()

  constructor(dataSource: DataSource, @InjectRepository(ItemType) private itemTypeRepository: Repository<ItemType>){
    dataSource.subscribers.push(this)
    this.runOnce()
  }

  listenTo(): Function | string {
    return ItemType
  }

  async runOnce(): Promise<any>{
    try{
      const product = await this.itemTypeRepository.findOne({where: {name: "สินค้า"}})
      const material = await this.itemTypeRepository.findOne({where: {name: "วัตถุดิบ"}})

      if (!product) await this.itemTypeRepository.createQueryBuilder().insert().into(ItemType).values({name: "สินค้า"}).execute()
      if (!material) await this.itemTypeRepository.createQueryBuilder().insert().into(ItemType).values({name: "วัตถุดิบ"}).execute()
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }
}