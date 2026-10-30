import { PartialType } from '@nestjs/mapped-types';
import { CreateConstructDto } from './create-construct.dto';
import { ProductionLot } from 'src/inside/plan/production-lot/entities/production-lot.entity';
import { UsersProducer } from 'src/inside/user/entities/usersProducer.entity';

export class UpdateConstructPerLotDto extends PartialType(CreateConstructDto) {
  lot: ProductionLot

  producedBy: UsersProducer
}
