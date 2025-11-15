import axios from 'axios';
import * as cheerio from 'cheerio';
import Stack from './Stack';

export class WikiFetcher {
    stack = new Stack<string>();
    requests = 0;
    minInterval: number = 600;
    elements: cheerio.Cheerio<Element> | undefined = undefined;

    async fetchWikipedia(pageName: string) {
        const url =
            'https://en.wikipedia.org/w/api.php?' +
            new URLSearchParams({
                origin: '*',
                action: 'parse',
                page: pageName,
                format: 'json',
            });
        try {
            const response = await axios.get(url);
            const $ = cheerio.load(response.data.parse.text['*']);
            return $('.mw-content-ltr > p:not(.mw-empty-elt)');
        } catch (error: any) {
            // handle any error that occurs during the HTTP request
            console.error(`Error fetching ${pageName}: ${error.message}`);
        }
    }
}
