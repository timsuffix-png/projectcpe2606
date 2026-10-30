import { IsInt, Min } from "class-validator"
import { ItemType } from "../../item-type/entities/item-type.entity"

export class CreateItemDto {
  itemType: ItemType

  isFavourite: boolean

  @IsInt()
  @Min(0)
  amount: number

  @Min(0)
  costPrice: number

  @Min(0)
  salePrice: number

  @IsInt()
  @Min(0)
  insurancePeriod: number

  name: string

  detail: string
}
