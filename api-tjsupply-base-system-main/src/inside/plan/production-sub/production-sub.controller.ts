import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductionSubService } from './production-sub.service';
import { CreateProductionSubDto } from './dto/create-production-sub.dto';
import { UpdateProductionSubDto } from './dto/update-production-sub.dto';

@Controller('plan/detail')
export class ProductionSubController {
  constructor(private readonly productionSubService: ProductionSubService) {}

  @Post()
  async create(@Body() createProductionSubDto: CreateProductionSubDto): Promise<Object> {
    return await this.productionSubService.create(createProductionSubDto);
  }

  @Get(':lotID')
  async findOneByLot(@Param('lotID') lotID: string): Promise<Object> {
    return await this.productionSubService.findOneByLot(lotID);
  }

  @Delete(':subID')
  async remove(@Param('subID') subID: string): Promise<Object> {
    return await this.productionSubService.remove(subID);
  }
}
