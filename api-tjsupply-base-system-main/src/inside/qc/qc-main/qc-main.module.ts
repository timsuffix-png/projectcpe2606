import { Module } from '@nestjs/common';
import { QcMainService } from './qc-main.service';
import { QcMainController } from './qc-main.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QcMain } from './entities/qc-main.entity';
import { QcType } from '../qc-type/entities/qc-type.entity';
import { QcScript } from '../qc-script/entities/qc-script.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QcMain, QcType, QcScript])],
  controllers: [QcMainController],
  providers: [QcMainService],
})
export class QcMainModule {}
