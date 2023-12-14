import { Test, TestingModule } from '@nestjs/testing';
import { TbActividadesController } from './tb_actividades.controller';
import { TbActividadesService } from './tb_actividades.service';

describe('TbActividadesController', () => {
  let controller: TbActividadesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TbActividadesController],
      providers: [TbActividadesService],
    }).compile();

    controller = module.get<TbActividadesController>(TbActividadesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
