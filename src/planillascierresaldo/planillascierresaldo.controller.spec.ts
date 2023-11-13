import { Test, TestingModule } from '@nestjs/testing';
import { PlanillascierresaldoController } from './planillascierresaldo.controller';
import { PlanillascierresaldoService } from './planillascierresaldo.service';

describe('PlanillascierresaldoController', () => {
  let controller: PlanillascierresaldoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanillascierresaldoController],
      providers: [PlanillascierresaldoService],
    }).compile();

    controller = module.get<PlanillascierresaldoController>(
      PlanillascierresaldoController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
