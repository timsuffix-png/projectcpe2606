import { Test, TestingModule } from '@nestjs/testing';
import { OrderNumberService } from './order-number.service';

describe('OrderNumberService', () => {
  let service: OrderNumberService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderNumberService],
    }).compile();

    service = module.get<OrderNumberService>(OrderNumberService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
