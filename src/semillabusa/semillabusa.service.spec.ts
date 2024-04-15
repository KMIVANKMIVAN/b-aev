import { Test, TestingModule } from '@nestjs/testing';
import { SemillabusaService } from './semillabusa.service';

describe('SemillabusaService', () => {
  let service: SemillabusaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SemillabusaService],
    }).compile();

    service = module.get<SemillabusaService>(SemillabusaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
