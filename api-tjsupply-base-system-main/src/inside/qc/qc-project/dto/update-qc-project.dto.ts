import { PartialType } from '@nestjs/mapped-types';
import { CreateQcProjectDto } from './create-qc-project.dto';

export class UpdateQcProjectDto extends PartialType(CreateQcProjectDto) {}
