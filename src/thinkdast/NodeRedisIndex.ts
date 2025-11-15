import type EventEmitter from '@redis/client/dist/lib/client';
import { createClient } from 'redis';

class NodeRedisIndex {
    client: any;
    setup = () => {
        this.client = this.create();
        this.client.connect();
    };
    create = async () => {
        const redisClient = await createClient().on('error', (err: Error) =>
            console.log('Redis Client Error', err)
        );
        return redisClient;
    };
    connect = () => {
        if (this.client !== undefined) {
            this.client.connect();
        }
    };
    indexPage = () => {
        /* Needs page url */
    };

    pushTermCounterToRedis = () => {
        /* Needs TermCounter */
    };
    getCounts = () => {};
}
