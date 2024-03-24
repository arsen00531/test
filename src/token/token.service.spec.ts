import { Test, TestingModule } from '@nestjs/testing';
import { TokenService } from './token.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

describe('TokenService', () => {
  let service: TokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TokenService,
        {
          provide: ConfigService,
          useValue: {
            get: (key: string) => {
              switch (key) {
                case 'SECRET_OR_KEY':
                  return 'secretKey';
                case 'EXPIRED_JWT':
                  return '1d';
                default:
                  return '';
              }
            },
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TokenService>(TokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate a jwt token', () => {
    const payload = { username: 'test' };
    const token = service.generateJwtToken(payload);
    expect(token).toBeDefined();
  });
});