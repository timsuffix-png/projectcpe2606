import { Item } from "src/inside/items/item/entities/item.entity"

export class CreateFormulaProjectDto {
  name: string

  costFormula: number

  detail: string

  toItem: Item

  material: Object[]
}
