import { Test, TestingModule } from '@nestjs/testing';
import { CuadroService } from './cuadro.service';

describe('CuadroService', () => {
  let service: CuadroService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CuadroService],
    }).compile();

    service = module.get<CuadroService>(CuadroService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
