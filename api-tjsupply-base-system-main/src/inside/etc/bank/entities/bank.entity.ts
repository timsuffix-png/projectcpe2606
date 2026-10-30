import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as moment from "moment-timezone"

@Entity()
export class Bank {
  @PrimaryGeneratedColumn("uuid")
  ID: string

  @Column("bit", {nullable: false})
  type: number

  @Column("decimal", {nullable: false})
  value: number

  @CreateDateColumn({type: "timestamp", transformer: {to: (time: string)=>time, from: (time: string)=>moment(time).tz("Asia/Bangkok").format("YYYY-MM-DDTHH:mm:ss")}, nullable: false})
  createdAt: string
}
