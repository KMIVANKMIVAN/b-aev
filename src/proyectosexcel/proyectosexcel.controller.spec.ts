import { Test, TestingModule } from '@nestjs/testing';
import { ProyectosexcelController } from './proyectosexcel.controller';
import { ProyectosexcelService } from './proyectosexcel.service';

describe('ProyectosexcelController', () => {
  let controller: ProyectosexcelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProyectosexcelController],
      providers: [ProyectosexcelService],
    }).compile();

    controller = module.get<ProyectosexcelController>(ProyectosexcelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
