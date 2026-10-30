import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { OrderNumberService } from './order-number.service';
import { CreateOrderNumberDto } from './dto/create-order-number.dto';
import { UpdateOrderNumberDto } from './dto/update-order-number.dto';

@Controller('item/wantBuy')
export class OrderNumberController {
  constructor(private readonly orderNumberService: OrderNumberService) {}

  @Post("")
  async create(@Body() createOrderNumberDto: CreateOrderNumberDto): Promise<Object>{
    return await this.orderNumberService.create(createOrderNumberDto)
  }

  @Get(":type")
  async findAll(@Param("type") type: string, @Query("limit") limit: number, @Query("page") page: number): Promise<Object>{
    return await this.orderNumberService.findAll(type, limit, page)
  }

  @Delete(":id")
  async remove(@Param("id") id: string): Promise<Object>{
    return await this.orderNumberService.remove(id)
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Query("type") type: string): Promise<Object>{
    return await this.orderNumberService.update(id, type)
  }
}
