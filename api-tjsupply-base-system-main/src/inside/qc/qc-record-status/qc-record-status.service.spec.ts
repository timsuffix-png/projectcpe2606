import { Test, TestingModule } from '@nestjs/testing';
import { QcRecordStatusService } from './qc-record-status.service';

describe('QcRecordStatusService', () => {
  let service: QcRecordStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QcRecordStatusService],
    }).compile();

    service = module.get<QcRecordStatusService>(QcRecordStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
