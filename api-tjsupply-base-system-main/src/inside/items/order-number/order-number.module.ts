import { Module } from '@nestjs/common';
import { OrderNumberService } from './order-number.service';
import { OrderNumberController } from './order-number.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderNumber } from './entities/order-number.entity';
import { Item } from '../item/entities/item.entity';
import { UsersProducer } from 'src/inside/user/entities/usersProducer.entity';
import { Bank } from 'src/inside/etc/bank/entities/bank.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderNumber, Item, UsersProducer, Bank])],
  controllers: [OrderNumberController],
  providers: [OrderNumberService],
})
export class OrderNumberModule {}
