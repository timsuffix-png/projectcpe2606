import { Module } from '@nestjs/common';
import { QcScriptService } from './qc-script.service';
import { QcScriptController } from './qc-script.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QcScript } from './entities/qc-script.entity';
import { QcMain } from '../qc-main/entities/qc-main.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QcScript, QcMain])],
  controllers: [QcScriptController],
  providers: [QcScriptService],
})
export class QcScriptModule {}
