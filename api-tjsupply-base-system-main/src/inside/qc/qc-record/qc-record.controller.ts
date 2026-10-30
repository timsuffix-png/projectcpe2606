import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { QcRecordService } from './qc-record.service';
import { CreateQcRecordDto } from './dto/create-qc-record.dto';
import { UpdateQcRecordDto } from './dto/update-qc-record.dto';

@Controller('qc/record')
export class QcRecordController {
  constructor(private readonly qcRecordService: QcRecordService) {}

  @Post()
  async create(@Body() createQcRecordDto: CreateQcRecordDto): Promise<Object> {
    return await this.qcRecordService.create(createQcRecordDto);
  }

  @Get()
  async findAll(@Query("limit") limit: number, @Query("page") page: number, @Query("like") like: string): Promise<Object> {
    return await this.qcRecordService.findAll(limit, page, like);
  }

  @Get(["serial", "serial/type"])
  async findAllAndSerial(@Query("limit") limit: number, @Query("page") page: number, @Query("like") like: string): Promise<Object> {
    return await this.qcRecordService.findAllAndSerial(limit, page, like);
  }

  @Get("remainingQc/:qcRecordID")
  async remainingQc(@Param("qcRecordID") qcRecordID: string): Promise<Object> {
    return await this.qcRecordService.remainingQc(qcRecordID);
  }

  @Post("findBySerialNumber")
  async findOne(@Body("serialNumber") serialNumber: string): Promise<Object> {
    return await this.qcRecordService.findOne(serialNumber);
  }

  @Delete(':qcRecordID')
  async remove(@Param('qcRecordID') qcRecordID: string): Promise<Object> {
    return await this.qcRecordService.remove(qcRecordID);
  }
}
