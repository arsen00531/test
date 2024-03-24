import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {

    constructor(
        @Inject(CACHE_MANAGER)
        private readonly cacheManager: Cache
    ) {}

    async get(key: string) {
        console.log(`GET ${key} FROM REDIS`)
        return await this.cacheManager.get(key)
    }

    async set(key: string, value: unknown) {
        console.log(`SET ${key} FROM REDIS`)
        await this.cacheManager.set(key, value)
    }

    async del(key: string) {
        console.log(`DEL ${key} FROM REDIS`)
        await this.cacheManager.del(key)
    }

}
