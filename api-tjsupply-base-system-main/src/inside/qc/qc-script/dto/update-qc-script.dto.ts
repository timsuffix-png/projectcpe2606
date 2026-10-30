import { PartialType } from '@nestjs/mapped-types';
import { CreateQcScriptDto } from './create-qc-script.dto';

export class UpdateQcScriptDto extends PartialType(CreateQcScriptDto) {}
