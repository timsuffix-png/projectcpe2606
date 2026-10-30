import { Test, TestingModule } from '@nestjs/testing';
import { PicknpayGoodsController } from './picknpay-goods.controller';
import { PicknpayGoodsService } from './picknpay-goods.service';

describe('PicknpayGoodsController', () => {
  let controller: PicknpayGoodsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PicknpayGoodsController],
      providers: [PicknpayGoodsService],
    }).compile();

    controller = module.get<PicknpayGoodsController>(PicknpayGoodsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
