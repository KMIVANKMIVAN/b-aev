import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { RolesUser } from '../../roles_users/entities/roles_user.entity';
@Entity('users') // Nombre de la tabla en la base de datos
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', default: 0, name: 'superior' })
  superior: number;

  @Column({ type: 'int', default: 0, name: 'id_oficina' })
  idOficina: number;

  @Column({ type: 'tinyint', nullable: true, default: 1 })
  dependencia: number | null;

  @Column({ type: 'varchar', length: 32 })
  username: string;

  @Column({ type: 'varchar', length: 64 })
  password: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  nombre: string | null;

  @Column({ type: 'int', nullable: true, name: 'last_login' })
  lastLogin: number | null;

  @Column({ type: 'varchar', length: 30, nullable: true })
  mosca: string | null;

  @Column({ type: 'varchar', length: 90, nullable: true })
  cargo: string | null;

  @Column({ type: 'varchar', length: 127, nullable: true })
  email: string | null;

  @Column({ type: 'int', default: 0 })
  logins: number;

  @Column({ type: 'int', nullable: true, name: 'fecha_creacion' })
  fechaCreacion: number | null;

  @Column({ type: 'tinyint', default: 1 })
  habilitado: number;

  @Column({ type: 'int', default: 2 })
  nivel: number;

  @Column({ type: 'varchar', length: 10, default: 'hombre' })
  genero: string;

  @Column({ type: 'int', default: 0 })
  prioridad: number;

  @Column({ type: 'int', default: 10, name: 'id_entidad' })
  idEntidad: number;

  @Column({ type: 'tinyint', default: 0, name: 'super' })
  super: number;

  @Column({ type: 'int', nullable: true, name: 'cedula_identidad' })
  cedulaIdentidad: number | null;

  @Column({ type: 'varchar', length: 3, nullable: true })
  expedido: string | null;

  @Column({ type: 'text', nullable: true })
  theme: string | null;

  @OneToOne(() => RolesUser)
  @JoinColumn({ name: 'user_id' }) // La columna que se usará como FK en la tabla RolesUser
  rolesUser: RolesUser;
}
