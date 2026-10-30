import { Test, TestingModule } from '@nestjs/testing';
import { ConstructService } from './construct.service';

describe('ConstructService', () => {
  let service: ConstructService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConstructService],
    }).compile();

    service = module.get<ConstructService>(ConstructService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
