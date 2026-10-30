import { Module } from '@nestjs/common';
import { ProductionPlanService } from './production-plan.service';
import { ProductionPlanController } from './production-plan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductionPlan } from './entities/production-plan.entity';
import { ProductionLot } from '../production-lot/entities/production-lot.entity';
import { ProductionSub } from '../production-sub/entities/production-sub.entity';
import { Construct } from 'src/inside/constructs/construct/entities/construct.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductionPlan, ProductionLot, ProductionSub, Construct])],
  controllers: [ProductionPlanController],
  providers: [ProductionPlanService],
})
export class ProductionPlanModule {}
