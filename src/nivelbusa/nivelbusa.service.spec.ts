import { Test, TestingModule } from '@nestjs/testing';
import { NivelbusaService } from './nivelbusa.service';

describe('NivelbusaService', () => {
  let service: NivelbusaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NivelbusaService],
    }).compile();

    service = module.get<NivelbusaService>(NivelbusaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
