import { Test, TestingModule } from '@nestjs/testing';
import { QcRecordController } from './qc-record.controller';
import { QcRecordService } from './qc-record.service';

describe('QcRecordController', () => {
  let controller: QcRecordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QcRecordController],
      providers: [QcRecordService],
    }).compile();

    controller = module.get<QcRecordController>(QcRecordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
