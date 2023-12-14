import { Test, TestingModule } from '@nestjs/testing';
import { ProyectosexcelService } from './proyectosexcel.service';

describe('ProyectosexcelService', () => {
  let service: ProyectosexcelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProyectosexcelService],
    }).compile();

    service = module.get<ProyectosexcelService>(ProyectosexcelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
