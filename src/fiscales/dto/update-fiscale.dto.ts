import { PartialType } from '@nestjs/mapped-types';
import { CreateFiscaleDto } from './create-fiscale.dto';

export class UpdateFiscaleDto extends PartialType(CreateFiscaleDto) {}
