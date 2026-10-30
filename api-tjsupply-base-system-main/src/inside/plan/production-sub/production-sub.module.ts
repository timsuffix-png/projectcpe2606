import { Module } from '@nestjs/common';
import { ProductionSubService } from './production-sub.service';
import { ProductionSubController } from './production-sub.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductionSub } from './entities/production-sub.entity';
import { ProductionPlan } from '../production-plan/entities/production-plan.entity';
import { ProductionLot } from '../production-lot/entities/production-lot.entity';
import { ProductionSubSubscriber } from './production-sub.subscriber';
import { Counter } from 'src/inside/etc/counter/entities/counter.entity';
import { ItemModel } from 'src/inside/etc/item-model/entities/item-model.entity';
import { FormulaProject } from 'src/inside/formula/formula-project/entities/formula-project.entity';
import { Construct } from 'src/inside/constructs/construct/entities/construct.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductionSub, ProductionPlan, ProductionLot, Counter, ItemModel, FormulaProject, Construct])], 
  controllers: [ProductionSubController],
  providers: [ProductionSubService, ProductionSubSubscriber],
})
export class ProductionSubModule {}
