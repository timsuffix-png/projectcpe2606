import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { FormulaProjectService } from './formula-project.service';
import { CreateFormulaProjectDto } from './dto/create-formula-project.dto';
import { UpdateFormulaProjectDto } from './dto/update-formula-project.dto';

@Controller('formula')
export class FormulaProjectController {
  constructor(private readonly formulaProjectService: FormulaProjectService) {}

  @Post()
  async create(@Body() createFormulaProjectDto: CreateFormulaProjectDto): Promise<Object> {
    return await this.formulaProjectService.create(createFormulaProjectDto);
  }

  @Get()
  async findAll(@Query("limit") limit: number, @Query("page") page: number): Promise<Object> {
    return await this.formulaProjectService.findAll(limit, page);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Object> {
    return await this.formulaProjectService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateFormulaProjectDto: UpdateFormulaProjectDto): Promise<Object> {
    return await this.formulaProjectService.update(id, updateFormulaProjectDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Object> {
    return await this.formulaProjectService.remove(id);
  }
}
