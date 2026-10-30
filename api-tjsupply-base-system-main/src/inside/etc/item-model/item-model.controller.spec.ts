import { Test, TestingModule } from '@nestjs/testing';
import { ItemModelController } from './item-model.controller';
import { ItemModelService } from './item-model.service';

describe('ItemModelController', () => {
  let controller: ItemModelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemModelController],
      providers: [ItemModelService],
    }).compile();

    controller = module.get<ItemModelController>(ItemModelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
