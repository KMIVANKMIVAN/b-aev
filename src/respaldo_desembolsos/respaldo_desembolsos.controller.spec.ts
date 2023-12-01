import { Test, TestingModule } from '@nestjs/testing';
import { RespaldoDesembolsosController } from './respaldo_desembolsos.controller';
import { RespaldoDesembolsosService } from './respaldo_desembolsos.service';

describe('RespaldoDesembolsosController', () => {
  let controller: RespaldoDesembolsosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RespaldoDesembolsosController],
      providers: [RespaldoDesembolsosService],
    }).compile();

    controller = module.get<RespaldoDesembolsosController>(RespaldoDesembolsosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
