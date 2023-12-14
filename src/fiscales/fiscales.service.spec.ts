import { Test, TestingModule } from '@nestjs/testing';
import { FiscalesService } from './fiscales.service';

describe('FiscalesService', () => {
  let service: FiscalesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FiscalesService],
    }).compile();

    service = module.get<FiscalesService>(FiscalesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
