import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import * as moment from "moment-timezone"
import { UsersProducer } from "src/inside/user/entities/usersProducer.entity";

@Entity()
export class UserAction {
  @PrimaryGeneratedColumn("uuid")
  ID: string

  @CreateDateColumn({type: "timestamp", transformer: {to: (time: string)=>time, from: (time: string)=>moment(time).tz("Asia/Bangkok").format("YYYY-MM-DDTHH:mm:ss")}, nullable: false})
  createdAt: string

  @Column("varchar", {length: 20, nullable: false})
  detail: string

  @Column("inet", {nullable: false})
  ip: string

  @ManyToOne(type=>UsersProducer, usersProducer=>usersProducer.userAction, {nullable: false, onDelete: "CASCADE", onUpdate: "RESTRICT"})
  usersProducer: UsersProducer
}
