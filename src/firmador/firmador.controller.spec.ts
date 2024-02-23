import { Test, TestingModule } from '@nestjs/testing';
import { FirmadorController } from './firmador.controller';
import { FirmadorService } from './firmador.service';

describe('FirmadorController', () => {
  let controller: FirmadorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FirmadorController],
      providers: [FirmadorService],
    }).compile();

    controller = module.get<FirmadorController>(FirmadorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
