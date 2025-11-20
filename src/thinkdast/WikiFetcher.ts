import axios from 'axios';
import * as cheerio from 'cheerio';
import Stack from './Stack';

export class WikiFetcher {
    stack = new Stack<string>();
    requests = 0;
    minInterval: number = 600;
    elements: cheerio.Cheerio<Element> | undefined = undefined;

    async fetchWikipedia(
        pageName: string
    ): Promise<cheerio.Cheerio<Element> | undefined> {
        const baseUrl = 'https://en.wikipedia.org/w/api.php';
        const headers = {
            'User-Agent': 'TsThinkDataStructures/1.0 (tsthinkdata@gmx.de)',
            'Content-Type': 'application/json',
        };
        const queryParams = new URLSearchParams({
            action: 'parse',
            format: 'json',
            page: pageName,
            origin: '*', // Required for some cross-origin requests, good practice
        });
        const requestUrl = `${baseUrl}?${queryParams}`;
        try {
            const response = await axios.get(requestUrl, { headers: headers });

            const $ = cheerio.load(response.data.parse.text['*']);
            return $('.mw-content-ltr > p:not(.mw-empty-elt)');
        } catch (error: any) {
            // handle any error that occurs during the HTTP request
            console.error(`Error fetching ${pageName}: ${error.message}`);
        }
    }
}
