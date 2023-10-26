// export class CreatePlanillascierresaldoDto {}
import {
  IsOptional,
  IsString,
  IsNumber,
  IsNotEmpty,
  IsInt,
  IsBoolean,
  IsPositive,
} from 'class-validator';

export class CreatePlanillascierresaldoDto {
  @IsNotEmpty() // Indicamos que no debe estar vacío (no nulo)
  @IsInt()
  id: number;

  @IsOptional()
  @IsString()
  id_sap: string;

  @IsOptional()
  @IsString()
  proy_cod: string;

  @IsOptional()
  @IsString()
  proy_des: string;

  @IsOptional()
  @IsString()
  cont: string;

  @IsOptional()
  @IsNumber()
  comp_cod: number;

  @IsOptional()
  @IsString()
  ploc_des: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  retencion_anticipo: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  desembolso: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  modificatorio: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  multas: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  planillado: number;

  @IsOptional()
  @IsString()
  titr_cod: string;

  @IsOptional()
  @IsString()
  ploc_cod: string;

  @IsOptional()
  @IsString()
  orden: string;

  @IsOptional()
  @IsInt()
  @IsBoolean()
  activo: number;
}
