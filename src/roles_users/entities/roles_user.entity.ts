import {
  Entity,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  PrimaryColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('roles_user')
export class RolesUser {
  @PrimaryColumn() // Esto se considera como una clave primaria compuesta
  user_id: number;

  /* @PrimaryGeneratedColumn()
  user_id: number; */

  /* @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' }) // La columna que se usará como FK en la tabla Users
  user: User; */
}
