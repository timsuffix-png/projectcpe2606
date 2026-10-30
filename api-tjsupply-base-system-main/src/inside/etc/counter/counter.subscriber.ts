import { DataSource, EntitySubscriberInterface, EventSubscriber, LoadEvent, Repository } from "typeorm";
import { Counter } from "./entities/counter.entity";
import { HttpException, HttpStatus, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

@EventSubscriber()
export class CounterSubscriber implements EntitySubscriberInterface<Counter> {
  private logger = new Logger()

  constructor(
    dataSource: DataSource,
    @InjectRepository(Counter) private counterRepository: Repository<Counter>
  ) {
    dataSource.subscribers.push(this)
    this.runOnce()
  }

  listenTo(): Function | string {
    return Counter
  }

  async runOnce(): Promise<any> {
    try{
      const counter = await this.counterRepository.findOne({where: {ID: 1}})
      if (!counter) {
        await this.counterRepository.createQueryBuilder().insert().into(Counter).values({itemCountPerDay: 0}).execute()
      }
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }
}
