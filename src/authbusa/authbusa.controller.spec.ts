import { Test, TestingModule } from '@nestjs/testing';
import { AuthbusaController } from './authbusa.controller';
import { AuthbusaService } from './authbusa.service';

describe('AuthbusaController', () => {
  let controller: AuthbusaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthbusaController],
      providers: [AuthbusaService],
    }).compile();

    controller = module.get<AuthbusaController>(AuthbusaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
