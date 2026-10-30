import { Test, TestingModule } from '@nestjs/testing';
import { ConstructController } from './construct.controller';
import { ConstructService } from './construct.service';

describe('ConstructController', () => {
  let controller: ConstructController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConstructController],
      providers: [ConstructService],
    }).compile();

    controller = module.get<ConstructController>(ConstructController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
