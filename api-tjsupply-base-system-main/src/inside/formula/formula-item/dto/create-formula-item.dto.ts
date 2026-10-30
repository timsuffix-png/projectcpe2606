import { FormulaProject } from "../../formula-project/entities/formula-project.entity"
import { FormulaItem } from "../entities/formula-item.entity"

export class CreateFormulaItemDto {
  formulaProject: FormulaProject

  material: FormulaItem[]
}
