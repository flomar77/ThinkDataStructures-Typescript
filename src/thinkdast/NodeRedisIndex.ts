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
            console.log('create and connect client in NodeRedisIndex');
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
        const hashname = this.termCounterKey(tCounter.pageTitle);
        if (this.client !== undefined) {
            console.log('Create or delete ' + hashname);
            this.client.del(hashname);
            const trans = this.client.multi();
            for (const t of tCounter.getAll()) {
                const term = t[0];
                const count = tCounter.get(term);
                await trans.hSet(hashname, term, count.toString());
                await trans.sAdd(this.urlSetKey(term), tCounter.pageTitle);
            }
            await trans.exec();
        }
    }
    /**
     * Looks up a search term and returns a set of URLs.
     */
    async getURLs(term: string) {
        if (this.client !== undefined) {
            const urls = await this.client.sMembers(this.urlSetKey(term));
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
    termCounterKeys() {
        if (this.client !== undefined) {
            return this.client.keys('TermCounter:*');
        }
    }
    urlSetKeys() {
        if (this.client !== undefined) {
            return this.client.keys('URLSet:*');
        }
    }
    /**
     * Deletes all URLSet objects from the database.
     *
     * Should be used for development and testing, not production.
     */
    async deleteURLSets() {
        if (this.client !== undefined) {
            const allKeys = await this.urlSetKeys();
            const trans = this.client.multi();
            if (allKeys !== undefined) {
                for (const key of allKeys) {
                    trans.del(key);
                }
            }
            await trans.exec();
        }
    }
    // TESTING delete
    async delete(term: string) {
        if (this.client !== undefined) {
            const trans = this.client.multi();
            trans.del(this.urlSetKey(term));
            await trans.exec();
        }
    }

    /**
     * Deletes all URLSet objects from the database.
     *
     * Should be used for development and testing, not production.
     */
    async deleteTermCounters() {
        let keys = await this.termCounterKeys();
        if (this.client !== undefined) {
            const trans = this.client.multi();
            for (const key in keys) {
                trans.del(key);
            }
            await trans.exec();
        }
    }

    /**
     * Deletes all keys from the database.
     *
     * Should be used for development and testing, not production.
     */
    async deleteAllKeys() {
        if (this.client !== undefined) {
            let keys = await this.client.keys('*');
            const trans = this.client.multi();
            for (const key in keys) {
                trans.del(key);
            }
            await trans.exec();
        }
    }
}
