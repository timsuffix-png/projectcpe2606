import { Test, TestingModule } from '@nestjs/testing';
import { QcProjectService } from './qc-project.service';

describe('QcProjectService', () => {
  let service: QcProjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QcProjectService],
    }).compile();

    service = module.get<QcProjectService>(QcProjectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
