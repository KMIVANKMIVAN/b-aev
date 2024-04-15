import { Test, TestingModule } from '@nestjs/testing';
import { DepartamentobusaController } from './departamentobusa.controller';
import { DepartamentobusaService } from './departamentobusa.service';

describe('DepartamentobusaController', () => {
  let controller: DepartamentobusaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DepartamentobusaController],
      providers: [DepartamentobusaService],
    }).compile();

    controller = module.get<DepartamentobusaController>(DepartamentobusaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
