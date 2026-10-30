import { Module } from '@nestjs/common';
import { PicknpayGoodsService } from './picknpay-goods.service';
import { PicknpayGoodsController } from './picknpay-goods.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PicknpayGoods } from './entities/picknpay-goods.entity';
import { Item } from '../item/entities/item.entity';
import { UsersProducer } from 'src/inside/user/entities/usersProducer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PicknpayGoods, Item, UsersProducer])],
  controllers: [PicknpayGoodsController],
  providers: [PicknpayGoodsService],
})
export class PicknpayGoodsModule {}
