import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductionLotService } from './production-lot.service';
import { CreateProductionLotDto } from './dto/create-production-lot.dto';
import { UpdateProductionLotDto } from './dto/update-production-lot.dto';

@Controller('plan/lot')
export class ProductionLotController {
  constructor(private readonly productionLotService: ProductionLotService) {}

  @Post()
  async create(@Body() createProductionLotDto: CreateProductionLotDto): Promise<Object> {
    return await this.productionLotService.create(createProductionLotDto);
  }

  @Get(':planID')
  async findOneByPlan(@Param('planID') planID: string): Promise<Object> {
    return await this.productionLotService.findOneByPlan(planID);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Object> {
    return await this.productionLotService.remove(id);
  }
}
