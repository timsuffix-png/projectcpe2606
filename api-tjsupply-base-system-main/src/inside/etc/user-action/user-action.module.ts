import { Module } from '@nestjs/common';
import { UserActionService } from './user-action.service';
import { UserActionController } from './user-action.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAction } from './entities/user-action.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserAction])],
  controllers: [UserActionController],
  providers: [UserActionService],
})
export class UserActionModule {}
