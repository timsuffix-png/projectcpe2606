import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { QcMainService } from './qc-main.service';
import { CreateQcMainDto } from './dto/create-qc-main.dto';
import { UpdateQcMainDto } from './dto/update-qc-main.dto';

@Controller('qc/main')
export class QcMainController {
  constructor(private readonly qcMainService: QcMainService) {}

  @Post()
  async create(@Body() createQcMainDto: CreateQcMainDto): Promise<Object> {
    return await this.qcMainService.create(createQcMainDto);
  }

  @Get()
  async findAll(@Query("limit") limit: number, @Query("page") page: number): Promise<Object> {
    return await this.qcMainService.findAll(limit, page);
  }

  @Get(':qcMainID')
  async findOne(@Param('qcMainID') qcMainID: string): Promise<Object> {
    return await this.qcMainService.findOne(qcMainID);
  }

  @Patch(':qcMainID')
  async update(@Param('qcMainID') qcMainID: string, @Body() updateQcMainDto: UpdateQcMainDto): Promise<Object> {
    return await this.qcMainService.update(qcMainID, updateQcMainDto);
  }

  @Delete(':qcMainID')
  async remove(@Param('qcMainID') qcMainID: string): Promise<Object> {
    return await this.qcMainService.remove(qcMainID);
  }
}
