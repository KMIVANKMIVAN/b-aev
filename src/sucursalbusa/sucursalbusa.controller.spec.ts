import { Test, TestingModule } from '@nestjs/testing';
import { SucursalbusaController } from './sucursalbusa.controller';
import { SucursalbusaService } from './sucursalbusa.service';

describe('SucursalbusaController', () => {
  let controller: SucursalbusaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SucursalbusaController],
      providers: [SucursalbusaService],
    }).compile();

    controller = module.get<SucursalbusaController>(SucursalbusaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
