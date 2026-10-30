import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { CreateItemModelDto } from './dto/create-item-model.dto';
import { UpdateItemModelDto } from './dto/update-item-model.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemModel } from './entities/item-model.entity';

@Injectable()
export class ItemModelService {
  
}
