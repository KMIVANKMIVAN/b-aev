import { Test, TestingModule } from '@nestjs/testing';
import { ConsultasExternasService } from './consultas-externas.service';

describe('ConsultasExternasService', () => {
  let service: ConsultasExternasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConsultasExternasService],
    }).compile();

    service = module.get<ConsultasExternasService>(ConsultasExternasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
