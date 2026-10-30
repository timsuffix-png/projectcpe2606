import { Module } from '@nestjs/common';
import { FormulaProjectService } from './formula-project.service';
import { FormulaProjectController } from './formula-project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormulaProject } from './entities/formula-project.entity';
import { FormulaItem } from '../formula-item/entities/formula-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FormulaProject, FormulaItem])],
  controllers: [FormulaProjectController],
  providers: [FormulaProjectService],
})
export class FormulaProjectModule {}
