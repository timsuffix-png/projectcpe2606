import { Length } from "class-validator"
import { QcType } from "../../qc-type/entities/qc-type.entity"

export class CreateQcMainDto {
  qcType: QcType

  @Length(1, 100)
  testName: string

  detail: string

  script: JSON
}
