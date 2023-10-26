// export class CreatePlanillasigeproDto {}
import { IsOptional, IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreatePlanillasigeproDto {
  @IsNotEmpty() // Indicamos que no debe estar vacío (no nulo)
  @IsNumber()
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
  retencion_anticipo: number;

  @IsOptional()
  @IsNumber()
  desembolso: number;

  @IsOptional()
  @IsNumber()
  modificatorio: number;

  @IsOptional()
  @IsNumber()
  multas: number;

  @IsOptional()
  @IsNumber()
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
  @IsNumber()
  activo: number;
}
