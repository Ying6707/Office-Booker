import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@office-booker/api/shared/services/prisma/data-access';
import { ApiUsersRepositoryDataAccessService } from './api-users-repository-data-access.service';
import exp = require('constants');
import * as crypto from 'crypto';

describe('ApiUsersRepositoryDataAccessService', () => {
  let service: ApiUsersRepositoryDataAccessService;
  let prisma;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiUsersRepositoryDataAccessService, PrismaService],
    }).compile();
    service = module.get<ApiUsersRepositoryDataAccessService>(ApiUsersRepositoryDataAccessService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('getUsers', () => {
    it('should return an array of users', async () => {
      const users = [
        {
          id: 1,
          name: 'test',
          email: 'test@gmail.com',
          companyId: 2,
        },
        {
          id: 2,
          name: 'test2',
          email: 'tes2@gmail.com',
          companyId: 2,
        },
        {
          id: 3,
          name: 'test3',
          email: 'test3@gmail.com',
          companyId: 1,
        },
      ];
      prisma.employee.findMany = jest.fn().mockReturnValue(users);
      const result = await service.getUsers();
      expect(result).toEqual(users);
    });
  });

  describe('getUserById', () => {
    it('should return a user', async () => {
      const user = {
        name: 'test',
        email: 'test@gmail.com',
        id: 1,
        companyId: 2,
      };
      prisma.employee.findUnique = jest.fn().mockReturnValue(user);
      const result = await service.getUserById(1);
      expect(result).toEqual(user);
    });
  });

  describe('getUsersByCompanyId', () => {
    it('should return an array of users', async () => {
      const users = [
        {
          id: 1,
          name: 'test',
          email: 'test@gmail.com',
          companyId: 2,
        },
        {
          id: 2,
          name: 'test2',
          email: 'tes2@gmail.com',
          companyId: 2,
        },
        {
          id: 3,
          name: 'test3',
          email: 'test3@gmail.com',
          companyId: 1,
        },
      ];
      prisma.employee.findMany = jest.fn().mockReturnValue(users);
      const result = await service.getUsersByCompanyId(2);
      expect(result).toEqual(users);
    });
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      const user = {
        name: 'test',
        company: null,
        Bookings: null,
        email: 'test',
        admin: false
      };
      prisma.employee.create = jest.fn().mockReturnValueOnce(user);
      expect(await service.createUser(user)).toEqual(user);
    });
  });

});

//integration tests
describe('ApiUsersRepositoryDataAccessService (Integration tests)', () => {
  let service: ApiUsersRepositoryDataAccessService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiUsersRepositoryDataAccessService, PrismaService],
    }).compile();
    service = module.get<ApiUsersRepositoryDataAccessService>(ApiUsersRepositoryDataAccessService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('getUsers', () => {
    it('should return an array of users', async () => {
      const result = await service.getUsers();
      const expected =  [
        {
          id: 1,
          name: 'Kryptos Kode',
          email: 'kryptoskode301@gmail.com',
          companyId: 1,
          admin: true
        },
        {
          id: 2,
          name: 'Brett du Plessis',
          email: 'duplessisbrett@icloud.com',
          companyId: 1,
          admin: false
        }
      ]
      expect(result).toEqual(expected);
    });
  });
});


/*describe('ApiUsersRepositoryDataAccessService', () => {
  let service: ApiUsersRepositoryDataAccessService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiUsersRepositoryDataAccessService, PrismaService],
    }).compile();

    service = module.get(ApiUsersRepositoryDataAccessService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});*/
