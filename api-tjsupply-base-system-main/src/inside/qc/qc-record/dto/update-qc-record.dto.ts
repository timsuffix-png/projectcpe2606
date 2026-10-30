import { PartialType } from '@nestjs/mapped-types';
import { CreateQcRecordDto } from './create-qc-record.dto';

export class UpdateQcRecordDto extends PartialType(CreateQcRecordDto) {}
