import { expect, test } from 'vitest';
import { WikiFetcher } from './WikiFetcher.ts';

test('WikiFetcher', async () => {
    const wFetcher = new WikiFetcher();
    const elements = await wFetcher.fetchWikipedia('Fascism');
    if (elements != undefined) {
        expect(elements.length).toBe(129);
        expect(elements[0].name).toBe('p');
    }
});
