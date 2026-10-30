import { IsInt, Min } from "class-validator"

export class CreateOrderNumberDto {
  itemID: string
  
  buyByID: string

  @Min(0)
  costPerItem: number

  @IsInt()
  @Min(1)
  amount: number
}