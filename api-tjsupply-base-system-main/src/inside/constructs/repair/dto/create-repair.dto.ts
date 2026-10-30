import { UsersProducer } from "src/inside/user/entities/usersProducer.entity";
import { Construct } from "../../construct/entities/construct.entity";

export class CreateRepairDto {
  construct: Construct

  repairBy: UsersProducer
}
