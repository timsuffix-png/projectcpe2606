import { Test, TestingModule } from '@nestjs/testing';
import { FormulaItemService } from './formula-item.service';

describe('FormulaItemService', () => {
  let service: FormulaItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormulaItemService],
    }).compile();

    service = module.get<FormulaItemService>(FormulaItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
