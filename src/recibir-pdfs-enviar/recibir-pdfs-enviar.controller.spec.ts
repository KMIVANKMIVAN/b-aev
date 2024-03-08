import { Test, TestingModule } from '@nestjs/testing';
import { RecibirPdfsEnviarController } from './recibir-pdfs-enviar.controller';
import { RecibirPdfsEnviarService } from './recibir-pdfs-enviar.service';

describe('RecibirPdfsEnviarController', () => {
  let controller: RecibirPdfsEnviarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecibirPdfsEnviarController],
      providers: [RecibirPdfsEnviarService],
    }).compile();

    controller = module.get<RecibirPdfsEnviarController>(RecibirPdfsEnviarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
