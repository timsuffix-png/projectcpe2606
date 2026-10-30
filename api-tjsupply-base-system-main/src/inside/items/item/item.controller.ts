import { Controller, Get, Post, Body, Patch, Param, Delete, Query, BadRequestException, UploadedFile, UseInterceptors, StreamableFile } from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { randomUUID } from 'crypto';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('items')
export class ItemController {
  constructor(
    private readonly itemService: ItemService,
  ) {}

  @Post()
  async create(@Body() createItemDto: CreateItemDto): Promise<Object> {
    return await this.itemService.create(createItemDto);
  }

  @Get()
  async findAll(@Query("limit") limit: number, @Query("page") page: number, @Query("like") like: string, @Query("material") material: string): Promise<Object> {
    return await this.itemService.findAll(limit, page, like, material);
  }

  @Get("waiting")
  async waitingForConstructList(@Query("like") like: string): Promise<Object>{
    return await this.itemService.waitingForConstructList(like)
  }

  @Get("construct/:itemID")
  async constructListByItemID(@Param("itemID") itemID: string, @Query("limit") limit: number, @Query("page") page: number, @Query("status") status: string, @Query("like") like: string): Promise<Object>{
    return await this.itemService.constructListByItemID(itemID, limit, page, status, like)
  }

  @Get(":itemID")
  async findOne(@Param("itemID") itemID: string): Promise<Object> {
    return await this.itemService.findOne(itemID);
  }

  @Patch(':itemID')
  async update(@Param('itemID') itemID: string, @Body() updateItemDto: UpdateItemDto): Promise<Object> {
    return await this.itemService.update(itemID, updateItemDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Object> {
    return await this.itemService.remove(id);
  }

  @Patch("favourite/:id")
  async favourite(@Param("id") id: string): Promise<Object> {
    return await this.itemService.favourite(id)
  }

  @Patch("upload/itemImage/:itemID")
  @UseInterceptors(FileInterceptor("file", {
    storage: diskStorage({
      destination: "./upload/item",
      filename(req, file, callback) {
        const newFileName = randomUUID()+extname(file.originalname)
        callback(null, newFileName)
      },
    }),
    limits: {
      fileSize: 5*1024*1024
    },
    fileFilter(req, file, callback) {
      if (!["image/jpeg", "image/png", "image/bmp", "image/webp"].includes(file.mimetype)) return callback(new BadRequestException("Invalid file format",), false)
      callback(null, true)
    },
  }))
  async uploadItemImage(@UploadedFile() file: Express.Multer.File, @Param("itemID") itemID: string): Promise<Object>{
    return await this.itemService.uploadItemImage(file, itemID)
  }

  @Get("upload/itemImage/:itemID")
  async getItemImage(@Param("itemID") itemID: string): Promise<StreamableFile>{
    return await this.itemService.getItemImage(itemID)
  }
}
