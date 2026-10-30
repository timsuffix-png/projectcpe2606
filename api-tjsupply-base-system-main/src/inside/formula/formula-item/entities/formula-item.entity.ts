import { Item } from "src/inside/items/item/entities/item.entity"
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { FormulaProject } from "../../formula-project/entities/formula-project.entity"

@Entity()
export class FormulaItem {
  @PrimaryGeneratedColumn("uuid")
  ID: string
  
  @Column("int", {nullable: true})
  amount: number

  @ManyToOne(type=>FormulaProject, formulaProject=>formulaProject.formulaItem, {nullable: false, onDelete: "CASCADE", onUpdate: "RESTRICT"})
  formulaProject: FormulaProject

  @ManyToOne(type=>Item, items=>items.formulaItem, {nullable: false, onDelete: "CASCADE", onUpdate: "RESTRICT"})
  item: Item
}
