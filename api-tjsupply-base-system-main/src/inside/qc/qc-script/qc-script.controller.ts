import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QcScriptService } from './qc-script.service';
import { CreateQcScriptDto } from './dto/create-qc-script.dto';
import { UpdateQcScriptDto } from './dto/update-qc-script.dto';

@Controller('qc/script')
export class QcScriptController {
  constructor(private readonly qcScriptService: QcScriptService) {}

  @Post()
  async create(@Body() createQcScriptDto: CreateQcScriptDto): Promise<Object> {
    return await this.qcScriptService.create(createQcScriptDto);
  }

  @Get(':qcMainID')
  async findOne(@Param('qcMainID') qcMainID: string): Promise<Object> {
    return await this.qcScriptService.findOne(qcMainID);
  }

  @Patch(':qcMainID')
  async update(@Param('qcMainID') qcMainID: string, @Body() updateQcScriptDto: UpdateQcScriptDto): Promise<Object> {
    return await this.qcScriptService.update(qcMainID, updateQcScriptDto);
  }
}
