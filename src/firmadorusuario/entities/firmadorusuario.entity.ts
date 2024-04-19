// export class Firmadorusuario {}
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('firmadorusuario')
export class Firmadorusuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firmador: number;

  @Column()
  usuario: number;
}