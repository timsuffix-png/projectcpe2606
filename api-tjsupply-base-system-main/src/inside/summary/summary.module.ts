import { Module } from '@nestjs/common';
import { SummaryService } from './summary.service';
import { SummaryController } from './summary.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Construct } from '../constructs/construct/entities/construct.entity';
import { QcRecord } from '../qc/qc-record/entities/qc-record.entity';
import { Item } from '../items/item/entities/item.entity';
import { QcRecordStatus } from '../qc/qc-record-status/entities/qc-record-status.entity';
import { ProductionPlan } from '../plan/production-plan/entities/production-plan.entity';
import { Bank } from '../etc/bank/entities/bank.entity';
import { PicknpayGoods } from '../items/picknpay-goods/entities/picknpay-goods.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Construct, QcRecord, Item, QcRecordStatus, ProductionPlan, Bank, PicknpayGoods])],
  controllers: [SummaryController],
  providers: [SummaryService],
})
export class SummaryModule {}
