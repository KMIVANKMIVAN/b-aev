import { Test, TestingModule } from '@nestjs/testing';
import { NivelbusaController } from './nivelbusa.controller';
import { NivelbusaService } from './nivelbusa.service';

describe('NivelbusaController', () => {
  let controller: NivelbusaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NivelbusaController],
      providers: [NivelbusaService],
    }).compile();

    controller = module.get<NivelbusaController>(NivelbusaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
