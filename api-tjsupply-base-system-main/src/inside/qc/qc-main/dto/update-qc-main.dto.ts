import { PartialType } from '@nestjs/mapped-types';
import { CreateQcMainDto } from './create-qc-main.dto';

export class UpdateQcMainDto extends PartialType(CreateQcMainDto) {}
