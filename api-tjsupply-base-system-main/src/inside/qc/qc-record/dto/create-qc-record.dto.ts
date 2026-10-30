import { Construct } from "src/inside/constructs/construct/entities/construct.entity"
import { QcProject } from "../../qc-project/entities/qc-project.entity"
import { UsersProducer } from "src/inside/user/entities/usersProducer.entity"

export class CreateQcRecordDto {

  serialNumber: Construct

  qcProjectID: QcProject

  testBy: UsersProducer
}
