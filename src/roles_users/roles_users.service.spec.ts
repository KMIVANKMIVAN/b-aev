import { Test, TestingModule } from '@nestjs/testing';
import { RolesUsersService } from './roles_users.service';

describe('RolesUsersService', () => {
  let service: RolesUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RolesUsersService],
    }).compile();

    service = module.get<RolesUsersService>(RolesUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
