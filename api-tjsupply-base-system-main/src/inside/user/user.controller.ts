import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, UploadedFile, UseInterceptors, HttpException, HttpStatus, BadRequestException, StreamableFile } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { randomUUID } from 'crypto';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<Object> {
    return await this.userService.create(createUserDto);
  }

  @Get()
  async findAll(@Query("limit") limit: number, @Query("page") page: number, @Query("approve") approve: boolean): Promise<Object> {
    return await this.userService.findAll(limit, page, approve);
  }

  @Get("action")
  async findAllAction(@Query("limit") limit: number, @Query("page") page: number): Promise<Object> {
    return await this.userService.findAllAction(limit, page);
  }

  @Get(":id")
  async findOne(@Param('id') id: string): Promise<Object> {
    return await this.userService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<Object> {
    return await this.userService.update(id, updateUserDto);
  }

  @Patch("password/:id")
  async updatePassword(@Param("id") id: string, @Body() updateUserPasswordDto: UpdateUserPasswordDto): Promise<Object>{
    return await this.userService.updatePassword(id, updateUserPasswordDto)
  }

  @Delete(":id")
  async remove(@Param("id") id: string): Promise<Object> {
    return await this.userService.remove(id);
  }

  @Post("auth")
  async auth(@Body("username") username: string, @Body("password") password: string, @Req() req: any): Promise<Object>{
    return await this.userService.auth(username, password, req.ip)
  }

  @Post("logout")
  async logout(@Body("userID") userID: string, @Req() req: any): Promise<Object>{
    return await this.userService.logout(userID, req.ip)
  }

  @Get("list/role")
  async roleList(@Query("limit") limit: number, @Query("page") page: number, @Query("role") role: string): Promise<Object>{
    return await this.userService.roleList(limit, page, role)
  }

  @Patch("role/:id")
  async updateRole(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto): Promise<Object>{
    return await this.userService.updateRole(id, updateUserDto)
  }

  @Patch("approve/:userID")
  async approveUser(@Param("userID") userID: string): Promise<Object>{
    return await this.userService.approveUser(userID)
  }

  @Patch("upload/profile/:userID")
  @UseInterceptors(FileInterceptor("file", {
    storage: diskStorage({
      destination: "./upload/user",
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
  async uploadProfile(@UploadedFile() file: Express.Multer.File, @Param("userID") userID: string): Promise<Object>{
    return await this.userService.uploadProfile(file, userID)
  }

  @Get("upload/profile/:userID")
  async getProfile(@Param("userID") userID: string): Promise<StreamableFile>{
    return await this.userService.getProfile(userID)
  }
}
