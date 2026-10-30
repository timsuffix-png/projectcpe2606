import { PartialType } from '@nestjs/mapped-types';
import { CreateUserActionDto } from './create-user-action.dto';

export class UpdateUserActionDto extends PartialType(CreateUserActionDto) {}
