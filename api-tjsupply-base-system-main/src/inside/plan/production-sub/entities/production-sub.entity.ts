import { Construct } from "src/inside/constructs/construct/entities/construct.entity"
import { FormulaProject } from "src/inside/formula/formula-project/entities/formula-project.entity"
import { PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, Entity } from "typeorm"
import { ProductionLot } from "../../production-lot/entities/production-lot.entity"

@Entity()
export class ProductionSub {
  @PrimaryGeneratedColumn("uuid")
  ID: string

  @Column("int", {nullable: false})
  amountRequire: number

  @Column("int", {nullable: false, default: 0})
  amountCurrent: number

  @ManyToOne(type=>ProductionLot, productionLot=>productionLot.productionSub, {nullable: false, onDelete: "CASCADE", onUpdate: "RESTRICT"})
  productionLot: ProductionLot

  @ManyToOne(type=>FormulaProject, formulaProject=>formulaProject.productionSub, {nullable: false, onDelete: "CASCADE", onUpdate: "RESTRICT"})
  formulaProject: FormulaProject

  @OneToMany(type=>Construct, construct=>construct.productionSub, {nullable: false, onDelete: "CASCADE", onUpdate: "RESTRICT"})
  construct: Construct[]
}
