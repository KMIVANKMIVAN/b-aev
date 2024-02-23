import { PartialType } from '@nestjs/mapped-types';
import { CreateFirmadorDto } from './create-firmador.dto';

export class UpdateFirmadorDto extends PartialType(CreateFirmadorDto) {}
