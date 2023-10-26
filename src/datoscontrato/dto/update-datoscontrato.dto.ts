import { PartialType } from '@nestjs/mapped-types';
import { CreateDatoscontratoDto } from './create-datoscontrato.dto';

export class UpdateDatoscontratoDto extends PartialType(CreateDatoscontratoDto) {}
