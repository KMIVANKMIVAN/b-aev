import {
  IsOptional,
  IsString,
  IsNumber,
  IsNotEmpty,
  IsInt,
  IsPositive,
} from 'class-validator';

export class CreatePlanillascierresaldoDto {
  @IsNotEmpty()
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
  @IsInt()
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
  activo: number;
}
