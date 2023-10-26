import { Test, TestingModule } from '@nestjs/testing';
import { PlanillasigeproController } from './planillasigepro.controller';
import { PlanillasigeproService } from './planillasigepro.service';

describe('PlanillasigeproController', () => {
  let controller: PlanillasigeproController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanillasigeproController],
      providers: [PlanillasigeproService],
    }).compile();

    controller = module.get<PlanillasigeproController>(PlanillasigeproController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
