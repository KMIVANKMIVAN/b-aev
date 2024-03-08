import { Test, TestingModule } from '@nestjs/testing';
import { RecibirPdfsEnviarService } from './recibir-pdfs-enviar.service';

describe('RecibirPdfsEnviarService', () => {
  let service: RecibirPdfsEnviarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecibirPdfsEnviarService],
    }).compile();

    service = module.get<RecibirPdfsEnviarService>(RecibirPdfsEnviarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
