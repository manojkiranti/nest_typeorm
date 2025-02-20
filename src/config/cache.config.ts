import { CacheModuleOptions } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { createKeyv } from '@keyv/redis';
import { Keyv } from 'keyv';
import { CacheableMemory } from 'cacheable';

export const getCacheConfig = async (
  configService: ConfigService,
  // eslint-disable-next-line @typescript-eslint/require-await
): Promise<CacheModuleOptions> => {
  const redisUrl = configService.get<string>('REDIS_URL'); // Get Redis URL from .env
  return {
    stores: [
      new Keyv({
        store: new CacheableMemory({ ttl: 60000, lruSize: 5000 }),
      }),
      createKeyv(redisUrl), // Use the Redis URL from .env
    ],
  };
};
