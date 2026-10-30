import { Item } from "src/inside/items/item/entities/item.entity";
import { UsersProducer } from "src/inside/user/entities/usersProducer.entity";
import { AfterUpdate, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import * as moment from "moment-timezone"
import { ProductionSub } from "src/inside/plan/production-sub/entities/production-sub.entity";
import { QcRecord } from "src/inside/qc/qc-record/entities/qc-record.entity";
import { Repair } from "../../repair/entities/repair.entity";

@Entity()
export class Construct {
  @PrimaryColumn("varchar", {length: 20})
  ID: string

  @Column("varchar", {length: 64, nullable: false})
  encryptIDValue: string

  @CreateDateColumn({type: "timestamp", transformer: {to: (time: string)=>time, from: (time: string)=>moment(time).tz("Asia/Bangkok").format("YYYY-MM-DDTHH:mm:ss")}, nullable: false})
  createdAt: string

  @UpdateDateColumn({type: "timestamp", transformer: {to: (time: string)=>time, from: (time: string)=>moment(time).tz("Asia/Bangkok").format("YYYY-MM-DDTHH:mm:ss")}, nullable: true})
  updatedAt: string

  @Column("varchar", {length: 20, nullable: false, default: "waiting"})
  status: string

  @ManyToOne(type=>Item, items=>items.construct, {nullable: false, onDelete: "CASCADE", onUpdate: "RESTRICT"})
  item: Item

  @ManyToOne(type=>UsersProducer, usersProducer=>usersProducer.producedBy, {nullable: true, onDelete: "CASCADE", onUpdate: "RESTRICT"})
  producedBy: UsersProducer

  @ManyToOne(type=>ProductionSub, productionSub=>productionSub.construct, {nullable: false, onDelete: "CASCADE", onUpdate: "RESTRICT"})
  productionSub: ProductionSub

  @OneToMany(type=>QcRecord, qcRecord=>qcRecord.construct, {nullable: false, onDelete: "CASCADE", onUpdate: "RESTRICT"})
  qcRecord: QcRecord[]

  @OneToMany(type=>Repair, repair=>repair.construct, {nullable: false, onDelete: "CASCADE", onUpdate: "RESTRICT"})
  repair: Repair[]
}
