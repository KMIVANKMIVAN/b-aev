import { Test, TestingModule } from '@nestjs/testing';
import { PlanillasporcontratoController } from './planillasporcontrato.controller';
import { PlanillasporcontratoService } from './planillasporcontrato.service';

describe('PlanillasporcontratoController', () => {
  let controller: PlanillasporcontratoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanillasporcontratoController],
      providers: [PlanillasporcontratoService],
    }).compile();

    controller = module.get<PlanillasporcontratoController>(PlanillasporcontratoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
