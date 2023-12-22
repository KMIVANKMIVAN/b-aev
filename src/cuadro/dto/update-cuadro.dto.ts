import { PartialType } from '@nestjs/mapped-types';
import { CreateCuadroDto } from './create-cuadro.dto';

export class UpdateCuadroDto extends PartialType(CreateCuadroDto) {}
