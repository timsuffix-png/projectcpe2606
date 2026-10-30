import { Test, TestingModule } from '@nestjs/testing';
import { QcTypeService } from './qc-type.service';

describe('QcTypeService', () => {
  let service: QcTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QcTypeService],
    }).compile();

    service = module.get<QcTypeService>(QcTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
