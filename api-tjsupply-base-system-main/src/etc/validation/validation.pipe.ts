import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)){
      return value
    }
    const object = plainToInstance(metatype, value)
    const errors = await validate(object, { forbidUnknownValues: false })
    if (errors.length > 0){
      for(let error of errors){
        console.log()
        throw new HttpException(error.constraints[Object.getOwnPropertyNames(error.constraints)[0]], HttpStatus.BAD_REQUEST)
      }
    }
    return value
  }

  private toValidate(metatype: Function): Boolean{
    const types: Function[] = [String, Boolean, Number, Array, Object]
    return !types.includes(metatype)
  }
}