import { Test, TestingModule } from '@nestjs/testing';
import { ContratosigeproController } from './contratosigepro.controller';
import { ContratosigeproService } from './contratosigepro.service';

describe('ContratosigeproController', () => {
  let controller: ContratosigeproController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContratosigeproController],
      providers: [ContratosigeproService],
    }).compile();

    controller = module.get<ContratosigeproController>(
      ContratosigeproController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
