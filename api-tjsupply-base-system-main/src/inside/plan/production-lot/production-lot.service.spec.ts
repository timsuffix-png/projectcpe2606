import { Test, TestingModule } from '@nestjs/testing';
import { ProductionLotService } from './production-lot.service';

describe('ProductionLotService', () => {
  let service: ProductionLotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductionLotService],
    }).compile();

    service = module.get<ProductionLotService>(ProductionLotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
