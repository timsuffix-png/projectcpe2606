import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersProducer } from './entities/usersProducer.entity';
import { UserAction } from '../etc/user-action/entities/user-action.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsersProducer, UserAction])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
