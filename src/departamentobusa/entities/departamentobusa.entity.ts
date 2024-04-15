import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('departamentobusa')
export class Departamentobusa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  departamento: string;

  /* @OneToMany(() => Sucursale, (sucursale) => sucursale.departamento_id)
  sucursales: Sucursale[]; */
}
