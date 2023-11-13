import { Test, TestingModule } from '@nestjs/testing';
import { PlanillascierresaldoService } from './planillascierresaldo.service';

describe('PlanillascierresaldoService', () => {
  let service: PlanillascierresaldoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlanillascierresaldoService],
    }).compile();

    service = module.get<PlanillascierresaldoService>(
      PlanillascierresaldoService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
