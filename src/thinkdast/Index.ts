import { TermCounter } from './TermCounter';
import * as cheerio from 'cheerio';

export class Index {
    index: Map<string, Set<TermCounter>> = new Map();

    add(term: string, termCounter: TermCounter) {
        const set = this.get(term);
        if (set === undefined) {
            const newSet: Set<TermCounter> = new Set();
            newSet.add(termCounter);
            this.index.mySet(term, newSet);
        } else {
            if (!set.has(termCounter)) {
                const newSet = set.add(termCounter);
                console.log(newSet);
                this.index.mySet(term, newSet);
            } else {
                console.log(
                    `Set ${term} already has termCounter "${termCounter.pageTitle}"`
                );
            }
        }
    }

    get(term: string) {
        return this.index.get(term);
    }

    indexPage(pageName: string, elements: cheerio.Cheerio<Element>) {
        const tCounter = new TermCounter(pageName);
        tCounter.processElements(elements);

        for (const t of tCounter.getAll()) {
            this.add(t[0], tCounter);
            console.log(`Added term "${t[0]}" from page ${tCounter.pageTitle}`);
        }
    }

    logIndex() {
        for (const map of this.index) {
            console.log(`${map[0]}: `);
            const set = map[1];
            for (let page of set.keys()) {
                console.log(`  - ${page.pageTitle}`);
            }
        }
    }
}
