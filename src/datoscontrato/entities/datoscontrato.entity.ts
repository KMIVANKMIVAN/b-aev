import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('datoscontrato')
export class Datoscontrato {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  proy_cod: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  plie_cod: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  cont_cod: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  depa_des: string;

  @Column({ type: 'double', precision: 22, scale: 2, nullable: true })
  cont_montobs: number;

  @Column({ type: 'double', precision: 22, scale: 2, nullable: true })
  montocontrato: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  cont_des: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  inst_cod: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  inst_des: string;

  @Column({ type: 'int', nullable: true })
  prmo_cant: number;

  @Column({ type: 'int', nullable: true })
  comp_cod: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  inst_contac: string;

  @Column({ type: 'date', nullable: true })
  bole_fechav: Date;

  @Column({ type: 'decimal', precision: 11, scale: 0, nullable: true })
  dias: number;

  @Column({ type: 'varchar', length: 10, nullable: true })
  etap_cod: string;
}
