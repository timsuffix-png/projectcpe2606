import { Test, TestingModule } from '@nestjs/testing';
import { PicknpayGoodsService } from './picknpay-goods.service';

describe('PicknpayGoodsService', () => {
  let service: PicknpayGoodsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PicknpayGoodsService],
    }).compile();

    service = module.get<PicknpayGoodsService>(PicknpayGoodsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
