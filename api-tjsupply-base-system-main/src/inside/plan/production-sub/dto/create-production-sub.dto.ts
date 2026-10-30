import { IsInt, Min } from "class-validator"
import { ProductionLot } from "../../production-lot/entities/production-lot.entity"
import { FormulaProject } from "src/inside/formula/formula-project/entities/formula-project.entity"

export class CreateProductionSubDto {
  productionLot: ProductionLot

  formulaProject: FormulaProject

  @IsInt()
  @Min(1)
  amountRequire: number
}
