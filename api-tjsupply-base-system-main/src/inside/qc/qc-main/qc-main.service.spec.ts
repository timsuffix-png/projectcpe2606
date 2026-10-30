import { Test, TestingModule } from '@nestjs/testing';
import { QcMainService } from './qc-main.service';

describe('QcMainService', () => {
  let service: QcMainService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QcMainService],
    }).compile();

    service = module.get<QcMainService>(QcMainService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
