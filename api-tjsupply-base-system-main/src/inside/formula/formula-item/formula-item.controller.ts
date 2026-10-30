import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FormulaItemService } from './formula-item.service';
import { CreateFormulaItemDto } from './dto/create-formula-item.dto';
import { UpdateFormulaItemDto } from './dto/update-formula-item.dto';

@Controller('formula/material')
export class FormulaItemController {
  constructor(private readonly formulaItemService: FormulaItemService) {}

  @Post()
  async create(@Body() createFormulaItemDto: CreateFormulaItemDto): Promise<Object> {
    return await this.formulaItemService.create(createFormulaItemDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Object> {
    return await this.formulaItemService.remove(id);
  }
}
