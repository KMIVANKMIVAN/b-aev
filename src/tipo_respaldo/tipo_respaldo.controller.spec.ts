import { Test, TestingModule } from '@nestjs/testing';
import { TipoRespaldoController } from './tipo_respaldo.controller';
import { TipoRespaldoService } from './tipo_respaldo.service';

describe('TipoRespaldoController', () => {
  let controller: TipoRespaldoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoRespaldoController],
      providers: [TipoRespaldoService],
    }).compile();

    controller = module.get<TipoRespaldoController>(TipoRespaldoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
