import { IsEmail } from "class-validator"

export class CreateUserDto {
  username: string

  password: string

  name: string

  surname: string
  
  role: string

  @IsEmail()
  email: string

  gender: string

  path2picture: string

  phone: string

  address: string

  birthday: Date

  dateEmployment: Date
}
