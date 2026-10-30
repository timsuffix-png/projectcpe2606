import { PartialType } from '@nestjs/mapped-types';
import { CreateProductionLotDto } from './create-production-lot.dto';

export class UpdateProductionLotDto extends PartialType(CreateProductionLotDto) {}
