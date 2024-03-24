import { Test, TestingModule } from '@nestjs/testing';
import { ArticleService } from './article.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Query } from 'express-serve-static-core';
import { RedisService } from 'src/redis/redis.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

describe('ArticleService', () => {
  let service: ArticleService;
  let repository: Repository<Article>;
  let userService: UserService;
  let redisService: RedisService; // Добавляем RedisService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticleService,
        {
          provide: getRepositoryToken(Article),
          useValue: {
            find: jest.fn().mockResolvedValue([
              { 
                id: 1, 
                name: 'John', 
                description: 'Article Title',
                author: {
                  id: 1,
                  email: 'test',
                  name: 'John',
                  password: 'test',
                  articles: []
                },
                createdAt: new Date(),
                updated_at: new Date(),
              },
              { 
                id: 1, 
                name: 'John', 
                description: 'Article Title',
                author: {
                  id: 1,
                  email: 'test',
                  name: 'John',
                  password: 'test',
                  articles: []
                },
                createdAt: new Date(),
                updated_at: new Date(),
              },
            ]),
            findOneBy: jest.fn().mockResolvedValue({ id: 1, name: 'John', description: 'Article Title', createdAt: new Date(), updated_at: new Date() }),
            findOneById: jest.fn().mockResolvedValue({ id: 1, name: 'John', description: 'Article Title', createdAt: new Date(), updated_at: new Date() }),
            findOneByEmail: jest.fn().mockResolvedValue({ id: 1, name: 'John', description: 'Article Title', createdAt: new Date(), updated_at: new Date() }),
            save: jest.fn().mockResolvedValue({ id: 1, name: 'John', description: 'Article Title', createdAt: new Date(), updated_at: new Date() })
          },
        },
        {
          provide: UserService,
          useValue: {
            findOneByEmail: jest.fn(),
          },
        },
        RedisService,
        {
          provide: CACHE_MANAGER, // Добавляем CACHE_MANAGER
          useValue: {}, // Можно предоставить фейковый объект для тестирования
        },
      ],
    }).compile();

    service = module.get<ArticleService>(ArticleService);
    repository = module.get<Repository<Article>>(getRepositoryToken(Article));
    userService = module.get<UserService>(UserService);
    redisService = module.get<RedisService>(RedisService); // Получаем экземпляр RedisService
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
    expect(userService).toBeDefined();
    expect(redisService).toBeDefined(); // Проверяем, что RedisService определен
  });

  it('should return an array of articles', async () => {
    const articles: Article[] = [
      {
        id: 1,
        name: 'test',
        description: 'test',
        author: {
          id: 1,
          email: 'test',
          password: 'test',
          name: 'Test',
          articles: [],
        },
        createdAt: new Date(),
        updated_at: new Date(),
      },
    ];
    jest.spyOn(repository, 'find').mockImplementation(() => Promise.resolve(articles));
    jest.spyOn(userService, 'findOneByEmail').mockImplementation(() => Promise.resolve(articles[0].author));

    const result = await service.findAll({} as Query);

    expect(result).toEqual(articles);
  });
});