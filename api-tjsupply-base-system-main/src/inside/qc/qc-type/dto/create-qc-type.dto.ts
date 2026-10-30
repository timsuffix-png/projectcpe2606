import { Length } from "class-validator";

export class CreateQcTypeDto {
  @Length(1, 20)
  name: string
}
