import { forwardRef, Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { ItemModel } from 'src/inside/etc/item-model/entities/item-model.entity';
import { Construct } from 'src/inside/constructs/construct/entities/construct.entity';
import { ItemType } from '../item-type/entities/item-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Item, ItemModel, Construct, ItemType])],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}
