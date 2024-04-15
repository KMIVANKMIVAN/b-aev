import { Test, TestingModule } from '@nestjs/testing';
import { UsuariobusaService } from './usuariobusa.service';

describe('UsuariobusaService', () => {
  let service: UsuariobusaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsuariobusaService],
    }).compile();

    service = module.get<UsuariobusaService>(UsuariobusaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
