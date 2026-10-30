import { PartialType } from '@nestjs/mapped-types';
import { CreateFormulaItemDto } from './create-formula-item.dto';

export class UpdateFormulaItemDto extends PartialType(CreateFormulaItemDto) {}
