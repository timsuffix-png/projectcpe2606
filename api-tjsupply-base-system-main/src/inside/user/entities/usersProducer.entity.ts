import { Construct } from "src/inside/constructs/construct/entities/construct.entity";
import { OrderNumber } from "src/inside/items/order-number/entities/order-number.entity";
import { PicknpayGoods } from "src/inside/items/picknpay-goods/entities/picknpay-goods.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as moment from "moment-timezone"
import { QcRecord } from "src/inside/qc/qc-record/entities/qc-record.entity";
import { UserAction } from "src/inside/etc/user-action/entities/user-action.entity";
import { Repair } from "src/inside/constructs/repair/entities/repair.entity";

@Entity()
export class UsersProducer {
  @PrimaryGeneratedColumn("uuid")
  ID: string

  @Column("varchar", {unique: true, length: 50, nullable: false})
  username: string

  @Column("varchar", {length: 200, nullable: false})
  password: string

  @Column("varchar", {length: 30, nullable: false})
  name: string

  @Column("varchar", {length: 30, nullable: false})
  surname: string

  @Column("varchar", {length: 10, nullable: false, default: "---w------"})
  role: string

  @Column("varchar", {unique: true, length: 50, nullable: false})
  email: string

  @Column("varchar", {length: 20, nullable: true})
  gender: string

  @Column("varchar", {length: 200, nullable: true})
  path2picture: string

  @Column("varchar", {length: 10, nullable: true})
  phone: string

  @Column("varchar", {length: 200, nullable: true})
  address: string

  @Column("boolean", {nullable: false, default: false})
  approve: boolean

  @Column("timestamp", {
    transformer: {to: (time: string)=>time, from: (time: string)=>moment(time).tz("Asia/Bangkok").format("YYYY-MM-DDTHH:mm:ss")}, 
    default: moment().tz("Asia/Bangkok").format("YYYY-MM-DDTHH:mm:ss")
  })
  birthday: Date

  @Column("timestamp", {
    transformer: {to: (time: string)=>time, from: (time: string)=>moment(time).tz("Asia/Bangkok").format("YYYY-MM-DDTHH:mm:ss")}, 
    default: moment().tz("Asia/Bangkok").format("YYYY-MM-DDTHH:mm:ss")
  })
  dateEmployment: Date

  @CreateDateColumn({type: "timestamp", transformer: {to: (time: string)=>time, from: (time: string)=>moment(time).tz("Asia/Bangkok").format("YYYY-MM-DDTHH:mm:ss")}})
  createdAt: string

  @OneToMany(type=>OrderNumber, orderNumber=>orderNumber.buyBy, {nullable: false, onDelete: "CASCADE", onUpdate: "RESTRICT"})
  buyBy: OrderNumber[]

  @OneToMany(type=>PicknpayGoods, picknpayGoods=>picknpayGoods.borrowBy, {nullable: false, onDelete: "CASCADE", onUpdate: "RESTRICT"})
  borrowBy: PicknpayGoods[]

  @OneToMany(type=>PicknpayGoods, picknpayGoods=>picknpayGoods.spendBy, {nullable: false, onDelete: "CASCADE", onUpdate: "RESTRICT"})
  spendBy: PicknpayGoods[]

  @OneToMany(type=>QcRecord, qcRecord=>qcRecord.testBy, {nullable: false, onDelete: "CASCADE", onUpdate: "RESTRICT"})
  testBy: QcRecord[]

  @OneToMany(type=>Construct, construct=>construct.producedBy, {nullable: false, onDelete: "CASCADE", onUpdate: "RESTRICT"})
  producedBy: Construct[]

  @OneToMany(type=>UserAction, userAction=>userAction.usersProducer, {nullable: false, onDelete: "CASCADE", onUpdate: "RESTRICT"})
  userAction: UserAction[]

  @OneToMany(type=>Repair, repair=>repair.repairBy, {nullable: false, onDelete: "CASCADE", onUpdate: "RESTRICT"})
  repairBy: Repair[]
}
