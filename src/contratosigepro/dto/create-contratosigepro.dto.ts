import { IsString, IsInt, IsOptional, IsNumber, IsDate } from 'class-validator';

export class CreateContratosigeproDto {
  @IsOptional()
  @IsInt()
  id: number;

  @IsString()
  proy_cod: string;

  @IsString()
  plie_cod: string;

  @IsString()
  cont_cod: string;

  @IsString()
  depa_des: string;

  @IsOptional()
  @IsNumber()
  cont_montobs: number;

  @IsOptional()
  @IsNumber()
  montocontrato: number;

  @IsString()
  cont_des: string;

  @IsString()
  inst_cod: string;

  @IsString()
  inst_des: string;

  @IsOptional()
  @IsInt()
  prmo_cant: number;

  @IsOptional()
  @IsInt()
  comp_cod: number;

  @IsString()
  inst_contac: string;

  @IsDate()
  bole_fechav: Date;

  @IsOptional()
  @IsNumber()
  dias: number;

  @IsString()
  etap_cod: string;
}
