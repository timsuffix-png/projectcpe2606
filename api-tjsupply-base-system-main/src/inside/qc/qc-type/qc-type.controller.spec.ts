import { Test, TestingModule } from '@nestjs/testing';
import { QcTypeController } from './qc-type.controller';
import { QcTypeService } from './qc-type.service';

describe('QcTypeController', () => {
  let controller: QcTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QcTypeController],
      providers: [QcTypeService],
    }).compile();

    controller = module.get<QcTypeController>(QcTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
