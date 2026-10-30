import * as moment from "moment-timezone"
import { PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, Entity } from "typeorm"
import { ProductionLot } from "../../production-lot/entities/production-lot.entity"

@Entity()
export class ProductionPlan {
  @PrimaryGeneratedColumn("uuid")
  ID: string

  @Column("varchar", {length: 100, nullable: false})
  planName: string

  @Column("timestamp", {transformer: {to: (time: string)=>time, from: (time: string)=>moment(time).tz("Asia/Bangkok").format("YYYY-MM-DDTHH:mm:ss")}, nullable: false})
  startDate: string

  @Column("timestamp", {transformer: {to: (time: string)=>time, from: (time: string)=>moment(time).tz("Asia/Bangkok").format("YYYY-MM-DDTHH:mm:ss")}, nullable: false})
  endDate: string

  @Column("varchar", {length: 200, nullable: true})
  detail: string

  @Column("varchar", {length: 50, nullable: false, default: "open"})
  status: string

  @CreateDateColumn({type: "timestamp", transformer: {to: (time: string)=>time, from: (time: string)=>moment(time).tz("Asia/Bangkok").format("YYYY-MM-DDTHH:mm:ss")}, nullable: false})
  createdAt: string

  @OneToMany(type=>ProductionLot, productionLot=>productionLot.productionPlan, {nullable: false, onDelete: "CASCADE", onUpdate: "RESTRICT"})
  productionLot: ProductionLot[]
}
