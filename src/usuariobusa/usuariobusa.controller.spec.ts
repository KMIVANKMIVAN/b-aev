import { Test, TestingModule } from '@nestjs/testing';
import { UsuariobusaController } from './usuariobusa.controller';
import { UsuariobusaService } from './usuariobusa.service';

describe('UsuariobusaController', () => {
  let controller: UsuariobusaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuariobusaController],
      providers: [UsuariobusaService],
    }).compile();

    controller = module.get<UsuariobusaController>(UsuariobusaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
