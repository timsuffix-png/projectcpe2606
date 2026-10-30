import { Module } from '@nestjs/common';
import { ItemTypeService } from './item-type.service';
import { ItemTypeController } from './item-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemType } from './entities/item-type.entity';
import { ItemTypeSubscriber } from './item-type.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([ItemType])],
  controllers: [ItemTypeController],
  providers: [ItemTypeService, ItemTypeSubscriber],
})
export class ItemTypeModule {}
