import { Test, TestingModule } from '@nestjs/testing';
import { TitularcuentaController } from './titularcuenta.controller';
import { TitularcuentaService } from './titularcuenta.service';

describe('TitularcuentaController', () => {
  let controller: TitularcuentaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TitularcuentaController],
      providers: [TitularcuentaService],
    }).compile();

    controller = module.get<TitularcuentaController>(TitularcuentaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
