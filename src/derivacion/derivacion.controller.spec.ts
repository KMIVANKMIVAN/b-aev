import { Test, TestingModule } from '@nestjs/testing';
import { DerivacionController } from './derivacion.controller';
import { DerivacionService } from './derivacion.service';

describe('DerivacionController', () => {
  let controller: DerivacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DerivacionController],
      providers: [DerivacionService],
    }).compile();

    controller = module.get<DerivacionController>(DerivacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
