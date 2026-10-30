import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { QcTypeService } from './qc-type.service';
import { CreateQcTypeDto } from './dto/create-qc-type.dto';
import { UpdateQcTypeDto } from './dto/update-qc-type.dto';

@Controller('qc/type')
export class QcTypeController {
  constructor(private readonly qcTypeService: QcTypeService) {}

  @Post()
  async create(@Body() createQcTypeDto: CreateQcTypeDto): Promise<Object> {
    return await this.qcTypeService.create(createQcTypeDto);
  }

  @Get()
  async findAll(@Query("limit") limit: number, @Query("page") page: number): Promise<Object> {
    return await this.qcTypeService.findAll(limit, page);
  }

  @Get(":qcTypeID")
  async findOne(@Param("qcTypeID") qcTypeID: string): Promise<Object> {
    return await this.qcTypeService.findOne(qcTypeID);
  }

  @Patch(":qcTypeID")
  async update(@Param("qcTypeID") qcTypeID: string, @Body() updateQcTypeDto: UpdateQcTypeDto): Promise<Object> {
    return await this.qcTypeService.update(qcTypeID, updateQcTypeDto);
  }

  @Delete(':qcTypeID')
  async remove(@Param('qcTypeID') qcTypeID: string): Promise<Object> {
    return await this.qcTypeService.remove(qcTypeID);
  }
}
