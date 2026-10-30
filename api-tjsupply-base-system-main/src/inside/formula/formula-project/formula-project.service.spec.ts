import { Test, TestingModule } from '@nestjs/testing';
import { FormulaProjectService } from './formula-project.service';

describe('FormulaProjectService', () => {
  let service: FormulaProjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormulaProjectService],
    }).compile();

    service = module.get<FormulaProjectService>(FormulaProjectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
