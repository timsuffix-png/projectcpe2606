import { QcMain } from "../../qc-main/entities/qc-main.entity"

export class CreateQcScriptDto {
  qcMainID: QcMain

  script: JSON
}
