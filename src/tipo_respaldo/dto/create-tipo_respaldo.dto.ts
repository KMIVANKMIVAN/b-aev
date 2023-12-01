// export class CreateTipoRespaldoDto {}
import { IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateTipoRespaldoDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  detalle: string;

  @IsOptional()
  @IsString()
  sigla: string;

  @IsOptional()
  @IsNumber()
  activo: number;
}
