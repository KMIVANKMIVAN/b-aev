import { Test, TestingModule } from '@nestjs/testing';
import { DesembolsosController } from './desembolsos.controller';
import { DesembolsosService } from './desembolsos.service';

describe('DesembolsosController', () => {
  let controller: DesembolsosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DesembolsosController],
      providers: [DesembolsosService],
    }).compile();

    controller = module.get<DesembolsosController>(DesembolsosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
