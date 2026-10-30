import { PartialType } from '@nestjs/mapped-types';
import { CreateItemModelDto } from './create-item-model.dto';

export class UpdateItemModelDto extends PartialType(CreateItemModelDto) {}
