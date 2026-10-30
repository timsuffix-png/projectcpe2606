import { Module } from '@nestjs/common';
import { FormulaItemService } from './formula-item.service';
import { FormulaItemController } from './formula-item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormulaItem } from './entities/formula-item.entity';
import { FormulaProject } from '../formula-project/entities/formula-project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FormulaItem, FormulaProject])],
  controllers: [FormulaItemController],
  providers: [FormulaItemService],
})
export class FormulaItemModule {}
