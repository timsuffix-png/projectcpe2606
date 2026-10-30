import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { QcItemProjectService } from './qc-item-project.service';
import { CreateQcItemProjectDto } from './dto/create-qc-item-project.dto';
import { UpdateQcItemProjectDto } from './dto/update-qc-item-project.dto';
import { CreateQcItemProjectMultiDto } from './dto/create-qc-item-project-multi.dto';

@Controller('qc/itemProject')
export class QcItemProjectController {
  constructor(private readonly qcItemProjectService: QcItemProjectService) {}

  @Post()
  async create(@Body() createQcItemProjectDto: CreateQcItemProjectDto): Promise<Object> {
    return await this.qcItemProjectService.create(createQcItemProjectDto);
  }

  @Post("multi")
  async createMulti(@Body() createQcItemProjectMultiDto: CreateQcItemProjectMultiDto): Promise<Object> {
    return await this.qcItemProjectService.createMulti(createQcItemProjectMultiDto);
  }

  @Get(":qcProjectID")
  async findOne(@Param("qcProjectID") qcProjectID: string): Promise<Object> {
    return await this.qcItemProjectService.findOne(qcProjectID);
  }

  @Delete(':qcItemProjectID')
  async remove(@Param('qcItemProjectID') qcItemProjectID: string): Promise<Object> {
    return await this.qcItemProjectService.remove(qcItemProjectID);
  }
}
