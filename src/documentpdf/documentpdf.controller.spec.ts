import { Test, TestingModule } from '@nestjs/testing';
import { DocumentpdfController } from './documentpdf.controller';
import { DocumentpdfService } from './documentpdf.service';

describe('DocumentpdfController', () => {
  let controller: DocumentpdfController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentpdfController],
      providers: [DocumentpdfService],
    }).compile();

    controller = module.get<DocumentpdfController>(DocumentpdfController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
