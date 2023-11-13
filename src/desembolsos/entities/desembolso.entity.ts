import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('desembolsos')
export class Desembolso {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  proyecto_id: number;

  @Column({ nullable: true })
  proy_cod: string;

  @Column({ nullable: true })
  cont_cod: string;

  @Column({ nullable: true })
  titr_cod: string;

  @Column({ nullable: true })
  ploc_cod: string;

  @Column({ type: 'double', precision: 22, scale: 2, nullable: true })
  monto_fisico: number;

  @Column({ type: 'double', precision: 22, scale: 2, nullable: true })
  descuento_anti_reten: number;

  @Column({ type: 'double', precision: 22, scale: 2, nullable: true })
  multa: number;

  @Column({ type: 'double', precision: 22, scale: 2, nullable: true })
  monto_desembolsado: number;

  @Column({ nullable: true })
  tipo_planilla: number;

  @Column({ nullable: true })
  checklist: number;

  @Column({ nullable: true })
  idcuenta: number;

  @Column({ nullable: true })
  estado: number;

  @Column({ nullable: true })
  numero_inst: string;

  @Column({ nullable: true })
  numero_factura: string;

  @Column({ type: 'datetime', nullable: true })
  fecha_insert: Date;

  @Column({ type: 'datetime', nullable: true })
  fecha_update: Date;

  @Column({ nullable: true })
  id_user: number;

  @Column({ type: 'date', nullable: true })
  fecha_generado: Date;

  @Column({ nullable: true })
  objeto: string;

  @Column({ nullable: true })
  procesocontratacion: string;

  @Column({ type: 'double', precision: 22, scale: 2, nullable: true })
  monto_contrato: number;

  @Column({ nullable: true })
  uh: string;

  @Column({ nullable: true })
  mes: number;

  @Column({ nullable: true })
  gestion: number;

  @Column({ nullable: true })
  id_pago: number;

  @Column({ nullable: true })
  observacion: string;

  @Column({ nullable: true })
  cite: string;

  @Column({ type: 'date', nullable: true })
  fecha_banco: Date;

  @Column({ nullable: true })
  archivo: string;

  @Column({ nullable: true })
  id_user_vobo: number;

  @Column({ type: 'datetime', nullable: true })
  fecha_vobo: Date;

  @Column({ type: 'date', nullable: true })
  fecha_abono: Date;

  @Column({ nullable: true })
  open: number;

  @Column({ nullable: true })
  justificacion_anulacion: string;

  @Column({ type: 'datetime', nullable: true })
  fecha_anulado: Date;

  @Column({ nullable: true })
  id_user_anulacion: number;

  @Column({ nullable: true, type: 'text' })
  observaciones_pago: string;

  @Column({ nullable: true })
  archivoxls: string;

  @Column({ nullable: false })
  sigepro_id: string;

  @Column({ nullable: true })
  id_dpto: string;

  @Column({ nullable: true })
  id_planilla: number;

  @Column({ nullable: true, type: 'text' })
  Observaciones_Sistemas: string;

  @Column({ nullable: false })
  activo: number;

  @Column({ nullable: true })
  migrado_fecha_abono: number;
}
