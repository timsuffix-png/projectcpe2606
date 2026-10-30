import { Test, TestingModule } from '@nestjs/testing';
import { QcScriptController } from './qc-script.controller';
import { QcScriptService } from './qc-script.service';

describe('QcScriptController', () => {
  let controller: QcScriptController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QcScriptController],
      providers: [QcScriptService],
    }).compile();

    controller = module.get<QcScriptController>(QcScriptController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
