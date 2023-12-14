import { Test, TestingModule } from '@nestjs/testing';
import { FiscalesController } from './fiscales.controller';
import { FiscalesService } from './fiscales.service';

describe('FiscalesController', () => {
  let controller: FiscalesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FiscalesController],
      providers: [FiscalesService],
    }).compile();

    controller = module.get<FiscalesController>(FiscalesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
