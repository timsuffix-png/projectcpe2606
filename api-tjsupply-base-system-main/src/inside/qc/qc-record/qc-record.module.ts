import { Module } from '@nestjs/common';
import { QcRecordService } from './qc-record.service';
import { QcRecordController } from './qc-record.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QcRecord } from './entities/qc-record.entity';
import { Construct } from 'src/inside/constructs/construct/entities/construct.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QcRecord, Construct])],
  controllers: [QcRecordController],
  providers: [QcRecordService],
})
export class QcRecordModule {}
