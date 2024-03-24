import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserDto } from 'src/auth/dto/user.dto';
import { BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn().mockResolvedValue([
              { id: 1, name: 'John', email: 'arsen@edi.ru', password: 'password' },
              { id: 2, name: 'Jane', email: 'arsen@edi.ru', password: 'password' },
            ]),
            findOneBy: jest.fn().mockResolvedValue({ id: 1, name: 'John', email: 'arsen@edi.ru', password: 'password' }),
            findOneById: jest.fn().mockResolvedValue({ id: 1, name: 'John', email: 'arsen@edi.ru', password: 'password' }),
            findOneByEmail: jest.fn().mockResolvedValue({ id: 1, name: 'John', email: 'arsen@edi.ru', password: 'password' }),
            save: jest.fn().mockResolvedValue({ id: 1, name: 'John', email: 'arsen@edi.ru', password: 'password' }),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = await service.findAll();

      expect(users).toEqual([
        { id: 1, name: 'John', email: 'arsen@edi.ru', password: 'password' },
        { id: 2, name: 'Jane', email: 'arsen@edi.ru', password: 'password' },
      ]);
    });
  });

  describe('findOneBy', () => {
    it('should return a user when given a valid dto', async () => {
      const user = await service.findOneBy({ email: 'arsen@edi.ru', name: 'John', password: 'password' });

      expect(user).toEqual({ id: 1, name: 'John', email: 'arsen@edi.ru', password: 'password' });
    });

    it('should throw an error when given an invalid dto', async () => {
      await expect(service.findOneBy(undefined as UserDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('findOneById', () => {
    it('should return a user when given a valid id', async () => {
      const user = await service.findOneById(1);

      expect(user).toEqual({ id: 1, name: 'John', email: 'arsen@edi.ru', password: 'password' });
    });

    it('should throw an error when given an invalid id', async () => {
      await expect(service.findOneById(0)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findOneByEmail', () => {
    it('should return a user when given a valid email', async () => {
      const user = await service.findOneByEmail('arsen@edi.ru');

      expect(user).toEqual({ id: 1, name: 'John', email: 'arsen@edi.ru', password: 'password' });
    });

    it('should throw an error when given an invalid email', async () => {
      await expect(service.findOneByEmail('')).rejects.toThrow(BadRequestException);
    });
  });

  describe('save', () => {
    it('should save a user', async () => {
      const user = { id: 1, name: 'John', email: 'arsen@edi.ru', password: 'password' };
      const savedUser = await service.save(user);

      expect(savedUser).toEqual(user);
    });
  });
});