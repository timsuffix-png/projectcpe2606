import { Module } from '@nestjs/common';
import { ItemModelService } from './item-model.service';
import { ItemModelController } from './item-model.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemModel } from './entities/item-model.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ItemModel])],
  controllers: [ItemModelController],
  providers: [ItemModelService],
})
export class ItemModelModule {}
