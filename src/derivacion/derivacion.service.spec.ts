import { Test, TestingModule } from '@nestjs/testing';
import { DerivacionService } from './derivacion.service';

describe('DerivacionService', () => {
  let service: DerivacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DerivacionService],
    }).compile();

    service = module.get<DerivacionService>(DerivacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
