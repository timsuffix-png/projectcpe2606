import { Test, TestingModule } from '@nestjs/testing';
import { QcItemProjectController } from './qc-item-project.controller';
import { QcItemProjectService } from './qc-item-project.service';

describe('QcItemProjectController', () => {
  let controller: QcItemProjectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QcItemProjectController],
      providers: [QcItemProjectService],
    }).compile();

    controller = module.get<QcItemProjectController>(QcItemProjectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
