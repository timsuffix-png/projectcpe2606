import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { QcRecordStatusService } from './qc-record-status.service';
import { CreateQcRecordStatusDto } from './dto/create-qc-record-status.dto';
import { UpdateQcRecordStatusDto } from './dto/update-qc-record-status.dto';

@Controller('qc/status')
export class QcRecordStatusController {
  constructor(private readonly qcRecordStatusService: QcRecordStatusService) {}

  @Post()
  async create(@Body() createQcRecordStatusDto: CreateQcRecordStatusDto): Promise<Object> {
    return await this.qcRecordStatusService.create(createQcRecordStatusDto);
  }

  @Get([":qcRecordID", "type/:qcRecordID"])
  async findAll(@Param('qcRecordID') qcRecordID: string, @Query("limit") limit: number, @Query("page") page: number, @Query("type") type: string): Promise<Object> {
    return await this.qcRecordStatusService.findAll(qcRecordID, limit, page, type);
  }

  @Delete(':qcRecordStatusID')
  async remove(@Param('qcRecordStatusID') qcRecordStatusID: string): Promise<Object> {
    return await this.qcRecordStatusService.remove(qcRecordStatusID);
  }
}
