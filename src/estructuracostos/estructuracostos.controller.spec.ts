import { Test, TestingModule } from '@nestjs/testing';
import { EstructuracostosController } from './estructuracostos.controller';
import { EstructuracostosService } from './estructuracostos.service';

describe('EstructuracostosController', () => {
  let controller: EstructuracostosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstructuracostosController],
      providers: [EstructuracostosService],
    }).compile();

    controller = module.get<EstructuracostosController>(EstructuracostosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
