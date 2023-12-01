import { Test, TestingModule } from '@nestjs/testing';
import { TipoRespaldoService } from './tipo_respaldo.service';

describe('TipoRespaldoService', () => {
  let service: TipoRespaldoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TipoRespaldoService],
    }).compile();

    service = module.get<TipoRespaldoService>(TipoRespaldoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
