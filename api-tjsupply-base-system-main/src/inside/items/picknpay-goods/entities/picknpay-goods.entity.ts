import { UsersProducer } from "src/inside/user/entities/usersProducer.entity"
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Item } from "../../item/entities/item.entity"
import * as moment from "moment-timezone"

@Entity()
export class PicknpayGoods {
  @PrimaryGeneratedColumn("uuid")
  ID: string

  @Column("int", {nullable: false})
  amount: number

  @CreateDateColumn({type: "timestamp", transformer: {to: (time: string)=>time, from: (time: string)=>moment(time).tz("Asia/Bangkok").format("YYYY-MM-DDTHH:mm:ss")}, nullable: false})
  createdAt: string

  @UpdateDateColumn({type: "timestamp", transformer: {to: (time: string)=>time, from: (time: string)=>moment(time).tz("Asia/Bangkok").format("YYYY-MM-DDTHH:mm:ss")}, nullable: true})
  updatedAt: string

  @Column("varchar", {length: 3, nullable: false, default: "req"})
  status: string

  @ManyToOne(type=>Item, items=>items.picknpayGoods, {nullable: false, onDelete: "CASCADE", onUpdate: "RESTRICT"})
  item: Item

  @ManyToOne(type=>UsersProducer, usersProducer=>usersProducer.borrowBy, {nullable: false, onDelete: "CASCADE", onUpdate: "RESTRICT"})
  borrowBy: UsersProducer

  @ManyToOne(type=>UsersProducer, usersProducer=>usersProducer.spendBy, {nullable: true, onDelete: "CASCADE", onUpdate: "RESTRICT"})
  spendBy: UsersProducer
}
