import { PartialType } from '@nestjs/mapped-types';
import { CreateQcItemProjectDto } from './create-qc-item-project.dto';

export class UpdateQcItemProjectDto extends PartialType(CreateQcItemProjectDto) {}
