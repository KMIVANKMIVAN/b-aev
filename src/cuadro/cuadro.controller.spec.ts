import { Test, TestingModule } from '@nestjs/testing';
import { CuadroController } from './cuadro.controller';
import { CuadroService } from './cuadro.service';

describe('CuadroController', () => {
  let controller: CuadroController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CuadroController],
      providers: [CuadroService],
    }).compile();

    controller = module.get<CuadroController>(CuadroController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
