import { expect, test, beforeEach } from 'vitest';
import { WikiFetcher } from './WikiFetcher.ts';
import NodeRedisIndex from './NodeRedisIndex.ts';

const myIndex = new NodeRedisIndex();
const page1 = 'Java_(programming_language)';
const page2 = 'JavaScript';
/**
 * Loads the index with two pages read from files.
 */
const loadIndex = async () => {
    const wFetcher = new WikiFetcher();

    const paragraphs1 = await wFetcher.fetchWikipedia(page1);
    const paragraphs2 = await wFetcher.fetchWikipedia(page2);

    await myIndex.indexPage(page1, paragraphs1);
    await myIndex.indexPage(page2, paragraphs2);
};

beforeEach(async () => {
    await myIndex.createAndConnect();
    await loadIndex();
});

test('testGetCounts', async () => {
    const allThe = await myIndex.getCounts('the');
    expect(allThe.get(page1)).toBe(207);
    expect(allThe.get(page2)).toBe(238);

    // const allJava = await myIndex.getCounts('java');
    // console.log(allJava);
    // expect(allJava.get(page1)).toBe(156);
});
