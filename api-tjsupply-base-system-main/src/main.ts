import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './etc/http-exception/http-exception.filter';
import { ValidationPipe } from './etc/validation/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api/v1")
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalFilters(new HttpExceptionFilter())
  app.enableCors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
  })
  const express = require('express');
  const path = require('path');
  app.use('/public', express.static(path.resolve(process.cwd(), '../TJ-supply-gateway/public')));
  await app.listen(3021);
}
bootstrap();
