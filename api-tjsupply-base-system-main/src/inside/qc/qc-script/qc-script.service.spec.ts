import { Test, TestingModule } from '@nestjs/testing';
import { QcScriptService } from './qc-script.service';

describe('QcScriptService', () => {
  let service: QcScriptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QcScriptService],
    }).compile();

    service = module.get<QcScriptService>(QcScriptService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
