import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { TokenService } from '../token/token.service';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

const mockUserService = () => ({
  findOneByEmail: jest.fn(),
  save: jest.fn(),
});

const mockTokenService = () => ({
  generateJwtToken: jest.fn(),
});

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let tokenService: TokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useFactory: mockUserService },
        { provide: TokenService, useFactory: mockTokenService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    tokenService = module.get<TokenService>(TokenService);
  });

  describe('registration', () => {
    it('returns a user if the email is not taken', async () => {
        const userDto: UserDto = { email: 'test', password: 'test', name: 'Test' };

      const candidate = new User();
      candidate.email = userDto.email;
      candidate.name = userDto.name;
      candidate.password = userDto.password;;

      jest.spyOn(userService, 'findOneByEmail').mockReturnValue(Promise.resolve(null));
      jest.spyOn(userService, 'save').mockReturnValue(Promise.resolve(candidate));

      const result = await authService.registration(userDto);

      expect(result).toEqual(candidate);
    });

    it('throws a BadRequestException if the email is already taken', async () => {
      const userDto = { email: 'test', password: 'test', name: 'Test' };

      const candidate = new User();
      candidate.email = userDto.email;

      jest.spyOn(userService, 'findOneByEmail').mockReturnValue(Promise.resolve(candidate));

      await expect(authService.registration(userDto)).rejects.toThrow(
        BadRequestException,
      );
      expect(userService.findOneByEmail).toBeCalledWith(userDto.email);
      expect(userService.save).not.toBeCalled();
    });
  });

  describe('login', () => {
    it('returns a token if the credentials are valid', async () => {
      const userDto = { email: 'test', password: 'test', name: 'Test' };

      const user = new User();
      user.email = userDto.email;
      user.password = await hash(userDto.password, 10);

      jest.spyOn(userService, 'findOneByEmail').mockReturnValue(Promise.resolve(user));
      jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(true));
      jest.spyOn(tokenService, 'generateJwtToken').mockReturnValue(Promise.resolve('test-token'));

      const result = await authService.login(userDto);

      expect(result).toEqual('test-token');
      expect(userService.findOneByEmail).toBeCalledWith(userDto.email);
      expect(bcrypt.compare).toBeCalledWith(userDto.password, user.password);
      expect(tokenService.generateJwtToken).toBeCalledWith({
        id: user.id,
        email: user.email,
        name: user.name,
      });
    });

    it('throws an UnauthorizedException if password is incorrect', async () => {
        const user = new User();
        user.id = 1;
        user.email = 'test';
        user.name = 'Test';
        user.password = await hash('test', 10);

        jest.spyOn(userService, 'findOneByEmail').mockImplementation(
            jest.fn().mockResolvedValue(user),
        );
        jest.spyOn(bcrypt, 'compare').mockImplementation(
            jest.fn().mockResolvedValue(false),
        );

        await expect(
            authService.validateUser({
                email: 'test',
                password: 'test',
            } as UserDto),
        ).rejects.toThrow(UnauthorizedException);
    });
});
});