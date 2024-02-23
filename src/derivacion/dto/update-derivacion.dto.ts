import { PartialType } from '@nestjs/mapped-types';
import { CreateDerivacionDto } from './create-derivacion.dto';

export class UpdateDerivacionDto extends PartialType(CreateDerivacionDto) {}
