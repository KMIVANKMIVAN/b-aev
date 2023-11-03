import { Test, TestingModule } from '@nestjs/testing';
import { TitularcuentaService } from './titularcuenta.service';

describe('TitularcuentaService', () => {
  let service: TitularcuentaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TitularcuentaService],
    }).compile();

    service = module.get<TitularcuentaService>(TitularcuentaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
