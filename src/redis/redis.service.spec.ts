import { CACHE_MANAGER, CacheModule } from '@nestjs/cache-manager';
import { Test, TestingModule } from '@nestjs/testing';
import { RedisService } from './redis.service';
import { Cache } from 'cache-manager';

describe('RedisService', () => {
  let service: RedisService;
  let cacheManager: Cache;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register()],
      providers: [RedisService],
    }).compile();

    service = module.get<RedisService>(RedisService);
    cacheManager = module.get(CACHE_MANAGER);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('get', () => {
    it('should call cacheManager.get', async () => {
      const key = 'test';
      const value = 'test value';
      jest.spyOn(cacheManager, 'get').mockImplementation(() => Promise.resolve(value));

      const result = await service.get(key);

      expect(cacheManager.get).toHaveBeenCalledWith(key);
      expect(result).toBe(value);
    });
  });

  describe('set', () => {
    it('should call cacheManager.set', async () => {
      const key = 'test';
      const value = 'test value';
      jest.spyOn(cacheManager, 'set').mockImplementation(() => Promise.resolve());

      await service.set(key, value);

      expect(cacheManager.set).toHaveBeenCalledWith(key, value);
    });
  });

  describe('del', () => {
    it('should call cacheManager.del', async () => {
      const key = 'test';
      jest.spyOn(cacheManager, 'del').mockImplementation(() => Promise.resolve());

      await service.del(key);

      expect(cacheManager.del).toHaveBeenCalledWith(key);
    });
  });
});