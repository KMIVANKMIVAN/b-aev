// export class CreateRespaldoDesembolsoDto {}
import { IsOptional, IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateRespaldoDesembolsoDto {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsOptional()
  @IsInt()
  desembolsos_id: number;

  @IsOptional()
  @IsString()
  archivo: string;

  @IsOptional()
  @IsInt()
  id_user: number;

  @IsOptional()
  @IsString()
  fecha_insert: Date;

  @IsOptional()
  @IsString()
  referencia: string;

  @IsOptional()
  @IsInt()
  tiporespaldo_id: number;
}
