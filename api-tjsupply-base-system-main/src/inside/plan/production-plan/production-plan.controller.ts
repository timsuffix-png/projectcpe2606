import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductionPlanService } from './production-plan.service';
import { CreateProductionPlanDto } from './dto/create-production-plan.dto';
import { UpdateProductionPlanDto } from './dto/update-production-plan.dto';

@Controller('plan')
export class ProductionPlanController {
  constructor(private readonly productionPlanService: ProductionPlanService) {}

  @Post()
  async create(@Body() createProductionPlanDto: CreateProductionPlanDto): Promise<Object> {
    return await this.productionPlanService.create(createProductionPlanDto);
  }

  @Get()
  async findAll(): Promise<Object> {
    return await this.productionPlanService.findAll();
  }

  @Get("history")
  async findAllHistory(@Query("limit") limit: number, @Query("page") page: number): Promise<Object> {
    return await this.productionPlanService.findAllHistory(limit, page);
  }

  @Get("barcode/:planID")
  async findBarcodeByPlanID(@Param("planID") planID: string, @Query("limit") limit: number, @Query("page") page: number): Promise<Object> {
    return await this.productionPlanService.findBarcodeByPlanID(planID, limit, page);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Object> {
    return await this.productionPlanService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Object> {
    return await this.productionPlanService.remove(id);
  }
}
