import { Length } from "class-validator"

export class CreateQcProjectDto {
  @Length(1, 100)
  projectName: string

  detail: string
}
