import { Module } from '@nestjs/common';
import { ProductionLotService } from './production-lot.service';
import { ProductionLotController } from './production-lot.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductionLot } from './entities/production-lot.entity';
import { ProductionPlan } from '../production-plan/entities/production-plan.entity';
import { ProductionSub } from '../production-sub/entities/production-sub.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductionLot, ProductionPlan, ProductionSub])],
  controllers: [ProductionLotController],
  providers: [ProductionLotService],
})
export class ProductionLotModule {}
