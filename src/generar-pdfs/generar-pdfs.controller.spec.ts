import { Test, TestingModule } from '@nestjs/testing';
import { GenerarPdfsController } from './generar-pdfs.controller';
import { GenerarPdfsService } from './generar-pdfs.service';

describe('GenerarPdfsController', () => {
  let controller: GenerarPdfsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GenerarPdfsController],
      providers: [GenerarPdfsService],
    }).compile();

    controller = module.get<GenerarPdfsController>(GenerarPdfsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
