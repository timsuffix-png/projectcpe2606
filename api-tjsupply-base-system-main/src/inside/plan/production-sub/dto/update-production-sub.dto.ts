import { PartialType } from '@nestjs/mapped-types';
import { CreateProductionSubDto } from './create-production-sub.dto';

export class UpdateProductionSubDto extends PartialType(CreateProductionSubDto) {}
