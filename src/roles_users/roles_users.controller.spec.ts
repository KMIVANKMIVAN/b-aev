import { Test, TestingModule } from '@nestjs/testing';
import { RolesUsersController } from './roles_users.controller';
import { RolesUsersService } from './roles_users.service';

describe('RolesUsersController', () => {
  let controller: RolesUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolesUsersController],
      providers: [RolesUsersService],
    }).compile();

    controller = module.get<RolesUsersController>(RolesUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
