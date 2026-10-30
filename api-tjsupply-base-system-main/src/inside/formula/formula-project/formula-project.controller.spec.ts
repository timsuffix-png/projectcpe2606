import { Test, TestingModule } from '@nestjs/testing';
import { FormulaProjectController } from './formula-project.controller';
import { FormulaProjectService } from './formula-project.service';

describe('FormulaProjectController', () => {
  let controller: FormulaProjectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormulaProjectController],
      providers: [FormulaProjectService],
    }).compile();

    controller = module.get<FormulaProjectController>(FormulaProjectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
