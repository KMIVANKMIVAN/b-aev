import { Test, TestingModule } from '@nestjs/testing';
import { FirmadorService } from './firmador.service';

describe('FirmadorService', () => {
  let service: FirmadorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FirmadorService],
    }).compile();

    service = module.get<FirmadorService>(FirmadorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
