import { Test, TestingModule } from '@nestjs/testing';
import { SemillabusaController } from './semillabusa.controller';
import { SemillabusaService } from './semillabusa.service';

describe('SemillabusaController', () => {
  let controller: SemillabusaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SemillabusaController],
      providers: [SemillabusaService],
    }).compile();

    controller = module.get<SemillabusaController>(SemillabusaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
