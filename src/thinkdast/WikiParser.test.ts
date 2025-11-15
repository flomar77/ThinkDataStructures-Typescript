import { expect, test } from 'vitest'
import { WikiParser } from './WikiParser.ts'
import { WikiFetcher } from './WikiFetcher.ts'

test('WikiParser', async () => {
    const wFetcher = new WikiFetcher();
    const elements = await wFetcher.fetchWikipedia("Fascism");
    if (elements != undefined) {
        const parser = new WikiParser(elements);
        expect(parser.getFirstValidLinkTitleFromElements()).toBe("Far-right");
    }
    const otherElements = await wFetcher.fetchWikipedia("Kotlin_(programming_language)");
    if (otherElements != undefined) {
        const parser = new WikiParser(otherElements);
        expect(parser.getFirstValidLinkTitleFromElements()).toBe("Cross-platform software");
    }
});
