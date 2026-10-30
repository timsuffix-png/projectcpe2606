import { Test, TestingModule } from '@nestjs/testing';
import { OrderNumberController } from './order-number.controller';
import { OrderNumberService } from './order-number.service';

describe('OrderNumberController', () => {
  let controller: OrderNumberController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderNumberController],
      providers: [OrderNumberService],
    }).compile();

    controller = module.get<OrderNumberController>(OrderNumberController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
