import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesUsersService } from './roles_users.service';
import { RolesUsersController } from './roles_users.controller';

import { RolesUser } from './entities/roles_user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([RolesUser])],
  controllers: [RolesUsersController],
  providers: [RolesUsersService],
})
export class RolesUsersModule {}
