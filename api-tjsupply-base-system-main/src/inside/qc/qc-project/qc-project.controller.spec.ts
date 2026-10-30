import { Test, TestingModule } from '@nestjs/testing';
import { QcProjectController } from './qc-project.controller';
import { QcProjectService } from './qc-project.service';

describe('QcProjectController', () => {
  let controller: QcProjectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QcProjectController],
      providers: [QcProjectService],
    }).compile();

    controller = module.get<QcProjectController>(QcProjectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
