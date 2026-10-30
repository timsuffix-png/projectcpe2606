import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserActionService } from './user-action.service';
import { CreateUserActionDto } from './dto/create-user-action.dto';
import { UpdateUserActionDto } from './dto/update-user-action.dto';

@Controller('user-action')
export class UserActionController {
  constructor(private readonly userActionService: UserActionService) {}
}
