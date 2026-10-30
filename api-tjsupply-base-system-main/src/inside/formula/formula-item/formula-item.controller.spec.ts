import { Test, TestingModule } from '@nestjs/testing';
import { FormulaItemController } from './formula-item.controller';
import { FormulaItemService } from './formula-item.service';

describe('FormulaItemController', () => {
  let controller: FormulaItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormulaItemController],
      providers: [FormulaItemService],
    }).compile();

    controller = module.get<FormulaItemController>(FormulaItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
