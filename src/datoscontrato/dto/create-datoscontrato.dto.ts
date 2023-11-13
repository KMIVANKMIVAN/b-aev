import {
  IsOptional,
  IsInt,
  IsString,
  IsDate,
  IsNumber,
  IsNotEmpty,
} from 'class-validator';

export class CreateDatoscontratoDto {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsOptional()
  @IsString()
  proy_cod: string;

  @IsOptional()
  @IsString()
  plie_cod: string;

  @IsOptional()
  @IsString()
  cont_cod: string;

  @IsOptional()
  @IsString()
  depa_des: string;

  @IsOptional()
  @IsNumber()
  cont_montobs: number;

  @IsOptional()
  @IsNumber()
  montocontrato: number;

  @IsOptional()
  @IsString()
  cont_des: string;

  @IsOptional()
  @IsString()
  inst_cod: string;

  @IsOptional()
  @IsString()
  inst_des: string;

  @IsOptional()
  @IsInt()
  prmo_cant: number;

  @IsOptional()
  @IsInt()
  comp_cod: number;

  @IsOptional()
  @IsString()
  inst_contac: string;

  @IsOptional()
  @IsDate()
  bole_fechav: Date;

  @IsOptional()
  @IsNumber()
  dias: number;

  @IsOptional()
  @IsString()
  etap_cod: string;
}
