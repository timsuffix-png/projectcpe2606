import { ProductionPlan } from "../../production-plan/entities/production-plan.entity"
import { ProductionSub } from "../../production-sub/entities/production-sub.entity"

export class CreateProductionLotDto {
  productionPlan: ProductionPlan

  name: string
  
  productionSub: ProductionSub[]
}
