import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ItemModelService } from './item-model.service';
import { CreateItemModelDto } from './dto/create-item-model.dto';
import { UpdateItemModelDto } from './dto/update-item-model.dto';

@Controller('item-model')
export class ItemModelController {
  
}
