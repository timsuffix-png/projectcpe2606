import { QcMain } from "../../qc-main/entities/qc-main.entity"
import { QcRecord } from "../../qc-record/entities/qc-record.entity"

export class CreateQcRecordStatusDto {
  qcRecordID: QcRecord

  qcMainID: QcMain

  result: string

  status: string

  detail: string
}
