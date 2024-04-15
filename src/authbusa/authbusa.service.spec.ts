import { Test, TestingModule } from '@nestjs/testing';
import { AuthbusaService } from './authbusa.service';

describe('AuthbusaService', () => {
  let service: AuthbusaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthbusaService],
    }).compile();

    service = module.get<AuthbusaService>(AuthbusaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
