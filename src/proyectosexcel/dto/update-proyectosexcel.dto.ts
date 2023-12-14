import { PartialType } from '@nestjs/mapped-types';
import { CreateProyectosexcelDto } from './create-proyectosexcel.dto';

export class UpdateProyectosexcelDto extends PartialType(CreateProyectosexcelDto) {}
