import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ItemTypeService } from './item-type.service';
import { CreateItemTypeDto } from './dto/create-item-type.dto';
import { UpdateItemTypeDto } from './dto/update-item-type.dto';

@Controller('item/type')
export class ItemTypeController {
  constructor(private readonly itemTypeService: ItemTypeService) {}

  @Post()
  async create(@Body() createItemTypeDto: CreateItemTypeDto): Promise<Object> {
    return await this.itemTypeService.create(createItemTypeDto);
  }

  @Get(":itemTypeID")
  async findOne(@Param("itemTypeID") itemTypeID: string): Promise<Object> {
    return await this.itemTypeService.findOne(itemTypeID);
  }

  @Get()
  async findAll(@Query("limit") limit: number, @Query("page") page: number): Promise<Object> {
    return await this.itemTypeService.findAll(limit, page);
  }

  @Patch(':itemTypeID')
  async update(@Param('itemTypeID') itemTypeID: string, @Body() updateItemTypeDto: UpdateItemTypeDto): Promise<Object> {
    return await this.itemTypeService.update(itemTypeID, updateItemTypeDto);
  }

  @Delete(':itemTypeID')
  async remove(@Param('itemTypeID') itemTypeID: string): Promise<Object> {
    return await this.itemTypeService.remove(itemTypeID);
  }
}
