import { Item } from "src/inside/items/item/entities/item.entity"
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { FormulaItem } from "../../formula-item/entities/formula-item.entity"
import { ProductionSub } from "src/inside/plan/production-sub/entities/production-sub.entity"
import * as moment from "moment-timezone"

@Entity()
export class FormulaProject {
  @PrimaryGeneratedColumn("uuid")
  ID: string

  @Column("varchar", {length: 50, nullable: false})
  name: string

  @Column("numeric", {transformer: {to: (value:number)=>value, from: (value:string)=>parseFloat(value)}, nullable: false})
  costFormula: number

  @Column("varchar", {length: 200, nullable: true})
  detail: string

  @CreateDateColumn({type: "timestamp", transformer: {to: (time: string)=>time, from: (time: string)=>moment(time).tz("Asia/Bangkok").format("YYYY-MM-DDTHH:mm:ss")}, nullable: false})
  createdAt: string

  @UpdateDateColumn({type: "timestamp", transformer: {to: (time: string)=>time, from: (time: string)=>moment(time).tz("Asia/Bangkok").format("YYYY-MM-DDTHH:mm:ss")}, nullable: true})
  updatedAt: string

  @OneToMany(type=>FormulaItem, formulaItem=>formulaItem.formulaProject, {nullable: false, onDelete: "CASCADE", onUpdate: "RESTRICT"})
  formulaItem: FormulaItem[]

  @ManyToOne(type=>Item, items=>items.formulaProject, {nullable: false, onDelete: "CASCADE", onUpdate: "RESTRICT"})
  toItem: Item

  @OneToMany(type=>ProductionSub, productionSub=>productionSub.formulaProject, {nullable: false, onDelete: "CASCADE", onUpdate: "RESTRICT"})
  productionSub: ProductionSub[]
}
