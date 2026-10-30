import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateCounterDto } from './dto/create-counter.dto';
import { UpdateCounterDto } from './dto/update-counter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Counter } from './entities/counter.entity';
import { Repository } from 'typeorm';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class CounterService {
  constructor(
    @InjectRepository(Counter) private counterRepository: Repository<Counter>
  ) {}

  @Cron("59 59 23 * * *")
  async handleCron(){
    await this.counterRepository.createQueryBuilder()
    .update(Counter)
    .set({itemCountPerDay: 0})
    .where("ID = 1")
    .execute()
  }
}
