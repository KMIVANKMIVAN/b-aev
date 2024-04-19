import { Test, TestingModule } from '@nestjs/testing';
import { FirmadorusuarioController } from './firmadorusuario.controller';
import { FirmadorusuarioService } from './firmadorusuario.service';

describe('FirmadorusuarioController', () => {
  let controller: FirmadorusuarioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FirmadorusuarioController],
      providers: [FirmadorusuarioService],
    }).compile();

    controller = module.get<FirmadorusuarioController>(FirmadorusuarioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
