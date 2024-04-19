import { PartialType } from '@nestjs/mapped-types';
import { CreateFirmadorusuarioDto } from './create-firmadorusuario.dto';

export class UpdateFirmadorusuarioDto extends PartialType(CreateFirmadorusuarioDto) {}
