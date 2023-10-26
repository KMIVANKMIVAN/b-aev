import { Test, TestingModule } from '@nestjs/testing';
import { DatoscontratoService } from './datoscontrato.service';

describe('DatoscontratoService', () => {
  let service: DatoscontratoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatoscontratoService],
    }).compile();

    service = module.get<DatoscontratoService>(DatoscontratoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
