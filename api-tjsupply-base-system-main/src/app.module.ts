import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConstructModule } from './inside/constructs/construct/construct.module';
import { SummaryModule } from './inside/summary/summary.module';
import { UserModule } from './inside/user/user.module';
import { DbConfigModule } from './database/db-config.module';
import { LoggerMiddleware } from './etc/logger/logger.middleware';
import { OrderNumberModule } from './inside/items/order-number/order-number.module';
import { PicknpayGoodsModule } from './inside/items/picknpay-goods/picknpay-goods.module';
import { ItemModule } from './inside/items/item/item.module';
import { FormulaItemModule } from './inside/formula/formula-item/formula-item.module';
import { FormulaProjectModule } from './inside/formula/formula-project/formula-project.module';
import { ProductionLotModule } from './inside/plan/production-lot/production-lot.module';
import { ProductionPlanModule } from './inside/plan/production-plan/production-plan.module';
import { ProductionSubModule } from './inside/plan/production-sub/production-sub.module';
import { QcItemProjectModule } from './inside/qc/qc-item-project/qc-item-project.module';
import { QcMainModule } from './inside/qc/qc-main/qc-main.module';
import { QcProjectModule } from './inside/qc/qc-project/qc-project.module';
import { QcRecordModule } from './inside/qc/qc-record/qc-record.module';
import { QcRecordStatusModule } from './inside/qc/qc-record-status/qc-record-status.module';
import { QcScriptModule } from './inside/qc/qc-script/qc-script.module';
import { ItemModelModule } from './inside/etc/item-model/item-model.module';
import { CounterModule } from './inside/etc/counter/counter.module';
import { UserActionModule } from './inside/etc/user-action/user-action.module';
import { ScheduleModule } from '@nestjs/schedule';
import { QcTypeModule } from './inside/qc/qc-type/qc-type.module';
import { ItemTypeModule } from './inside/items/item-type/item-type.module';
import { RepairModule } from './inside/constructs/repair/repair.module';
import { BankModule } from './inside/etc/bank/bank.module';

@Module({
  imports: [
    DbConfigModule, 
    ConstructModule, 
    SummaryModule, 
    UserModule, 
    OrderNumberModule, 
    PicknpayGoodsModule, 
    ItemModule, 
    FormulaItemModule, 
    FormulaProjectModule, 
    ProductionLotModule, 
    ProductionPlanModule, 
    ProductionSubModule, 
    QcItemProjectModule, 
    QcMainModule, 
    QcProjectModule, 
    QcRecordModule, 
    QcRecordStatusModule, 
    QcScriptModule, 
    ItemModelModule, 
    CounterModule, 
    UserActionModule,
    ScheduleModule.forRoot(),
    QcTypeModule,
    ItemTypeModule,
    RepairModule,
    BankModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware)
    .forRoutes("*")
  }
}
