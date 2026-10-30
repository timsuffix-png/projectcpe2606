import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { QcMain } from "../../qc-main/entities/qc-main.entity"

export class CreateQcItemProjectMultiDto {
  @IsNotEmpty()
  @IsString()
  projectName: string

  @IsOptional()
  @IsString()
  detail: string

  @IsArray()
  qcMainID: QcMain[]
}
