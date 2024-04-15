import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sucursalbusa')
export class Sucursalbusa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  sucursal: string;

  @Column({ type: 'int', nullable: false })
  departamento_id: number;

  /* @ManyToOne(() => Departamento, (departamento) => departamento.sucursales)
  @JoinColumn({ name: 'departamento_id' })
  departamento_id: Departamento;

  @OneToMany(() => Usuario, (usuario) => usuario.sucursal_id)
  usuarios: Usuario[]; */
}
