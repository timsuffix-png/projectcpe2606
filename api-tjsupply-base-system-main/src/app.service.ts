import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): Object {
    return {
      error: false, 
      message: "Welcome to New Restful API with Nestjs for TJ-SUPPLY",
      writtenBy: "Thanadej Phrompornchai"
    }
  }
}
