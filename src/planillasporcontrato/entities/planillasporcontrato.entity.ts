// export class Planillasporcontrato {}
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('planillasporcontrato')
export class Planillasporcontrato {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  id_sap: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  proy_cod: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  proy_des: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  cont: string;

  @Column({ type: 'int', nullable: true })
  comp_cod: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  ploc_des: string;

  @Column({ type: 'double', precision: 22, scale: 2, nullable: true })
  retencion_anticipo: number;

  @Column({ type: 'double', precision: 22, scale: 2, nullable: true })
  desembolso: number;

  @Column({ type: 'double', precision: 22, scale: 2, nullable: true })
  modificatorio: number;

  @Column({ type: 'double', precision: 22, scale: 2, nullable: true })
  multas: number;

  @Column({ type: 'double', precision: 22, scale: 2, nullable: true })
  planillado: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  titr_cod: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  ploc_cod: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  orden: string;

  @Column({ type: 'int', nullable: true })
  activo: number;
}
