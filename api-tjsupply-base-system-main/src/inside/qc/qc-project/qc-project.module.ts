import { Module } from '@nestjs/common';
import { QcProjectService } from './qc-project.service';
import { QcProjectController } from './qc-project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QcProject } from './entities/qc-project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QcProject])],
  controllers: [QcProjectController],
  providers: [QcProjectService],
})
export class QcProjectModule {}
