import { Test, TestingModule } from '@nestjs/testing';
import { ProductionSubController } from './production-sub.controller';
import { ProductionSubService } from './production-sub.service';

describe('ProductionSubController', () => {
  let controller: ProductionSubController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductionSubController],
      providers: [ProductionSubService],
    }).compile();

    controller = module.get<ProductionSubController>(ProductionSubController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
