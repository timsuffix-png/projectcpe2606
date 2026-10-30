import { IsNotEmpty } from "class-validator"
import { QcMain } from "../../qc-main/entities/qc-main.entity"
import { QcProject } from "../../qc-project/entities/qc-project.entity"

export class CreateQcItemProjectDto {
  @IsNotEmpty()
  qcMain: QcMain

  @IsNotEmpty()
  qcProject: QcProject
}
