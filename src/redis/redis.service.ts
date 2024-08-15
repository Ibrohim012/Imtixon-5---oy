import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private readonly redisClient: Redis;

  constructor() {
    this.redisClient = new Redis({
      host: 'localhost',
      port: 6379,
    });
  }

  get client(): Redis {
    return this.redisClient;
  }

  async addToBlacklist(token: string, expiresIn: number): Promise<void> {
    const blacklistKey = 'blacklist';
    const ttl = expiresIn; 

    await this.redisClient.zadd(blacklistKey, Date.now() + ttl * 10000, token);
  }

  async isBlacklisted(token: string): Promise<boolean> {
    const blacklistKey = 'blacklist';
    const tokenInBlacklist = await this.redisClient.zscore(blacklistKey, token);

    return tokenInBlacklist !== null && Date.now() < parseInt(tokenInBlacklist, 10000);
  }
}
