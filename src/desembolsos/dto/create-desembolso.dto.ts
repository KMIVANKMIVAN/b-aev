// export class CreateDesembolsoDto {}
import {
  IsOptional,
  IsString,
  IsNumber,
  IsInt,
  IsNotEmpty,
} from 'class-validator';

export class CreateDesembolsoDto {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsOptional()
  @IsNumber()
  proyecto_id: number;

  @IsOptional()
  @IsString()
  proy_cod: string;

  @IsOptional()
  @IsString()
  cont_cod: string;

  @IsOptional()
  @IsString()
  titr_cod: string;

  @IsOptional()
  @IsString()
  ploc_cod: string;

  @IsOptional()
  @IsNumber()
  monto_fisico: number;

  @IsOptional()
  @IsNumber()
  descuento_anti_reten: number;

  @IsOptional()
  @IsNumber()
  multa: number;

  @IsOptional()
  @IsNumber()
  monto_desembolsado: number;

  @IsOptional()
  @IsNumber()
  tipo_planilla: number;

  @IsOptional()
  @IsNumber()
  checklist: number;

  @IsOptional()
  @IsNumber()
  idcuenta: number;

  @IsOptional()
  @IsNumber()
  estado: number;

  @IsOptional()
  @IsString()
  numero_inst: string;

  @IsOptional()
  @IsString()
  numero_factura: string;

  @IsOptional()
  @IsString()
  fecha_insert: Date;

  @IsOptional()
  @IsString()
  fecha_update: Date;

  @IsOptional()
  @IsNumber()
  id_user: number;

  @IsOptional()
  @IsString()
  fecha_generado: Date;

  @IsOptional()
  @IsString()
  objeto: string;

  @IsOptional()
  @IsString()
  procesocontratacion: string;

  @IsOptional()
  @IsNumber()
  monto_contrato: number;

  @IsOptional()
  @IsString()
  uh: string;

  @IsOptional()
  @IsNumber()
  mes: number;

  @IsOptional()
  @IsNumber()
  gestion: number;

  @IsOptional()
  @IsNumber()
  id_pago: number;

  @IsOptional()
  @IsString()
  observacion: string;

  @IsOptional()
  @IsString()
  cite: string;

  @IsOptional()
  @IsString()
  fecha_banco: Date;

  @IsOptional()
  @IsString()
  archivo: string;

  @IsOptional()
  @IsNumber()
  id_user_vobo: number;

  @IsOptional()
  @IsString()
  fecha_vobo: Date;

  @IsOptional()
  @IsString()
  fecha_abono: Date;

  @IsOptional()
  @IsNumber()
  open: number;

  @IsOptional()
  @IsString()
  justificacion_anulacion: string;

  @IsOptional()
  @IsString()
  fecha_anulado: Date;

  @IsOptional()
  @IsNumber()
  id_user_anulacion: number;

  @IsOptional()
  @IsString()
  observaciones_pago: string;

  @IsOptional()
  @IsString()
  archivoxls: string;

  @IsNotEmpty()
  sigepro_id: string;

  @IsOptional()
  @IsString()
  id_dpto: string;

  @IsOptional()
  @IsNumber()
  id_planilla: number;

  @IsOptional()
  @IsString()
  Observaciones_Sistemas: string;

  @IsOptional()
  @IsNumber()
  activo: number;

  @IsOptional()
  @IsNumber()
  migrado_fecha_abono: number;
}
