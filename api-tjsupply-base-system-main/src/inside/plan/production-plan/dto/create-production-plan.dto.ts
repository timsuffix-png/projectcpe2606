import { ProductionLot } from "../../production-lot/entities/production-lot.entity"

export class CreateProductionPlanDto {
  planName: string

  startDate: string

  endDate: string

  detail: string

  productionLot: ProductionLot[]
}
