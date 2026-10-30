import { Test, TestingModule } from '@nestjs/testing';
import { QcRecordService } from './qc-record.service';

describe('QcRecordService', () => {
  let service: QcRecordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QcRecordService],
    }).compile();

    service = module.get<QcRecordService>(QcRecordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
