import { Test, TestingModule } from '@nestjs/testing';
import { QcMainController } from './qc-main.controller';
import { QcMainService } from './qc-main.service';

describe('QcMainController', () => {
  let controller: QcMainController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QcMainController],
      providers: [QcMainService],
    }).compile();

    controller = module.get<QcMainController>(QcMainController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
