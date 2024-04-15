import { Test, TestingModule } from '@nestjs/testing';
import { DepartamentobusaService } from './departamentobusa.service';

describe('DepartamentobusaService', () => {
  let service: DepartamentobusaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DepartamentobusaService],
    }).compile();

    service = module.get<DepartamentobusaService>(DepartamentobusaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
