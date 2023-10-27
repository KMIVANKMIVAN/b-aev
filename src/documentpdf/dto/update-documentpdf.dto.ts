import { PartialType } from '@nestjs/mapped-types';
import { CreateDocumentpdfDto } from './create-documentpdf.dto';

export class UpdateDocumentpdfDto extends PartialType(CreateDocumentpdfDto) {}
