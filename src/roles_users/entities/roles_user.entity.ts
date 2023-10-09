import { Entity, OneToOne, JoinColumn, Column } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('roles_user')
export class RolesUser {
  /* @OneToOne(() => User, (user) => user.rolesUser)
  @JoinColumn({ name: 'user_id' })
  user: User; */

  @Column({ type: 'int', unsigned: true, primary: true })
  role_id: number;
}
