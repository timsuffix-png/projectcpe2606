import { PartialType } from '@nestjs/mapped-types';
import { CreateQcRecordStatusDto } from './create-qc-record-status.dto';

export class UpdateQcRecordStatusDto extends PartialType(CreateQcRecordStatusDto) {}
