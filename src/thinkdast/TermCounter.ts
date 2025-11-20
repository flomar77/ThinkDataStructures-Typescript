import * as cheerio from 'cheerio';

export class TermCounter {
    map: Map<string, number> = new Map();
    pageTitle: string;
    constructor(pageTitle: string) {
        this.pageTitle = pageTitle;
    }

    put(term: string, count: number) {
        this.map.set(term, count);
    }
    get(term: string): number {
        const count = this.map.get(term);
        return count === 0 || count === undefined ? 0 : count;
    }
    getAll(): Map<string, number> {
        return new Map([...this.map.entries()].sort());
    }
    incrementTermCount(term: string) {
        this.put(term, this.get(term) + 1);
    }

    processElements(elements: cheerio.Cheerio<Element>) {
        Array.from(elements).forEach((el) => {
            this.processChildren(el.children);
        });
    }
    processChildren(children: HTMLCollection) {
        for (const child of children) {
            // console.log(child);
            if (child.type == 'text') {
                this.processText(child.data);
            }
            if (child.children !== undefined && child.children.length > 0) {
                this.processChildren(child.children);
            }
        }
    }
    processText(data: any) {
        const regex = /[^\p{L} -]/gu;
        let strings: string[] = [];
        strings = data
            .toLowerCase()
            .replace(regex, '')
            .split(' ')
            .filter((e) => e);
        if (strings.length > 0) {
            for (const string of strings) {
                this.incrementTermCount(string);
            }
        }
    }
}
