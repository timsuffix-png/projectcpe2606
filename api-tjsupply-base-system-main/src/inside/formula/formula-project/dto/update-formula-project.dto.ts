import { PartialType } from '@nestjs/mapped-types';
import { CreateFormulaProjectDto } from './create-formula-project.dto';

export class UpdateFormulaProjectDto extends PartialType(CreateFormulaProjectDto) {
  ID: string
}
