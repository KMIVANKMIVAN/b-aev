import { Test, TestingModule } from '@nestjs/testing';
import { EstructuracostosService } from './estructuracostos.service';

describe('EstructuracostosService', () => {
  let service: EstructuracostosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EstructuracostosService],
    }).compile();

    service = module.get<EstructuracostosService>(EstructuracostosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
