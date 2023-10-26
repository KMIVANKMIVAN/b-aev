import { Test, TestingModule } from '@nestjs/testing';
import { PlanillasigeproService } from './planillasigepro.service';

describe('PlanillasigeproService', () => {
  let service: PlanillasigeproService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlanillasigeproService],
    }).compile();

    service = module.get<PlanillasigeproService>(PlanillasigeproService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
