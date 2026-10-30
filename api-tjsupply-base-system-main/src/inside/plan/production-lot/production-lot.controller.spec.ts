import { Test, TestingModule } from '@nestjs/testing';
import { ProductionLotController } from './production-lot.controller';
import { ProductionLotService } from './production-lot.service';

describe('ProductionLotController', () => {
  let controller: ProductionLotController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductionLotController],
      providers: [ProductionLotService],
    }).compile();

    controller = module.get<ProductionLotController>(ProductionLotController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
