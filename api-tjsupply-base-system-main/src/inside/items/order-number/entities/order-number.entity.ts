import { UsersProducer } from "src/inside/user/entities/usersProducer.entity"
import { PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, Entity, UpdateDateColumn } from "typeorm"
import { Item } from "../../item/entities/item.entity"
import * as moment from "moment-timezone"

@Entity()
export class OrderNumber {
  @PrimaryGeneratedColumn("uuid")
  ID: string

  @Column("numeric", {transformer: {to: (value: number)=>value, from: (value: string)=>parseFloat(value)}, nullable: false})
  costPerItem: number

  @Column("int", {nullable: false})
  amount: number

  @CreateDateColumn({type: "timestamp", transformer: {to: (time: string)=>time, from: (time: string)=>moment(time).tz("Asia/Bangkok").format("YYYY-MM-DDTHH:mm:ss")}, nullable: false})
  createdAt: string

  @UpdateDateColumn({type: "timestamp", transformer: {to: (time: string)=>time, from: (time: string)=>moment(time).tz("Asia/Bangkok").format("YYYY-MM-DDTHH:mm:ss")}, nullable: true})
  updatedAt: string

  @Column("varchar", {length: 20, nullable: false, default: "waiting"})
  status: string

  @ManyToOne(type=>UsersProducer, usersProducer=>usersProducer.buyBy, {nullable: false, onDelete: "CASCADE", onUpdate: "RESTRICT"})
  buyBy: UsersProducer

  @ManyToOne(type=>Item, items=>items.orderNumber, {nullable: false, onDelete: "CASCADE", onUpdate: "RESTRICT"})
  item: Item
}
