import { Test, TestingModule } from '@nestjs/testing';
import { ProductionSubService } from './production-sub.service';

describe('ProductionSubService', () => {
  let service: ProductionSubService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductionSubService],
    }).compile();

    service = module.get<ProductionSubService>(ProductionSubService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
