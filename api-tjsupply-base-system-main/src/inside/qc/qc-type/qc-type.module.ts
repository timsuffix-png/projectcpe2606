import { Module } from '@nestjs/common';
import { QcTypeService } from './qc-type.service';
import { QcTypeController } from './qc-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QcType } from './entities/qc-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QcType])],
  controllers: [QcTypeController],
  providers: [QcTypeService],
})
export class QcTypeModule {}
