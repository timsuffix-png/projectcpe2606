import { Module } from '@nestjs/common';
import { QcRecordStatusService } from './qc-record-status.service';
import { QcRecordStatusController } from './qc-record-status.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QcRecordStatus } from './entities/qc-record-status.entity';
import { QcRecordStatusSubscriber } from './qc-record-status.subscriber';
import { QcRecord } from '../qc-record/entities/qc-record.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QcRecordStatus, QcRecord])],
  controllers: [QcRecordStatusController],
  providers: [QcRecordStatusService, QcRecordStatusSubscriber],
})
export class QcRecordStatusModule {}
