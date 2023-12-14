import { Test, TestingModule } from '@nestjs/testing';
import { TbActividadesService } from './tb_actividades.service';

describe('TbActividadesService', () => {
  let service: TbActividadesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TbActividadesService],
    }).compile();

    service = module.get<TbActividadesService>(TbActividadesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
