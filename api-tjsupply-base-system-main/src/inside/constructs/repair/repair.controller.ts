import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RepairService } from './repair.service';
import { CreateRepairDto } from './dto/create-repair.dto';
import { UpdateRepairDto } from './dto/update-repair.dto';

@Controller('constructs/repair')
export class RepairController {
  constructor(private readonly repairService: RepairService) {}

  @Post()
  async create(@Body() createRepairDto: CreateRepairDto): Promise<Object> {
    return await this.repairService.create(createRepairDto);
  }

  @Get()
  async findAll(@Query("limit") limit: number, @Query("page") page: number): Promise<Object> {
    return await this.repairService.findAll(limit, page);
  }

  @Get(':repairID')
  async findOne(@Param('repairID') repairID: string): Promise<Object> {
    return await this.repairService.findOne(repairID);
  }

  @Get('all/:constructID')
  async findAllByConstructID(@Param('constructID') constructID: string): Promise<Object> {
    return await this.repairService.findAllByConstructID(constructID);
  }
}
