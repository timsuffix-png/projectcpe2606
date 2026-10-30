import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PicknpayGoodsService } from './picknpay-goods.service';
import { CreatePicknpayGoodDto } from './dto/create-picknpay-good.dto';
import { UpdatePicknpayGoodDto } from './dto/update-picknpay-good.dto';

@Controller('item/picknpay')
export class PicknpayGoodsController {
  constructor(private readonly picknpayGoodsService: PicknpayGoodsService) {}

  @Post("")
  async create(@Body() createPicknpayGoodDto: CreatePicknpayGoodDto): Promise<Object> {
    return await this.picknpayGoodsService.create(createPicknpayGoodDto);
  }

  @Get("")
  async findAll(@Query("type") type: string, @Query("limit") limit: number, @Query("page") page: number): Promise<Object> {
    return await this.picknpayGoodsService.findAll(type, limit, page);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Query("limit") limit: number, @Query("page") page: number, @Query("type") type: string): Promise<Object> {
    return await this.picknpayGoodsService.findOne(id, limit, page, type);
  }

  @Patch("")
  async update(@Body() UpdatePicknpayGoodDto: UpdatePicknpayGoodDto): Promise<Object> {
    return await this.picknpayGoodsService.update(UpdatePicknpayGoodDto)
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Object> {
    return await this.picknpayGoodsService.remove(id);
  }
}
