import { Test, TestingModule } from '@nestjs/testing';
import { FirmadorusuarioService } from './firmadorusuario.service';

describe('FirmadorusuarioService', () => {
  let service: FirmadorusuarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FirmadorusuarioService],
    }).compile();

    service = module.get<FirmadorusuarioService>(FirmadorusuarioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
