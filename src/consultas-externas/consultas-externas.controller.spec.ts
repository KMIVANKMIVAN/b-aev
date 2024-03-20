import { Test, TestingModule } from '@nestjs/testing';
import { ConsultasExternasController } from './consultas-externas.controller';
import { ConsultasExternasService } from './consultas-externas.service';

describe('ConsultasExternasController', () => {
  let controller: ConsultasExternasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConsultasExternasController],
      providers: [ConsultasExternasService],
    }).compile();

    controller = module.get<ConsultasExternasController>(ConsultasExternasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
