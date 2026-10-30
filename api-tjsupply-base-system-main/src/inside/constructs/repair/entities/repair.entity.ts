import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import * as moment from "moment-timezone"
import { UsersProducer } from "src/inside/user/entities/usersProducer.entity";
import { Construct } from "../../construct/entities/construct.entity";

@Entity()
export class Repair {
  @PrimaryGeneratedColumn("uuid")
  ID: string

  @CreateDateColumn({type: "timestamp", transformer: {to: (time: string)=>time, from: (time: string)=>moment(time).tz("Asia/Bangkok").format("YYYY-MM-DDTHH:mm:ss")}, nullable: false})
  createdAt: string

  @ManyToOne(type=>UsersProducer, usersProducer=>usersProducer.repairBy, {nullable: false, onDelete: "CASCADE", onUpdate: "RESTRICT"})
  repairBy: UsersProducer

  @ManyToOne(type=>Construct, construct=>construct.repair, {nullable: false, onDelete: "CASCADE", onUpdate: "RESTRICT"})
  construct: Construct
}
