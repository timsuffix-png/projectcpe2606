import { Module } from '@nestjs/common';
import { QcItemProjectService } from './qc-item-project.service';
import { QcItemProjectController } from './qc-item-project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QcItemProject } from './entities/qc-item-project.entity';
import { QcProject } from '../qc-project/entities/qc-project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QcItemProject, QcProject])],
  controllers: [QcItemProjectController],
  providers: [QcItemProjectService],
})
export class QcItemProjectModule {}
