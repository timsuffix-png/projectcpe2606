import { PartialType } from '@nestjs/mapped-types';
import { CreatePicknpayGoodDto } from './create-picknpay-good.dto';

export class UpdatePicknpayGoodDto extends PartialType(CreatePicknpayGoodDto) {
  picknpayID: string
}
