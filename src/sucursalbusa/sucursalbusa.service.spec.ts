import { Test, TestingModule } from '@nestjs/testing';
import { SucursalbusaService } from './sucursalbusa.service';

describe('SucursalbusaService', () => {
  let service: SucursalbusaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SucursalbusaService],
    }).compile();

    service = module.get<SucursalbusaService>(SucursalbusaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
