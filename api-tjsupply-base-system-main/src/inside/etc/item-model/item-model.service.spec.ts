import { Test, TestingModule } from '@nestjs/testing';
import { ItemModelService } from './item-model.service';

describe('ItemModelService', () => {
  let service: ItemModelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemModelService],
    }).compile();

    service = module.get<ItemModelService>(ItemModelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
