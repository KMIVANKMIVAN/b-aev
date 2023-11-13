import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('planillascierresaldo')
export class Planillascierresaldo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  id_sap: string;

  @Column({ nullable: true })
  proy_cod: string;

  @Column({ nullable: true })
  proy_des: string;

  @Column({ nullable: true })
  cont: string;

  @Column({ type: 'int', nullable: true })
  comp_cod: number;

  @Column({ nullable: true })
  ploc_des: string;

  @Column({ type: 'double', nullable: true, precision: 22, scale: 2 })
  retencion_anticipo: number;

  @Column({ type: 'double', nullable: true, precision: 22, scale: 2 })
  desembolso: number;

  @Column({ type: 'double', nullable: true, precision: 22, scale: 2 })
  modificatorio: number;

  @Column({ type: 'double', nullable: true, precision: 22, scale: 2 })
  multas: number;

  @Column({ type: 'double', nullable: true, precision: 22, scale: 2 })
  planillado: number;

  @Column({ nullable: true })
  titr_cod: string;

  @Column({ nullable: true })
  ploc_cod: string;

  @Column({ nullable: true })
  orden: string;

  @Column({ type: 'int', nullable: true })
  activo: number;
}
