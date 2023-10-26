import { Test, TestingModule } from '@nestjs/testing';
import { ContratosigeproService } from './contratosigepro.service';

describe('ContratosigeproService', () => {
  let service: ContratosigeproService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContratosigeproService],
    }).compile();

    service = module.get<ContratosigeproService>(ContratosigeproService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
