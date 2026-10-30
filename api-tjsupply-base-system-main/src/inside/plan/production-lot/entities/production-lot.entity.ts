import { PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, Entity } from "typeorm"
import { ProductionPlan } from "../../production-plan/entities/production-plan.entity"
import { ProductionSub } from "../../production-sub/entities/production-sub.entity"

@Entity()
export class ProductionLot {
  @PrimaryGeneratedColumn("uuid")
  ID: string

  @Column("varchar", {length: 50, nullable: false})
  name: string

  @ManyToOne(type=>ProductionPlan, productionPlan=>productionPlan.productionLot, {nullable: false, onDelete: "CASCADE", onUpdate: "RESTRICT"})
  productionPlan: ProductionPlan

  @OneToMany(type=>ProductionSub, productionSub=>productionSub.productionLot, {nullable: false, onDelete: "CASCADE", onUpdate: "RESTRICT"})
  productionSub: ProductionSub[]
}
