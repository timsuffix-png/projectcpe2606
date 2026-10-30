import { PartialType } from '@nestjs/mapped-types';
import { CreateConstructDto } from './create-construct.dto';
import { UsersProducer } from 'src/inside/user/entities/usersProducer.entity';
import { Construct } from '../entities/construct.entity';

export class UpdateConstructPerPieceDto extends PartialType(CreateConstructDto) {
  serialNumber: Construct

  producedBy: UsersProducer
}
