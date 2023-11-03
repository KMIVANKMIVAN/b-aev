import { Test, TestingModule } from '@nestjs/testing';
import { DesembolsosService } from './desembolsos.service';

describe('DesembolsosService', () => {
  let service: DesembolsosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DesembolsosService],
    }).compile();

    service = module.get<DesembolsosService>(DesembolsosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
