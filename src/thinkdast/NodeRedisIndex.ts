import { createClient, type RedisClientType } from 'redis';
import * as cheerio from 'cheerio';
import { TermCounter } from './TermCounter';

export default class NodeRedisIndex {
    client: RedisClientType | undefined;
    async createAndConnect() {
        this.client = await createClient().on('error', (err: Error) =>
            console.log('Redis Client Error', err)
        );
        if (this.client) {
            await this.client.connect();
        }
    }
    async create(): Promise<RedisClientType | undefined> {
        let client = undefined;
        const get = async () => {
            const redisClient = await createClient().on(
                'error',
                (err: Error) => {
                    console.log('Redis Client Error', err);
                    throw err;
                }
            );
            client = redisClient;
        };
        get();
        return client;
    }
    connect() {
        if (this.client !== undefined) {
            this.client.connect();
        }
    }
    async indexPage(
        pageTitle: string,
        paragraphs: cheerio.Cheerio<Element> | undefined
    ) {
        console.log('Indexing Wikipedia page: ' + pageTitle);
        const tCounter = new TermCounter(pageTitle);
        paragraphs !== undefined && tCounter.processElements(paragraphs!);
        await this.pushTermCounterToRedis(tCounter);
    }
    termCounterKey(pageTitle: string): string {
        return 'TermCounter:' + pageTitle;
    }
    urlSetKey(term: string) {
        return 'URLSet:' + term;
    }

    async pushTermCounterToRedis(tCounter: TermCounter) {
        /* Needs TermCounter */
        const hashname = this.termCounterKey(tCounter.pageTitle);
        if (this.client !== undefined) {
            console.log('Create or delete ' + hashname);
            this.client.del(hashname);
            for (const t of tCounter.getAll()) {
                const term = t[0];
                const count = tCounter.get(term);
                await this.client.hSet(hashname, term, count.toString());
                await this.client.sAdd(
                    this.urlSetKey(term),
                    tCounter.pageTitle
                );
            }
        }
    }
    /**
     * Looks up a search term and returns a set of URLs.
     */
    async getURLs(term: string) {
        if (this.client !== undefined) {
            const urls = await this.client.sMembers(this.urlSetKey(term));
            console.log(urls);
            return urls;
        }
    }
    /**
     * Returns the number of times the given term appears at the given URL.
     */
    async getCount(url: string, term: string): Promise<Number | undefined> {
        const redisKey = this.termCounterKey(url);
        let count = undefined;
        if (this.client !== undefined) {
            count = await this.client.hGet(redisKey, term);
        }
        if (count !== undefined) {
            return Number(count);
        } else return undefined;
    }
    async getCounts(term: string) {
        let map = new Map<String, Number>();
        const urls = await this.getURLs(term);
        if (urls !== undefined) {
            for (const url of urls) {
                const count = await this.getCount(url, term);
                if (count !== undefined) {
                    map.set(url, count);
                }
            }
        }
        return map;
    }
}
