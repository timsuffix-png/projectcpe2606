import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderNumberDto } from './create-order-number.dto';

export class UpdateOrderNumberDto extends PartialType(CreateOrderNumberDto) {}
