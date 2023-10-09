import { Module } from '@nestjs/common';
import { RolesUsersService } from './roles_users.service';
import { RolesUsersController } from './roles_users.controller';

@Module({
  controllers: [RolesUsersController],
  providers: [RolesUsersService],
})
export class RolesUsersModule {}
