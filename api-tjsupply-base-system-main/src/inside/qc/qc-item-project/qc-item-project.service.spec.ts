import { Test, TestingModule } from '@nestjs/testing';
import { QcItemProjectService } from './qc-item-project.service';

describe('QcItemProjectService', () => {
  let service: QcItemProjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QcItemProjectService],
    }).compile();

    service = module.get<QcItemProjectService>(QcItemProjectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
