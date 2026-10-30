import { Module } from '@nestjs/common';
import { ConstructService } from './construct.service';
import { ConstructController } from './construct.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Construct } from './entities/construct.entity';
import { ConstructSubscriber } from './construct.subscriber';
import { FormulaItem } from '../../formula/formula-item/entities/formula-item.entity';
import { Item } from '../../items/item/entities/item.entity';
import { ProductionSub } from '../../plan/production-sub/entities/production-sub.entity';
import { UsersProducer } from '../../user/entities/usersProducer.entity';
import { ProductionLot } from '../../plan/production-lot/entities/production-lot.entity';
import { Bank } from 'src/inside/etc/bank/entities/bank.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Construct, FormulaItem, Item, ProductionSub, UsersProducer, ProductionLot, Bank])],
  controllers: [ConstructController],
  providers: [ConstructService, ConstructSubscriber],
})
export class ConstructModule {}
