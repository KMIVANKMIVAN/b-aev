// export class CreateEstadoDto {}
import { IsInt, IsString } from 'class-validator';

export class CreateEstadoDto {

  @IsInt()
  id: number;

  @IsString()
  estado: string;
}