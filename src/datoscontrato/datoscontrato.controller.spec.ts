import { Test, TestingModule } from '@nestjs/testing';
import { DatoscontratoController } from './datoscontrato.controller';
import { DatoscontratoService } from './datoscontrato.service';

describe('DatoscontratoController', () => {
  let controller: DatoscontratoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DatoscontratoController],
      providers: [DatoscontratoService],
    }).compile();

    controller = module.get<DatoscontratoController>(DatoscontratoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
