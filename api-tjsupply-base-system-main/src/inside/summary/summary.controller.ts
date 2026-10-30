import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SummaryService } from './summary.service';

@Controller('summary')
export class SummaryController {
  constructor(private readonly summaryService: SummaryService) {}

  @Get("item/buildAverage")
  async buildAverage(): Promise<Object>{
    return await this.summaryService.buildAverage();
  }

  @Get("construct/lastUpdate")
  async constructLastUpdate(@Query("limit") limit: number): Promise<Object>{
    return await this.summaryService.constructLastUpdate(limit);
  }

  @Get("construct/overAll")
  async constructOverAll(): Promise<Object>{
    return await this.summaryService.constructOverAll();
  }

  @Get("qc/overAll")
  async qcOverAll(): Promise<Object>{
    return await this.summaryService.qcOverAll();
  }

  @Get("qc/lastUpdate")
  async qcLastUpdate(@Query("limit") limit: number): Promise<Object>{
    return await this.summaryService.qcLastUpdate(limit);
  }

  @Get("qc/lessFail")
  async qcLessFail(@Query("limit") limit: number): Promise<Object>{
    return await this.summaryService.qcLessFail(limit);
  }

  @Get("qc/mostFail")
  async qcMostFail(@Query("limit") limit: number): Promise<Object>{
    return await this.summaryService.qcMostFail(limit);
  }

  @Get("productTopSale")
  async productTopSale(@Query("limit") limit: number): Promise<Object>{
    return await this.summaryService.productTopSale(limit);
  }

  @Get("qc/eachQcPassFailCount")
  async eachQcPassFailCount(): Promise<Object>{
    return await this.summaryService.eachQcPassFailCount();
  }

  @Get("productDemand")
  async productDemand(): Promise<Object>{
    return await this.summaryService.productDemand();
  }

  @Get("statement")
  async statement(): Promise<Object>{
    return await this.summaryService.statement();
  }

  @Get("item/picknpayCount")
  async picknpayCount(@Query("limit") limit: number, @Query("filter") filter: string): Promise<Object>{
    return await this.summaryService.picknpayCount(limit, filter);
  }

  @Get("topWorker")
  async topWorker(@Query("limit") limit: number): Promise<Object>{
    return await this.summaryService.topWorker(limit);
  }
}
