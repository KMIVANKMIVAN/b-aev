import { Test, TestingModule } from '@nestjs/testing';
import { GenerarPdfsService } from './generar-pdfs.service';

describe('GenerarPdfsService', () => {
  let service: GenerarPdfsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GenerarPdfsService],
    }).compile();

    service = module.get<GenerarPdfsService>(GenerarPdfsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
