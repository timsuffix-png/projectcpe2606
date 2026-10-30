import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { QcProjectService } from './qc-project.service';
import { CreateQcProjectDto } from './dto/create-qc-project.dto';
import { UpdateQcProjectDto } from './dto/update-qc-project.dto';

@Controller('qc/project')
export class QcProjectController {
  constructor(private readonly qcProjectService: QcProjectService) {}

  @Post()
  async create(@Body() createQcProjectDto: CreateQcProjectDto): Promise<Object> {
    return await this.qcProjectService.create(createQcProjectDto);
  }

  @Get()
  async findAll(@Query("limit") limit: number, @Query("page") page: number): Promise<Object> {
    return await this.qcProjectService.findAll(limit, page);
  }

  @Get("extend")
  async findAllExtend(@Query("limit") limit: number, @Query("page") page: number): Promise<Object> {
    return await this.qcProjectService.findAllExtend(limit, page);
  }

  @Patch(':qcProjectID')
  async update(@Param('qcProjectID') qcProjectID: string, @Body() updateQcProjectDto: UpdateQcProjectDto): Promise<Object> {
    return await this.qcProjectService.update(qcProjectID, updateQcProjectDto);
  }

  @Delete(':qcProjectID')
  async remove(@Param('qcProjectID') qcProjectID: string): Promise<Object> {
    return await this.qcProjectService.remove(qcProjectID);
  }
}
