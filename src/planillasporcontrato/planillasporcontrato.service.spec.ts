import { Test, TestingModule } from '@nestjs/testing';
import { PlanillasporcontratoService } from './planillasporcontrato.service';

describe('PlanillasporcontratoService', () => {
  let service: PlanillasporcontratoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlanillasporcontratoService],
    }).compile();

    service = module.get<PlanillasporcontratoService>(
      PlanillasporcontratoService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
