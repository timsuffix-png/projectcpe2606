import { IsInt, Min } from "class-validator"

export class CreatePicknpayGoodDto {
  itemID: string

  borrowBy: string

  spendBy: string

  @IsInt()
  @Min(1)
  amount: number

  createdAt: string

  status: string
}
