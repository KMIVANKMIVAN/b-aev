import { Test, TestingModule } from '@nestjs/testing';
import { DocumentpdfService } from './documentpdf.service';

describe('DocumentpdfService', () => {
  let service: DocumentpdfService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocumentpdfService],
    }).compile();

    service = module.get<DocumentpdfService>(DocumentpdfService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
