import { Test, TestingModule } from '@nestjs/testing';
import { RespaldoDesembolsosService } from './respaldo_desembolsos.service';

describe('RespaldoDesembolsosService', () => {
  let service: RespaldoDesembolsosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RespaldoDesembolsosService],
    }).compile();

    service = module.get<RespaldoDesembolsosService>(RespaldoDesembolsosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
