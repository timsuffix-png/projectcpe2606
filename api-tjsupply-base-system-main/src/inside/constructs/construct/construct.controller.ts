import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ConstructService } from './construct.service';
import { CreateConstructDto } from './dto/create-construct.dto';
import { UpdateConstructPerPieceDto } from './dto/update-construct-per-piece.dto';
import { UpdateConstructPerLotDto } from './dto/update-construct-per-lot.dto';

@Controller('construct')
export class ConstructController {
  constructor(private readonly constructService: ConstructService) {}

  @Get()
  async findAll(@Query("limit") limit: number, @Query("page") page: number, @Query("like") like: string): Promise<Object> {
    return await this.constructService.findAll(limit, page, like);
  }

  @Get("current")
  async findAllByCurrentDate(@Query("limit") limit: number, @Query("page") page: number, @Query("like") like: string): Promise<Object> {
    return await this.constructService.findAllByCurrentDate(limit, page, like);
  }

  @Post("encrypt")
  async findOneByEncrypt(@Body('encryptSerialNumber') encryptSerialNumber: string): Promise<Object> {
    return await this.constructService.findOneByEncrypt(encryptSerialNumber);
  }

  @Post('registerProduct')
  async registerProduct(@Body('encryptSerialNumber') encryptSerialNumber: string): Promise<Object> {
    return await this.constructService.registerProduct(encryptSerialNumber);
  }

  @Get(':serialNumber')
  async findOne(@Param('serialNumber') serialNumber: string): Promise<Object> {
    return await this.constructService.findOne(serialNumber);
  }

  @Patch('perPiece')
  async updatePerPiece(@Body() updateConstructDto: UpdateConstructPerPieceDto): Promise<Object> {
    return await this.constructService.updatePerPiece(updateConstructDto);
  }

  @Patch('perLot')
  async updatePerLot(@Body() updateConstructDto: UpdateConstructPerLotDto): Promise<Object> {
    return await this.constructService.updatePerLot(updateConstructDto);
  }

  @Delete(':serialNumber')
  async remove(@Param('serialNumber') serialNumber: string): Promise<Object> {
    return await this.constructService.remove(serialNumber);
  }
}
