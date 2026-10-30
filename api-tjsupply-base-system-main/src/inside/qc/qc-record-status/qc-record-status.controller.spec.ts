import { Test, TestingModule } from '@nestjs/testing';
import { QcRecordStatusController } from './qc-record-status.controller';
import { QcRecordStatusService } from './qc-record-status.service';

describe('QcRecordStatusController', () => {
  let controller: QcRecordStatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QcRecordStatusController],
      providers: [QcRecordStatusService],
    }).compile();

    controller = module.get<QcRecordStatusController>(QcRecordStatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
