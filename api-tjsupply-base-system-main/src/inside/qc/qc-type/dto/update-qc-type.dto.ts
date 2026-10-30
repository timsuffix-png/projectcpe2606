import { PartialType } from '@nestjs/mapped-types';
import { CreateQcTypeDto } from './create-qc-type.dto';

export class UpdateQcTypeDto extends PartialType(CreateQcTypeDto) {}
